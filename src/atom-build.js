import { cosmiconfig, defaultLoaders } from 'cosmiconfig';
import EventEmitter from 'events';
import fs from 'fs';
import loaders from './loaders';
import os from 'os';
import path from 'path';
import pkg from '../package.json';

const explorer = cosmiconfig(pkg.name, {
  searchPlaces: ['.atom-build.cjs', '.atom-build.js', '.atom-build.json', '.atom-build.json5', '.atom-build.toml', '.atom-build.yaml', '.atom-build.yml'],
  loaders: {
    '.cson': loaders.cson,
    '.toml': loaders.toml,
    '.json': loaders.json5,
    '.json5': loaders.json5,
    'noExt': defaultLoaders['.json']
  }
});

async function getConfig(file) {
  const realFile = await fs.promises.realpath(file);

  return (await explorer.load(realFile)).config || {};
}

function createBuildConfig(build, name) {
  const conf = {
    name: 'Custom: ' + name,
    exec: build.cmd,
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
  constructor(cwd) {
    super();
    this.cwd = cwd;
    this.fileWatchers = [];
  }

  destructor() {
    this.fileWatchers.map((fw) => fw.close());
  }

  getNiceName() {
    return 'Custom file';
  }

  isEligible() {
    this.files = [].concat
      .apply(
        [],
        ['cjs', 'js', 'json', 'json5', 'cson', , 'toml', 'yaml', 'yml'].map((ext) => [
          path.join(this.cwd, `.atom-build.${ext}`),
          path.join(os.homedir(), `.atom-build.${ext}`)
        ])
      )
      .filter(fs.existsSync);
    return 0 < this.files.length;
  }

  async settings() {
    this.fileWatchers.map((fw) => fw.close());
    // On Linux, closing a watcher triggers a new callback, which causes an infinite loop
    // fallback to `watchFile` here which polls instead.
    this.fileWatchers = this.files.map((file) => (os.platform() === 'linux' ? fs.watchFile : fs.watch)(file, () => this.emit('refresh')));

    const config = [];
    const buildConfigs = await Promise.all(this.files.map(async (file) => await getConfig(file)));
    buildConfigs.map((build) => {
      config.push(
        createBuildConfig(build, build.name || 'default'),
        ...Object.keys(build.targets || {}).map((name) => createBuildConfig(build.targets[name], name))
      );
    });

    return config;
  }
}
