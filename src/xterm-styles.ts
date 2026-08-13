/**
 * xterm ships its stylesheet inside its own package, and Pulsar only loads CSS
 * from this package's `styles/` directory — it cannot reach into
 * `node_modules`. Reading the file off the installed copy at runtime keeps the
 * CSS in lockstep with the `@xterm/xterm` version apm actually resolved, which
 * is more than a vendored copy can promise.
 */

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import type { Disposable } from 'atom';

const nodeRequire = createRequire(import.meta.url);

/** Adds `@xterm/xterm/css/xterm.css` to the workspace. Dispose to remove it. */
export function addXtermStyleSheet(): Disposable {
  const source = readFileSync(nodeRequire.resolve('@xterm/xterm/css/xterm.css'), 'utf8');

  // `priority: 0` is what Pulsar gives a package's own stylesheets. This one is
  // added during activation, i.e. after `styles/` has been read, so it keeps the
  // last-among-equals position the vendored copy had by alphabetical order —
  // not that it matters much, since every override in `build.css` outranks it on
  // specificity.
  return atom.styles.addStyleSheet(source, {
    sourcePath: 'buildium/xterm.css',
    priority: 0
  });
}
