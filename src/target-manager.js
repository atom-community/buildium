import { CompositeDisposable } from 'atom';
import * as Utils from './utils';
import Config from './config';
import DevConsole from './log';
import EventEmitter from 'events';
import TargetsView from './targets-view';

class TargetManager extends EventEmitter {
  constructor() {
    super();

    let projectPaths = atom.project.getPaths();

    this.pathTargets = projectPaths.map((path) => this._defaultPathTarget(path));

    atom.project.onDidChangePaths((newProjectPaths) => {
      const addedPaths = newProjectPaths.filter((el) => projectPaths.indexOf(el) === -1);
      const removedPaths = projectPaths.filter((el) => newProjectPaths.indexOf(el) === -1);
      addedPaths.forEach((path) => this.pathTargets.push(this._defaultPathTarget(path)));
      this.pathTargets = this.pathTargets.filter((pt) => -1 === removedPaths.indexOf(pt.path));
      this.refreshTargets(addedPaths);
      projectPaths = newProjectPaths;
    });

    atom.commands.add('atom-workspace', 'buildium:refresh-targets', () => this.refreshTargets());
    atom.commands.add('atom-workspace', 'buildium:select-active-target', () => this.selectActiveTarget());
  }

  setBusyProvider(busyProvider) {
    this.busyProvider = busyProvider;
  }

  _defaultPathTarget(path) {
    return {
      path: path,
      loading: false,
      targets: [],
      instancedTools: [],
      activeTarget: null,
      tools: [],
      subscriptions: new CompositeDisposable()
    };
  }

  destroy() {
    this.pathTargets.forEach((pathTarget) =>
      pathTarget.tools.map((tool) => {
        tool.removeAllListeners && tool.removeAllListeners('refresh');
        tool.destructor && tool.destructor();
      })
    );
  }

  setTools(tools) {
    this.tools = tools || [];
  }

  refreshTargets(refreshPaths) {
    DevConsole.log('Refreshing targets');

    refreshPaths = refreshPaths || atom.project.getPaths();

    this.busyProvider && this.busyProvider.add(`Refreshing targets for ${refreshPaths.join(',')}`);
    const pathPromises = refreshPaths.map((path) => {
      const pathTarget = this.pathTargets.find((pt) => pt.path === path);
      pathTarget.loading = true;

      pathTarget.instancedTools = pathTarget.instancedTools.map((t) => t.removeAllListeners && t.removeAllListeners('refresh')).filter(() => false); // Just empty the array

      const settingsPromise = this.tools
        .map((Tool) => new Tool(path))
        .filter((tool) => tool.isEligible())
        .map((tool) => {
          pathTarget.instancedTools.push(tool);
          tool.on && tool.on('refresh', this.refreshTargets.bind(this, [path]));
          return Promise.resolve()
            .then(async () => await tool.settings())
            .catch((err) => {
              if (err instanceof SyntaxError) {
                atom.notifications.addError('Invalid build file.', {
                  detail: 'You have a syntax error in your build file: ' + err.message,
                  dismissable: true
                });
              } else {
                const toolName = tool.getNiceName();
                atom.notifications.addError('Ooops. Something went wrong' + (toolName ? ' in the ' + toolName + ' build provider' : '') + '.', {
                  detail: err.message,
                  stack: err.stack,
                  dismissable: true
                });
              }
            });
        });

      return Promise.all(settingsPromise)
        .then((settings) => {
          settings = Utils.uniquifySettings(
            [].concat
              .apply([], settings)
              .filter(Boolean)
              .map((setting) => Utils.getDefaultSettings(path, setting))
          );

          if (null === pathTarget.activeTarget || !settings.find((s) => s.name === pathTarget.activeTarget)) {
            /* Active target has been removed or not set. Set it to the highest prio target */
            pathTarget.activeTarget = settings[0] ? settings[0].name : undefined;
          }

          // CompositeDisposable cannot be reused, so we must create a new instance on every refresh
          pathTarget.subscriptions.dispose();
          pathTarget.subscriptions = new CompositeDisposable();

          settings.forEach((setting, index) => {
            if (setting.keymap && !setting.atomCommandName) {
              setting.atomCommandName = `buildium:trigger:${setting.name}`;
            }

            if (setting.atomCommandName) {
              pathTarget.subscriptions.add(
                atom.commands.add('atom-workspace', setting.atomCommandName, (atomCommandName) => this.emit('trigger', atomCommandName))
              );
            }

            if (setting.keymap) {
              const keymapSpec = { 'atom-workspace, atom-text-editor': {} };
              keymapSpec['atom-workspace, atom-text-editor'][setting.keymap] = setting.atomCommandName;
              pathTarget.subscriptions.add(atom.keymaps.add(setting.name, keymapSpec));
            }
          });

          pathTarget.targets = settings;
          pathTarget.loading = false;

          return pathTarget;
        })
        .catch((err) => {
          atom.notifications.addError('Ooops. Something went wrong.', {
            detail: err.message,
            stack: err.stack,
            dismissable: true
          });
        });
    });

    return Promise.all(pathPromises)
      .then((pathTargets) => {
        this.fillTargets(Utils.activePath(), false);
        this.emit('refresh-complete');
        this.busyProvider && this.busyProvider.remove(`Refreshing targets for ${refreshPaths.join(',')}`);

        if (pathTargets.length === 0) {
          return;
        }

        if (Config.get('notificationOnRefresh')) {
          const rows = refreshPaths.map((path) => {
            const pathTarget = this.pathTargets.find((pt) => pt.path === path);
            if (!pathTarget) {
              return `Targets ${path} no longer exists. Is build deactivated?`;
            }
            return `${pathTarget.targets.length} targets at: ${path}`;
          });
          atom.notifications.addInfo('Build targets parsed.', {
            detail: rows.join('\n')
          });
        }
      })
      .catch((err) => {
        atom.notifications.addError('Ooops. Something went wrong.', {
          detail: err.message,
          stack: err.stack,
          dismissable: true
        });
      });
  }

