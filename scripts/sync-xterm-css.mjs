/**
 * Copies `@xterm/xterm/css/xterm.css` into `styles/`, since Atom loads every
 * file in that directory but cannot reach into `node_modules`.
 *
 * Run `pnpm run sync:xterm-css` after upgrading xterm; `--check` fails when the
 * vendored copy has drifted, which is what CI runs.
 */

import { createRequire } from 'node:module';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';

const require = createRequire(import.meta.url);
const { version } = require('@xterm/xterm/package.json');

const source = join(dirname(require.resolve('@xterm/xterm/package.json')), 'css', 'xterm.css');
const target = resolve(import.meta.dirname, '..', 'styles', 'xterm.css');

const header = [
  '/**',
  ` * Vendored from @xterm/xterm@${version} (css/xterm.css).`,
  ' *',
  ' * Do not edit; run `pnpm run sync:xterm-css` to update. Buildium overrides',
  ' * live in `build.less`.',
  ' */',
  '',
  ''
].join('\n');

const contents = header + (await readFile(source, 'utf8'));

if (process.argv.includes('--check')) {
  const current = await readFile(target, 'utf8').catch(() => '');

  if (current !== contents) {
    console.error(`styles/xterm.css is out of sync with @xterm/xterm@${version}. Run \`pnpm run sync:xterm-css\`.`);
    process.exit(1);
  }

  console.log(`styles/xterm.css is in sync with @xterm/xterm@${version}.`);
} else {
  await writeFile(target, contents);
  console.log(`Synced styles/xterm.css from @xterm/xterm@${version}.`);
}
