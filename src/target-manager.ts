import { CompositeDisposable } from 'atom';
import EventEmitter from 'events';
import * as Utils from './utils.ts';
import Config from './config.ts';
import DevConsole from './log.ts';
import TargetsView from './targets-view.ts';
import type { BuildTarget, BuildProviderConstructor, BusyProvider, PathTarget, ResolvedBuildTarget } from './types.ts';

class TargetManager extends EventEmitter {
  private pathTargets: PathTarget[];
  private tools: BuildProviderConstructor[] = [];
  private busyProvider?: BusyProvider;
  private targetsView: TargetsView | null = null;

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

  setBusyProvider(busyProvider: BusyProvider): void {
    this.busyProvider = busyProvider;
  }

  private _defaultPathTarget(path: string): PathTarget {
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

  destroy(): void {
    this.pathTargets.forEach((pathTarget) =>
      pathTarget.tools.map((tool) => {
        tool.removeAllListeners?.('refresh');
        tool.destructor?.();
      })
    );
  }

  setTools(tools: BuildProviderConstructor[] | undefined): void {
    this.tools = tools || [];
  }

  refreshTargets(refreshPaths?: string[]): Promise<void> {
    DevConsole.log('Refreshing targets');

    const paths = refreshPaths || atom.project.getPaths();

    this.busyProvider?.add(`Refreshing targets for ${paths.join(',')}`);

    const pathPromises = paths.map((path) => {
      const pathTarget = this.pathTargets.find((pt) => pt.path === path);

      if (!pathTarget) {
        return Promise.resolve(undefined);
      }

      pathTarget.loading = true;
      pathTarget.instancedTools.forEach((tool) => tool.removeAllListeners?.('refresh'));
      pathTarget.instancedTools = [];

      const settingsPromise = this.tools
        .map((Tool) => new Tool(path))
        .filter((tool) => tool.isEligible())
        .map((tool) => {
          pathTarget.instancedTools.push(tool);
          tool.on?.('refresh', () => this.refreshTargets([path]));

          return Promise.resolve()
            .then(() => tool.settings())
            .catch((err: Error) => {
              if (err instanceof SyntaxError) {
                atom.notifications.addError('Invalid build file.', {
                  detail: `You have a syntax error in your build file: ${err.message}`,
                  dismissable: true
                });
              } else {
                const toolName = tool.getNiceName();

                atom.notifications.addError(`Ooops. Something went wrong${toolName ? ` in the ${toolName} build provider` : ''}.`, {
                  detail: err.message,
                  stack: err.stack,
                  dismissable: true
                });
              }

              return undefined;
            });
        });

      return Promise.all(settingsPromise)
        .then((results) => {
          const settings = Utils.uniquifySettings(
            results
              .flat()
              .filter((setting): setting is BuildTarget => Boolean(setting))
              .map((setting) => Utils.getDefaultSettings(path, setting))
          );

          if (null === pathTarget.activeTarget || !settings.find((s) => s.name === pathTarget.activeTarget)) {
            /* Active target has been removed or not set. Set it to the highest prio target */
            pathTarget.activeTarget = settings[0] ? settings[0].name : undefined;
          }

          // CompositeDisposable cannot be reused, so we must create a new instance on every refresh
          pathTarget.subscriptions.dispose();
          pathTarget.subscriptions = new CompositeDisposable();

          settings.forEach((setting) => {
            if (setting.keymap && !setting.atomCommandName) {
              setting.atomCommandName = `buildium:trigger:${setting.name}`;
            }

            if (setting.atomCommandName) {
              pathTarget.subscriptions.add(atom.commands.add('atom-workspace', setting.atomCommandName, (event) => this.emit('trigger', event)));
            }

            if (setting.keymap) {
              const keymapSpec = {
                'atom-workspace, atom-text-editor': {
                  [setting.keymap]: setting.atomCommandName as string
                }
              };

              pathTarget.subscriptions.add(atom.keymaps.add(setting.name, keymapSpec));
            }
          });

          pathTarget.targets = settings;
          pathTarget.loading = false;

          return pathTarget;
        })
        .catch((err: Error) => {
          atom.notifications.addError('Ooops. Something went wrong.', {
            detail: err.message,
            stack: err.stack,
            dismissable: true
          });

          return undefined;
        });
    });

    return Promise.all(pathPromises)
      .then((pathTargets) => {
        this.fillTargets(Utils.activePath(), false);
        this.emit('refresh-complete');
        this.busyProvider?.remove(`Refreshing targets for ${paths.join(',')}`);

        if (pathTargets.length === 0) {
          return;
        }

        if (Config.get('notificationOnRefresh')) {
          const rows = paths.map((path) => {
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
      .catch((err: Error) => {
        atom.notifications.addError('Ooops. Something went wrong.', {
          detail: err.message,
          stack: err.stack,
          dismissable: true
        });
      });
  }

  fillTargets(path: string | false | undefined, refreshOnEmpty = true): void {
    if (!this.targetsView || !path) {
      return;
    }

    const activeTarget = this.getActiveTarget(path);

    if (activeTarget) {
      this.targetsView.setActiveTarget(activeTarget.name);
    }

    this.getTargets(path, refreshOnEmpty)
      .then((targets) => targets.map((t) => t.name))
      .then((targetNames) => this.targetsView?.setItems(targetNames));
  }

  selectActiveTarget(): void {
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

    const targetsView = new TargetsView();
    this.targetsView = targetsView;

    if (this.isLoading(path)) {
      targetsView.setLoading('Loading project build targets…');
    } else {
      this.fillTargets(path);
    }

    targetsView
      .awaitSelection()
      .then((newTarget) => {
        this.setActiveTarget(path, newTarget);

        this.targetsView = null;
      })
      .catch((err: Error) => {
        targetsView.setError(err.message);

        this.targetsView = null;
      });
  }

  getTargets(path: string, refreshOnEmpty = true): Promise<ResolvedBuildTarget[]> {
    const pathTarget = this.pathTargets.find((pt) => pt.path === path);

    if (!pathTarget) {
      return Promise.resolve([]);
    }

    if (refreshOnEmpty && pathTarget.targets.length === 0) {
      return this.refreshTargets([pathTarget.path]).then(() => pathTarget.targets);
    }

    return Promise.resolve(pathTarget.targets);
  }

  getActiveTarget(path: string | false | undefined): ResolvedBuildTarget | null {
    const pathTarget = this.pathTargets.find((pt) => pt.path === path);

    if (!pathTarget) {
      return null;
    }

    return pathTarget.targets.find((target) => target.name === pathTarget.activeTarget) ?? null;
  }

  setActiveTarget(path: string, targetName: string): void {
    const pathTarget = this.pathTargets.find((pt) => pt.path === path);

    if (!pathTarget) {
      return;
    }

    pathTarget.activeTarget = targetName;

    this.emit('new-active-target', path, this.getActiveTarget(path));
  }

  isLoading(path: string): boolean {
    return Boolean(this.pathTargets.find((pt) => pt.path === path)?.loading);
  }
}

export default TargetManager;
