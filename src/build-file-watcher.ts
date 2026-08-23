import { CompositeDisposable, Disposable } from 'atom';
import fs from 'fs';
import os from 'os';
import path from 'path';
import * as Utils from './utils.ts';
import DevConsole from './log.ts';

/**
 * One editor save is rarely one filesystem event: editors write to a temp file
 * and rename it over the target, and some write the file and then touch its
 * mtime. Collect everything that lands in this window and refresh once.
 */
const DEBOUNCE_MS = 200;

/** `os.homedir()` resolved once; it cannot change during a session. */
const homeDir = os.homedir();

/**
 * The project root whose targets a changed file belongs to, or `undefined` if
 * the file produces no targets.
 *
 * `onDidChangeFiles` fires for every change anywhere in the project, so the
 * cheap basename test comes first. Only a build file sitting *at* a project root
 * counts: that root is the `cwd` every provider is constructed with, so a nested
 * `package.json` deeper in the tree produces no targets and would make this
 * refresh for nothing.
 */
function rootFor(filePath: string): string | undefined {
  if (!Utils.buildFileNames.includes(path.basename(filePath))) {
    return undefined;
  }

  const parent = path.dirname(filePath);

  return atom.project.getPaths().find((projectPath) => projectPath === parent);
}

/**
 * Refreshes build targets when a file that produces them changes.
 *
 * Two mechanisms, because they cover different ground:
 *
 * - **Project roots** go through `atom.project.onDidChangeFiles`, a single
 *   native subscription that already exists for the whole window. It reports
 *   creations and deletions too, so a build file added to a project that had
 *   none is picked up — which the per-provider `fs.watch` this replaces could
 *   never do, since it could only watch files that already existed.
 * - **The home directory** is not covered by that: `onDidChangeFiles` only
 *   watches open project paths. `~/.buildium.*` acts as a fallback for every
 *   project (see `CustomFile.isEligible`), so those paths are polled with
 *   `fs.watchFile`. Polling also sidesteps the Linux `fs.watch` quirk where
 *   closing a watcher fires another callback.
 *
 * @param onChange Invoked with the project roots whose targets are now stale.
 */
export default function watchBuildFiles(onChange: (roots: string[]) => void): Disposable {
  const subscriptions = new CompositeDisposable();
  const pendingRoots = new Set<string>();

  let timer: ReturnType<typeof setTimeout> | undefined;

  function flush(): void {
    timer = undefined;

    const roots = [...pendingRoots];
    pendingRoots.clear();

    if (!roots.length) {
      return;
    }

    DevConsole.log('Build files changed, refreshing targets for', roots);
    onChange(roots);
  }

  function schedule(roots: string[]): void {
    roots.forEach((root) => pendingRoots.add(root));

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(flush, DEBOUNCE_MS);
  }

  // ── Project roots ───────────────────────────────────────────────────────

  subscriptions.add(
    atom.project.onDidChangeFiles((events) => {
      const roots = new Set<string>();

      events.forEach((event) => {
        const root = rootFor(event.path);

        if (root) {
          roots.add(root);
        }

        // A rename away from a build file name has to invalidate the targets
        // the old name produced, and only `oldPath` still carries it.
        if (event.action === 'renamed') {
          const oldRoot = rootFor(event.oldPath);

          if (oldRoot) {
            roots.add(oldRoot);
          }
        }
      });

      if (roots.size) {
        schedule([...roots]);
      }
    })
  );

  // ── Home directory ──────────────────────────────────────────────────────

  // Every candidate name is polled, not just the ones that exist now:
  // `fs.watchFile` happily watches a path that is not there yet and reports it
  // when it appears, which is how a newly created `~/.buildium.json` is
  // noticed. A home-directory build file feeds every project, so any change
  // invalidates all roots.
  const homeWatchers = Utils.homeBuildFileNames.map((fileName) => {
    const filePath = path.join(homeDir, fileName);

    const listener = (current: fs.Stats, previous: fs.Stats) => {
      // Fires on every poll; `mtimeMs` is 0 for a path that does not exist, so
      // this covers creation and deletion as well as modification.
      if (current.mtimeMs === previous.mtimeMs) {
        return;
      }

      schedule(atom.project.getPaths());
    };

    fs.watchFile(filePath, listener);

    return () => fs.unwatchFile(filePath, listener);
  });

  subscriptions.add(
    new Disposable(() => {
      homeWatchers.forEach((unwatch) => unwatch());
    })
  );

  return new Disposable(() => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }

    pendingRoots.clear();
    subscriptions.dispose();
  });
}
