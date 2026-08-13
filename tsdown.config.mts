import { defineConfig, type Rolldown } from 'tsdown';
import svelte from 'rollup-plugin-svelte';
import { compileModule } from 'svelte/compiler';
import ts from 'typescript';

const SVELTE_MODULE = /\.svelte\.ts$/;

/**
 * Compiles `*.svelte.ts` runes modules.
 *
 * `rollup-plugin-svelte` handles these too, but hands them to the Svelte
 * compiler verbatim, and `compileModule()` — unlike a component's
 * `<script lang="ts">` — has no way to know the source is TypeScript. Stripping
 * the types first is all that is missing.
 */
function svelteModule(): Rolldown.Plugin {
  return {
    name: 'svelte-module',
    transform: {
      filter: { id: SVELTE_MODULE },
      handler(code, id) {
        const { outputText } = ts.transpileModule(code, {
          fileName: id,
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ESNext,
            isolatedModules: true
          }
        });

        return compileModule(outputText, { filename: id }).js;
      }
    }
  };
}

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
      // `nucleo-matcher-wasm` reads its `.wasm` with `readFileSync` off its own
      // `__dirname`, so inlining it would break the lookup.
      neverBundle: [/^node:/, 'atom', 'electron', 'nucleo-matcher-wasm']
    },

    // Svelte and `@children-of-atom/*` are ESM-only, so they cannot be apm
    // dependencies of a CJS package — they are devDependencies and get inlined.
    //
    // The `browser` condition is load-bearing: svelte's `.` export falls back to
    // `index-server.js`, whose `mount()` throws `lifecycle_function_unavailable`,
    // and `platform: 'node'` would otherwise select it. `development` keeps
    // esm-env's `DEV` flag in step with the compiler's `dev` option.
    //
    // Note the two spellings that fail silently: it is rolldown's
    // `conditionNames`, not vite's `conditions`, and it has to go through
    // `inputOptions` — a top-level `resolve` key is not part of tsdown's config
    // and is dropped without a warning.
    inputOptions: {
      resolve: {
        conditionNames: ['svelte', 'browser', 'import', 'module', 'default', ...(isProduction ? [] : ['development'])]
      }
    },

    plugins: [
      svelteModule(),
      svelte({
        // `svelteModule()` above owns the runes modules.
        exclude: ['**/*.svelte.ts'],
        // No `emitCss`: rolldown has no CSS pipeline here, and Pulsar loads the
        // package's own stylesheets from `styles/` anyway. (xterm's, which lives
        // in `node_modules`, is read at runtime by `src/xterm-styles.ts`.)
        emitCss: false,
        compilerOptions: {
          css: 'injected',
          dev: !isProduction,

          // Svelte's default scope hash is derived from the *filename*, so editing
          // a component's styles leaves it unchanged. `append_styles()` skips
          // injection when a `<style>` with that id is already in `document.head`,
          // and Pulsar's head survives a package reload — so the old CSS sticks
          // until the whole window is reloaded. Hashing the CSS instead makes an
          // edit produce a new id, which always injects.
          cssHash: ({ css, hash }) => `svelte-${hash(css)}`
        }
      })
    ],

    dts: false,
    minify: isProduction,
    sourcemap: !isProduction,

    // `lib/` is a tracked directory; never wipe it behind the user's back.
    clean: false
  };
});
