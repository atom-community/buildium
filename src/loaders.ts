import CSON from 'cson-parser';
import TOML from '@iarna/toml';
import JSON5 from 'json5';
import { parse as jsoncParse, printParseErrorCode, type ParseError } from 'jsonc-parser';

/** Matches cosmiconfig's `LoaderSync` signature. */
type Loader = (filePath: string, content: string) => object | null;

function rethrow(format: string, filePath: string, error: unknown): never {
  if (error instanceof Error) {
    error.message = `${format} Error in ${filePath}:\n${error.message}`;
  }

  throw error;
}

/**
 * Renders a `jsonc-parser` error the way the other parsers phrase theirs: what
 * went wrong, and where. The parser reports a byte offset, so the line and
 * column have to be counted out of the source.
 */
function describe(error: ParseError, content: string): string {
  const upToError = content.slice(0, error.offset);
  const line = upToError.split('\n').length;
  const column = error.offset - (upToError.lastIndexOf('\n') + 1) + 1;

  return `${printParseErrorCode(error.error)} at line ${line}, column ${column}`;
}

const loaders: Record<'cson' | 'json5' | 'jsonc' | 'toml', Loader> = {
  cson(filePath: string, content: string) {
    try {
      return CSON.parse(content) as object | null;
    } catch (error) {
      rethrow('CSON', filePath, error);
    }
  },

  json5(filePath: string, content: string) {
    try {
      return JSON5.parse(content) as object | null;
    } catch (error) {
      rethrow('JSON5', filePath, error);
    }
  },

  // Unlike the other parsers, `jsonc-parser` recovers from malformed input
  // rather than throwing — it reports what went wrong through an out parameter
  // and returns a best-effort value. Left alone that would turn a typo in a
  // build file into a silently wrong target, so the errors are raised as a
  // `SyntaxError`, which is what `target-manager` reports as an invalid build
  // file.
  jsonc(filePath: string, content: string) {
    const errors: ParseError[] = [];
    const result = jsoncParse(content, errors, { allowTrailingComma: true }) as object | null;

    if (errors.length) {
      rethrow('JSONC', filePath, new SyntaxError(errors.map((error) => describe(error, content)).join('\n')));
    }

    return result;
  },

  toml(filePath: string, content: string) {
    try {
      return TOML.parse(content) as object | null;
    } catch (error) {
      rethrow('TOML', filePath, error);
    }
  }
};

export default loaders;
