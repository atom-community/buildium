import { defineConfig } from 'tsdown';

export default defineConfig((options) => {
  const isProduction = options.watch !== true;

  return {
    entry: ['src/buildium.ts'],
    outDir: 'lib',
    format: 'cjs',

    // `main` in package.json resolves to `./lib/buildium`, so the bundle must
    // keep the `.js` extension that tsdown would otherwise turn into `.cjs`.
    outExtensions: () => ({ js: '.js' }),

    platform: 'node',
    target: 'chrome124',

    deps: {
      // Everything in `dependencies` is installed by apm at runtime and stays
      // out of the bundle, exactly like the previous rollup setup did.
      neverBundle: [/^node:/, 'atom', 'electron']
    },

    dts: false,
    minify: isProduction,
    sourcemap: !isProduction,

    // `lib/` is a tracked directory; never wipe it behind the user's back.
    clean: false
  };
});
