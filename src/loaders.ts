import { parseJSON5, parseJSONC, parseTOML, type JSONCParseError } from 'confbox';
import { pklLoader } from 'cosmiconfig-loader-pkl';
import { createJiti } from 'jiti';

/** Matches cosmiconfig's `Loader` signature, which may also be synchronous. */
type Loader = (filePath: string, content: string) => object | null | Promise<object | null>;

/**
 * `printParseErrorCode`, restated. confbox hands `errors` straight through to
 * `jsonc-parser` but re-exports neither the `ParseErrorCode` enum nor the
 * function that names its members, so a raw `error: 4` is all that survives.
 * The codes are part of `jsonc-parser`'s public API and have not moved since
 * the parser was published.
 */
const parseErrorNames: Record<number, string> = {
  1: 'InvalidSymbol',
  2: 'InvalidNumberFormat',
  3: 'PropertyNameExpected',
  4: 'ValueExpected',
  5: 'ColonExpected',
  6: 'CommaExpected',
  7: 'CloseBraceExpected',
  8: 'CloseBracketExpected',
  9: 'EndOfFileExpected',
  10: 'InvalidCommentToken',
  11: 'UnexpectedEndOfComment',
  12: 'UnexpectedEndOfString',
  13: 'UnexpectedEndOfNumber',
  14: 'InvalidUnicode',
  15: 'InvalidEscapeCharacter',
  16: 'InvalidCharacter'
};

function rethrow(format: string, filePath: string, error: unknown): never {
  if (error instanceof Error) {
    error.message = `${format} Error in ${filePath}:\n${error.message}`;
  }

  throw error;
}

/**
 * Unwraps `export default`. A transpiled ES module arrives as `{ default: … }`,
 * while `module.exports =` and `export =` arrive as the target itself — and a
 * build file has no legitimate `default` key of its own to confuse this.
 *
 * jiti's `interopDefault` does not cover this: it leaves the wrapper in place
 * for the modules it hands back here.
 */
function unwrapDefault(module: Record<string, unknown> | null): object | null {
  return (module && 'default' in module ? module.default : module) as object | null;
}

/** Whether a failed `require` was really an ES module being fed to a CommonJS loader. */
function isEsmFailure(error: unknown): boolean {
  if ((error as NodeJS.ErrnoException | null)?.code === 'ERR_REQUIRE_ESM') {
    return true;
  }

  return error instanceof SyntaxError && /Unexpected token '(export|import)'|Cannot use import statement/.test(error.message);
}

/**
 * Renders a JSONC parse error the way the other parsers phrase theirs: what
 * went wrong, and where. The parser reports a byte offset, so the line and
 * column have to be counted out of the source.
 */
function describe(error: JSONCParseError, content: string): string {
  const upToError = content.slice(0, error.offset);
  const line = upToError.split('\n').length;
  const column = error.offset - (upToError.lastIndexOf('\n') + 1) + 1;

  return `${parseErrorNames[error.error] ?? '<unknown ParseErrorCode>'} at line ${line}, column ${column}`;
}

/**
 * Both caches are off for the reason the `javascript` loader clears
 * `require.cache`: jiti memoises by resolved path in memory and writes
 * transpiled output to disk, either of which would keep serving an edited build
 * file's previous contents — and a refresh is precisely when it must be re-read.
 */
const jiti = createJiti('', { interopDefault: true, moduleCache: false, fsCache: false });

