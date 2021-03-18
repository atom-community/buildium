// import CSON from 'cson-parser';
import EventEmitter from 'events';
import fs from 'fs';
import os from 'os';
import path from 'path';
import YAML from 'js-yaml';

function getConfig(file) {
  const realFile = fs.realpathSync(file);
  delete require.cache[realFile];
  switch (path.extname(file)) {
    case '.json':
    case '.js':
      return fs.readFileSync(realFile);

    case '.cson':
      // return CSON.parse(fs.readFileSync(realFile));

    case '.yaml':
    case '.yml':
      return YAML.safeLoad(fs.readFileSync(realFile));
  }

  return {};
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
    this.fileWatchers.forEach(fw => fw.close());
  }

  getNiceName() {
    return 'Custom file';
  }

  isEligible() {
    this.files = [].concat.apply([], [ 'json', 'cson', 'yaml', 'yml', 'js' ].map(ext => [
      path.join(this.cwd, `.atom-build.${ext}`),
      path.join(os.homedir(), `.atom-build.${ext}`)
    ])).filter(fs.existsSync);
    return 0 < this.files.length;
  }

  settings() {
    this.fileWatchers.forEach(fw => fw.close());
    // On Linux, closing a watcher triggers a new callback, which causes an infinite loop
    // fallback to `watchFile` here which polls instead.
    this.fileWatchers = this.files.map(file =>
      (os.platform() === 'linux' ? fs.watchFile : fs.watch)(file, () => this.emit('refresh'))
    );

    const config = [];
    this.files.map(getConfig).forEach(build => {
      config.push(
        createBuildConfig(build, build.name || 'default'),
        ...Object.keys(build.targets || {}).map(name => createBuildConfig(build.targets[name], name))
      );
    });

    return config;
  }
}
