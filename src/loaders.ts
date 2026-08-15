import { parseJSON5, parseJSONC, parseTOML, type JSONCParseError } from 'confbox';

/** Matches cosmiconfig's `LoaderSync` signature. */
type Loader = (filePath: string, content: string) => object | null;

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

const loaders: Record<'json5' | 'jsonc' | 'toml', Loader> = {
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
