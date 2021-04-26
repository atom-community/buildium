import { babel } from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const plugins = [
  babel({
    babelHelpers: 'bundled'
  }),
  commonjs(),
  json(),
  (
    process.env.ROLLUP_WATCH
      ? undefined
      : terser()
  )
];

export default [
  {
    input: 'src/build.js',
    output: {
      dir: 'lib',
      exports: 'default',
      format: 'cjs',
      sourcemap: process.env.ROLLUP_WATCH ? true : false
    },
    external: [
      // Atom
      'atom',
      'electron',

      // Node
      'child_process',
      'fs',
      'os',
      'path'
    ],
    plugins: plugins
  }
];
