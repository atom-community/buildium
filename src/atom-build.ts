import { cosmiconfig } from 'cosmiconfig';
import EventEmitter from 'events';
import fs from 'fs';
import os from 'os';
import path from 'path';
import loaders from './loaders.ts';
import pkg from '../package.json';
import type { BuildFileTarget, BuildTarget } from './types.ts';
import DevConsole from './log.ts';

const buildFileExtensions = ['cjs', 'js', 'json', 'json5', 'jsonc', 'toml', 'yaml', 'yml'];

const buildFiles = [
  'buildium.config.cjs',
  'buildium.config.js',
  'buildium.config.json',
  'buildium.config.json5',
  'buildium.config.jsonc',
  'buildium.config.toml',
  'buildium.config.yaml',
  'buildium.config.yml'
];
const legacyBuildFiles = [
  '.atom-build.cjs',
  '.atom-build.js',
  '.atom-build.json',
  '.atom-build.json5',
  '.atom-build.jsonc',
  '.atom-build.toml',
  '.atom-build.yaml',
  '.atom-build.yml'
];

const explorer = cosmiconfig(pkg.name, {
  searchPlaces: [...buildFiles, ...legacyBuildFiles],
  loaders: {
    '.toml': loaders.toml,
    '.json': loaders.jsonc,
    '.json5': loaders.json5,
    '.jsonc': loaders.jsonc,
    'noExt': loaders.jsonc
  }
});

async function getConfig(file: string): Promise<BuildFileTarget> {
  const realFile = await fs.promises.realpath(file);
  const baseName = path.basename(realFile);

  if (legacyBuildFiles.includes(baseName)) {
    DevConsole.warn(`Deprecation warning: ${baseName} is a legacy build file name.`);
  }

  const result = await explorer.load(realFile);

  return (result?.config as BuildFileTarget) || {};
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

export default class CustomFile extends EventEmitter {
  private cwd: string;
  private fileWatchers: Array<{ close(): void }> = [];
  private files: string[] = [];

  constructor(cwd: string) {
    super();
    this.cwd = cwd;
  }

  destructor(): void {
    this.fileWatchers.forEach((fw) => fw.close());
  }

  getNiceName(): string {
    return 'Custom file';
  }

  isEligible(): boolean {
    this.files = buildFileExtensions
      .flatMap((ext) => [path.join(this.cwd, `.atom-build.${ext}`), path.join(os.homedir(), `.atom-build.${ext}`)])
      .filter((file) => fs.existsSync(file));

    return 0 < this.files.length;
  }

  async settings(): Promise<BuildTarget[]> {
    this.fileWatchers.forEach((fw) => fw.close());

    // On Linux, closing a watcher triggers a new callback, which causes an infinite loop
    // fallback to `watchFile` here which polls instead.
    this.fileWatchers = this.files.map((file) => {
      const onRefresh = () => this.emit('refresh');

      if (os.platform() === 'linux') {
        fs.watchFile(file, onRefresh);

        // `fs.watchFile` returns a `StatWatcher`, which has no `close()`
        return { close: () => fs.unwatchFile(file, onRefresh) };
      }

      return fs.watch(file, onRefresh);
    });

    const config: BuildTarget[] = [];
    const buildConfigs = await Promise.all(this.files.map((file) => getConfig(file)));

    buildConfigs.forEach((build) => {
      config.push(
        createBuildConfig(build, build.name || 'default'),
        ...Object.keys(build.targets || {}).map((name) => createBuildConfig((build.targets as Record<string, BuildFileTarget>)[name] as BuildFileTarget, name))
      );
    });

    return config;
  }
}