  fillTargets(path, refreshOnEmpty = true) {
    if (!this.targetsView) {
      return;
    }

    const activeTarget = this.getActiveTarget(path);
    activeTarget && this.targetsView.setActiveTarget(activeTarget.name);

    this.getTargets(path, refreshOnEmpty)
      .then((targets) => targets.map((t) => t.name))
      .then((targetNames) => this.targetsView && this.targetsView.setItems(targetNames));
  }

  selectActiveTarget() {
    if (Config.get('refreshOnShowTargetList')) {
      this.refreshTargets();
    }

    const path = Utils.activePath();
    if (!path) {
      atom.notifications.addWarning('Unable to build.', {
        detail: 'Open file is not part of any open project in Atom'
      });
      return;
    }

    this.targetsView = new TargetsView();

    if (this.isLoading(path)) {
      this.targetsView.setLoading('Loading project build targets\u2026');
    } else {
      this.fillTargets(path);
    }

    this.targetsView
      .awaitSelection()
      .then((newTarget) => {
        this.setActiveTarget(path, newTarget);

        this.targetsView = null;
      })
      .catch((err) => {
        this.targetsView.setError(err.message);
        this.targetsView = null;
      });
  }

  getTargets(path, refreshOnEmpty = true) {
    const pathTarget = this.pathTargets.find((pt) => pt.path === path);
    if (!pathTarget) {
      return Promise.resolve([]);
    }

    if (refreshOnEmpty && pathTarget.targets.length === 0) {
      return this.refreshTargets([pathTarget.path]).then(() => pathTarget.targets);
    }
    return Promise.resolve(pathTarget.targets);
  }

  getActiveTarget(path) {
    const pathTarget = this.pathTargets.find((pt) => pt.path === path);
    if (!pathTarget) {
      return null;
    }
    return pathTarget.targets.find((target) => target.name === pathTarget.activeTarget);
  }

  setActiveTarget(path, targetName) {
    this.pathTargets.find((pt) => pt.path === path).activeTarget = targetName;
    this.emit('new-active-target', path, this.getActiveTarget(path));
  }

  isLoading(path) {
    return this.pathTargets.find((pt) => pt.path === path).loading;
  }
}

export default TargetManager;
