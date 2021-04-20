import CSON from 'cson-parser';
import TOML from '@iarna/toml';
import JSON5 from 'json5';

export default {
  cson(filePath, content) {
    try {
      return CSON.parse(content);
    } catch (error) {
      error.message = `TOML Error in ${filePath}:\n${error.message}`;
      throw error;
    }
  },

  json5(filePath, content) {
    try {
      return JSON5.parse(content);
    } catch (error) {
      error.message = `TOML Error in ${filePath}:\n${error.message}`;
      throw error;
    }
  },

  toml(filePath, content) {
    try {
      return TOML.parse(content);
    } catch (error) {
      error.message = `TOML Error in ${filePath}:\n${error.message}`;
      throw error;
    }
  }
};
