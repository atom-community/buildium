import CSON from 'cson-parser';
import TOML from '@iarna/toml';
import JSON5 from 'json5';

/** Matches cosmiconfig's `LoaderSync` signature. */
type Loader = (filePath: string, content: string) => object | null;

function rethrow(format: string, filePath: string, error: unknown): never {
  if (error instanceof Error) {
    error.message = `${format} Error in ${filePath}:\n${error.message}`;
  }

  throw error;
}

const loaders: Record<'cson' | 'json5' | 'toml', Loader> = {
  cson(filePath, content) {
    try {
      return CSON.parse(content) as object | null;
    } catch (error) {
      rethrow('CSON', filePath, error);
    }
  },

  json5(filePath, content) {
    try {
      return JSON5.parse(content) as object | null;
    } catch (error) {
      rethrow('JSON5', filePath, error);
    }
  },

  toml(filePath, content) {
    try {
      return TOML.parse(content) as object | null;
    } catch (error) {
      rethrow('TOML', filePath, error);
    }
  }
};

export default loaders;
