import { parseJSON5, parseJSONC, parseTOML, type JSONCParseError } from 'confbox';
import fs from 'fs';
import { pathToFileURL } from 'url';

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

const loaders: Record<'javascript' | 'json5' | 'jsonc' | 'toml', Loader> = {
  // A JavaScript build file is cached by Node, and cosmiconfig's own loader has
  // no way to bust it — so an edited `buildium.config.js` would keep returning
  // whatever it exported the first time it was read, for the whole session.
  //
  // Node keeps *two* caches and each half of this evicts one of them, which is
  // why both lines are needed. `require.cache` is what a CommonJS build file
  // lives in, and it is also what the ESM loader's CJS bridge reads through, so
  // deleting the entry alone is enough for `.cjs` — but not for an ESM file,
  // whose namespace lives in the ESM registry that `require.cache` cannot reach.
  // The ESM registry is keyed by URL and has no eviction API at all, so the only
  // way past it is to ask for a URL it has not seen: hence the mtime query.
  async javascript(filePath: string) {
    try {
      try {
        delete require.cache[require.resolve(filePath)];
      } catch {
        // Not resolvable as CommonJS — nothing cached under that name.
      }

      const href = `${pathToFileURL(filePath).href}?mtime=${fs.statSync(filePath).mtimeMs}`;
      const module = (await import(href)) as Record<string, unknown> | null;

      return (module && 'default' in module ? module.default : module) as object | null;
    } catch (error) {
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

  toml(filePath: string, content: string) {
    try {
      return parseTOML<object | null>(content);
    } catch (error) {
      rethrow('TOML', filePath, error);
    }
  }
};

export default loaders;
