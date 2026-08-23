import { cosmiconfig, defaultLoaders } from 'cosmiconfig';
import EventEmitter from 'events';
import fs from 'fs';
import os from 'os';
import path from 'path';
import loaders from './loaders.ts';
import * as Utils from './utils.ts';
import pkg from '../package.json';
import type { BuildFileTarget, BuildTarget } from './types.ts';
import DevConsole from './log.ts';

const explorer = cosmiconfig(pkg.name, {
  // `package.json` is read through cosmiconfig's `packageProp`, which defaults
  // to the module name — the `buildium` object the readme documents.
  searchPlaces: [...Utils.buildFileNames],

  // cosmiconfig caches by filepath and defaults to `cache: true`, and this
  // explorer is a module-level singleton shared by every provider instance. A
  // refresh constructs a fresh `CustomFile`, but it would still be handed the
  // config that was read the first time — so editing a build file appeared to do
  // nothing while *creating* one worked, its path not being in the cache yet.
  // Refreshes are exactly the moments the file must be re-read, and they are
  // rare, so there is nothing here for a cache to win.
  cache: false,

  loaders: {
    '.cjs': loaders.javascript,
    '.js': loaders.javascript,
    '.toml': loaders.toml,
    '.json': loaders.jsonc,
    '.json5': loaders.json5,
    '.jsonc': loaders.jsonc,
    '.pkl': loaders.pkl,
    '.yaml': defaultLoaders['.yaml'],
    '.yml': defaultLoaders['.yml'],
    'noExt': loaders.jsonc
  }
});

/**
 * Renames a legacy build file to its `buildium.config.*` equivalent, keeping the
 * extension so the same loader still applies.
 *
 * No refresh is triggered here: a rename inside a project root is reported by
 * `build-file-watcher.ts`, which refreshes the targets both names produce.
 */
async function renameLegacyFile(realFile: string, targetFile: string): Promise<void> {
  try {
    // `rename` would silently replace an existing file, and that file is a build
    // config the user may well still be using
    await fs.promises.access(targetFile, fs.constants.F_OK);

    atom.notifications.addError('Could not rename the build file.', {
      detail: `\`${path.basename(targetFile)}\` already exists in ${path.dirname(targetFile)}.`,
      dismissable: true
    });

    return;
  } catch {
    // The target does not exist, which is what we want
  }

  try {
    await fs.promises.rename(realFile, targetFile);
  } catch (err) {
    atom.notifications.addError('Could not rename the build file.', {
      detail: (err as Error).message,
      dismissable: true
    });

    return;
  }

  atom.notifications.addSuccess(`Renamed \`${path.basename(realFile)}\` to \`${path.basename(targetFile)}\``);
}

/**
 * Warns that a build file uses a legacy name, offering to rename it in place.
 */
function warnLegacyName(realFile: string, baseName: string, targetName: string): void {
  const message = `Deprecation warning: \`${baseName}\` is a legacy build file name. Use \`${targetName}\` instead.`;

  DevConsole.warn(message);

  const notification = atom.notifications.addWarning(message, {
    dismissable: true,
    buttons: [
      {
        text: `Rename Config File`,
        onDidClick: () => {
          notification.dismiss();
          renameLegacyFile(realFile, path.join(path.dirname(realFile), targetName));
        }
      },
      {
        text: 'Ignore',
        onDidClick: () => notification.dismiss()
      }
    ]
  });
}

/**
 * Loads one build file. Returns `null` when the file holds no build
 * configuration at all — which is the common case for `package.json`, where
 * cosmiconfig yields an empty result unless the `buildium` object is present.
 * Without this, every project with a `package.json` would gain a phantom target
 * whose `exec` is `undefined`.
 */
async function getConfig(file: string): Promise<BuildFileTarget | null> {
  const realFile = await fs.promises.realpath(file);
  const baseName = path.basename(realFile);

  const modernName = Utils.modernBuildFileName(baseName);

  if (modernName) {
    warnLegacyName(realFile, baseName, modernName);
  }

  const result = await explorer.load(realFile);
  const config = result?.config as BuildFileTarget | undefined;

  if (!config || (!config.cmd && !config.targets)) {
    return null;
  }

  return config;
}

function createBuildConfig(build: BuildFileTarget, name: string): BuildTarget {
  const conf: BuildTarget = {
    name: `Custom: ${name}`,
    exec: build.cmd as string,
    env: build.env,
    args: build.args,
    cwd: build.cwd,
    sh: build.sh,
    errorMatch: build.errorMatch,
    functionMatch: build.functionMatch,
    warningMatch: build.warningMatch,
    atomCommandName: build.atomCommandName,
    keymap: build.keymap,
    killSignals: build.killSignals
  };

  if (typeof build.postBuild === 'function') {
    conf.postBuild = build.postBuild;
  }

  if (typeof build.preBuild === 'function') {
    conf.preBuild = build.preBuild;
  }

  return conf;
}

/**
 * The built-in provider: build targets read out of the project's build file.
 *
 * Watching those files is *not* this class's job — `build-file-watcher.ts`
 * covers every candidate name across every project root from one subscription,
 * including files that do not exist yet. The `refresh` event stays part of the
 * `BuildProvider` contract for third-party providers.
 */
export default class CustomFile extends EventEmitter {
  private cwd: string;
  private files: string[] = [];

  constructor(cwd: string) {
    super();
    this.cwd = cwd;
  }

  getNiceName(): string {
    return 'Custom file';
  }

  isEligible(): boolean {
    // A build file in the home directory acts as a fallback for every project,
    // so both locations are collected and their targets concatenated.
    this.files = [
      ...Utils.buildFileNames.map((fileName) => path.join(this.cwd, fileName)),
      ...Utils.homeBuildFileNames.map((fileName) => path.join(os.homedir(), fileName))
    ].filter((file) => fs.existsSync(file));

    return 0 < this.files.length;
  }

  async settings(): Promise<BuildTarget[]> {
    const config: BuildTarget[] = [];
    const buildConfigs = await Promise.all(this.files.map((file) => getConfig(file)));

    buildConfigs.forEach((build) => {
      // `getConfig` returns `null` for a file that carries no build
      // configuration — a `package.json` without a `buildium` object, say.
      if (!build) {
        return;
      }

      config.push(
        createBuildConfig(build, build.name || 'default'),
        ...Object.keys(build.targets || {}).map((name) => createBuildConfig((build.targets as Record<string, BuildFileTarget>)[name] as BuildFileTarget, name))
      );
    });

    return config;
  }
}