const loaders: Record<'javascript' | 'json5' | 'jsonc' | 'pkl' | 'toml' | 'typescript', Loader> = {
  // Must be `require`, and must not be `import()`.
  //
  // Package code runs in Pulsar's *renderer* process, where a dynamic `import()`
  // reaching a `file:` URL from a CommonJS module does not throw — it kills the
  // renderer outright, with no exception to catch and nothing written to the
  // console. cosmiconfig's own JavaScript loader is written that way (it tries
  // `import()` first and falls back to `require`), so registering this loader
  // for `.cjs` and `.js` is what keeps that call from ever being made.
  //
  // `require` also has to be told to forget the file. Node caches by resolved
  // path, so an edited build file would otherwise keep returning whatever it
  // exported the first time it was read, for the rest of the session — and a
  // refresh is precisely the moment it must be re-read.
  javascript(filePath: string) {
    try {
      delete require.cache[require.resolve(filePath)];
    } catch {
      // Not resolvable — let `require` below report why.
    }

    try {
      return unwrapDefault(require(filePath) as Record<string, unknown> | null);
    } catch (error) {
      // Atom's module loader compiles every file as CommonJS regardless of the
      // nearest `package.json`, so an ESM build file fails to *parse* rather
      // than raising `ERR_REQUIRE_ESM`. Either way the advice is the same, and
      // the raw message ("Unexpected token 'export'") does not give it.
      if (isEsmFailure(error)) {
        rethrow(
          'JavaScript',
          filePath,
          new SyntaxError(
            'ES module syntax is not supported in a build file. Use `module.exports` instead, or move the configuration to a `.json`, `.toml` or `.yaml` file.'
          )
        );
      }

      rethrow('JavaScript', filePath, error);
    }
  },

  json5(filePath: string, content: string) {
    try {
      return parseJSON5<object | null>(content);
    } catch (error) {
      rethrow('JSON5', filePath, error);
    }
  },

  // Unlike the other parsers, the JSONC one recovers from malformed input
  // rather than throwing — it reports what went wrong through an out parameter
  // and returns a best-effort value. Left alone that would turn a typo in a
  // build file into a silently wrong target, so the errors are raised as a
  // `SyntaxError`, which is what `target-manager` reports as an invalid build
  // file.
  jsonc(filePath: string, content: string) {
    const errors: JSONCParseError[] = [];
    const result = parseJSONC<object | null>(content, { errors, allowTrailingComma: true });

    if (errors.length) {
      rethrow('JSONC', filePath, new SyntaxError(errors.map((error) => describe(error, content)).join('\n')));
    }

    return result;
  },

  // The odd one out: Pkl is evaluated by an external CLI rather than parsed
  // from a string, so this takes the path and ignores `content`. That is what
  // lets a build file use relative `amends`, `import` and `read()`, which a
  // module handed over as source text cannot resolve. cosmiconfig reads
  // `content` from this very path, so nothing is lost. The loader is async,
  // hence `.catch` rather than `try`/`catch` — a rejection would sail past it.
  pkl(filePath: string) {
    return pklLoader(filePath).catch((error: unknown) => rethrow('Pkl', filePath, error)) as Promise<object | null>;
  },

  toml(filePath: string, content: string) {
    try {
      return parseTOML<object | null>(content);
    } catch (error) {
      rethrow('TOML', filePath, error);
    }
  },

  // TypeScript, and any build file written as an ES module. Neither `require`
  // nor cosmiconfig's `loadJs` can read these: `loadJs` does no type stripping
  // at all, so it falls back to `require`, which reads the source as CommonJS
  // JavaScript and reports `Unexpected token 'export'`.
  //
  // jiti transpiles and evaluates in-process, which also means the dynamic
  // `import()` described on the `javascript` loader is never reached. That is
  // why this is the synchronous `jiti()` call and not `jiti.import()` — the
  // latter can hand the file to a native `import()`, and taking the renderer
  // down is not an error anyone gets to see. jiti marks the synchronous call
  // deprecated in favour of `jiti.import()` "for better compatibility"; here
  // that trade runs the wrong way, so the deprecation is accepted knowingly.
  typescript(filePath: string) {
    try {
      return unwrapDefault(jiti(filePath) as Record<string, unknown> | null);
    } catch (error) {
      rethrow('TypeScript', filePath, error);
    }
  }
};

export default loaders;
