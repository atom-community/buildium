import { Disposable } from 'atom';
import { spawn, type ChildProcess } from 'child_process';
import crossSpawn from 'cross-spawn';
import { ConflictDeclinedError, dependencyManager } from '@children-of-atom/dependency-manager';
import kill from 'tree-kill';
import * as Utils from './utils.ts';
import BuildError from './build-error.ts';
import BuildView from './build-view.ts';
import Config from './config.ts';
import DevConsole from './log.ts';
import ErrorMatcher from './error-matcher.ts';
import Linter, { type RegisterIndie } from './linter-integration.ts';
import SaveConfirmView from './save-confirm-view.ts';
import StatusBarView, { type StatusBarService } from './status-bar-view.ts';
import TargetManager from './target-manager.ts';
import Tools from './atom-build.ts';
import { name } from '../package.json';
import type { TextEditor } from 'atom';
import type { BuildProviderConstructor, BusyProvider, ResolvedBuildTarget } from './types.ts';
import { CompositeDisposable } from 'atom';
import { applyStyles } from '@children-of-atom/rosetta';

type BuildSource = 'trigger' | 'save';

/** A `child_process` handle plus the bookkeeping buildium hangs off it. */
type BuildChildProcess = ChildProcess & {
  killSignals: NodeJS.Signals[];
  killed: boolean;
};

export default {
  config: Config.schema,
  disposables: null as unknown as CompositeDisposable,

  tools: [] as BuildProviderConstructor[],
  targetManager: null as unknown as TargetManager,
  buildView: null as unknown as BuildView,
  errorMatcher: null as unknown as ErrorMatcher,
  linter: null as Linter | null,
  statusBarView: null as StatusBarView | null,
  saveConfirmView: null as SaveConfirmView | null,
  busyProvider: null as BusyProvider | null,
  child: null as BuildChildProcess | null,
  nextBuild: null as (() => void) | null,

  activate(): void {
    DevConsole.log('Activating package');

    this.disposables = new CompositeDisposable();
    this.disposables.add(applyStyles());

    if (!process.platform.startsWith('win')) {
      // Manually append /usr/local/bin as it may not be set on some systems,
      // and it's common to have node installed here. Keep it at end so it won't
      // accidentially override any other node installation

      // Note: This should probably be removed in a end-user friendly way...
      process.env.PATH = (process.env.PATH ? `${process.env.PATH}:` : '') + '/usr/local/bin';
    }

    dependencyManager(name).catch((error: unknown) => {
      if (error instanceof ConflictDeclinedError) {
        return;
      }

      DevConsole.error(error);
    });

    this.tools = [Tools as unknown as BuildProviderConstructor];
    this.linter = null;

    this.setupTargetManager();
    this.setupBuildView();
    this.setupErrorMatcher();

    atom.commands.add('atom-workspace', 'buildium:trigger', () => this.build('trigger'));
    atom.commands.add('atom-workspace', 'buildium:stop', () => this.stop());
    atom.commands.add('atom-workspace', 'buildium:confirm', () => {
      (document.activeElement as HTMLElement | null)?.click();
    });
    atom.commands.add('atom-workspace', 'buildium:no-confirm', () => {
      this.saveConfirmView?.cancel();
    });

    atom.workspace.observeTextEditors((editor) => {
      editor.onDidSave(() => {
        if (Config.get('buildOnSave')) {
          this.build('save');
        }
      });
    });

    atom.workspace.onDidChangeActivePaneItem(() => this.updateStatusBar());

    // This package activates lazily — `activationHooks` waits on the shell
    // environment, which on macOS means spawning a login shell. That regularly
    // lands *after* the initial packages have activated, and Atom's emitter does
    // not replay to late subscribers, so the event would never arrive and the
    // first refresh would never run. Hence the companion predicate.
    if (atom.packages.hasActivatedInitialPackages()) {
      this.targetManager.refreshTargets();
    } else {
      atom.packages.onDidActivateInitialPackages(() => this.targetManager.refreshTargets());
    }
  },

  setupTargetManager(): void {
    this.targetManager = new TargetManager();
    this.targetManager.setTools(this.tools);

    this.targetManager.on('refresh-complete', () => {
      this.updateStatusBar();
    });

    this.targetManager.once('refresh-complete', () => {
      DevConsole.log('First refresh complete');

      atom.packages.onDidActivatePackage((e) => {
        if (e.name.startsWith('build-') && (e as { mainModule?: { provideBuilder?: unknown } }).mainModule?.provideBuilder) {
          DevConsole.log('Activating', e.name);
          this.targetManager.refreshTargets();
        }
      });

      atom.packages.onDidDeactivatePackage((e) => {
        if (e.name.startsWith('build-') && (e as { mainModule?: { provideBuilder?: unknown } }).mainModule?.provideBuilder) {
          DevConsole.log('Deactivating', e.name);
          this.targetManager.refreshTargets();
        }
      });
    });

    this.targetManager.on('new-active-target', () => {
      this.updateStatusBar();

      if (Config.get('selectTriggers')) {
        this.build('trigger');
      }
    });

    this.targetManager.on('trigger', (event: Event) => this.build('trigger', event));
  },

  setupBuildView(): void {
    this.buildView = new BuildView();
  },

  setupErrorMatcher(): void {
    this.errorMatcher = new ErrorMatcher();

    this.errorMatcher.on('error', (message: string) => {
      atom.notifications.addError('Error matching failed!', {
        detail: message
      });
    });

    this.errorMatcher.on('matched', (match: string[]) => {
      if (match[0]) {
        this.buildView.scrollTo(match[0]);
      }
    });
  },

  deactivate(): void {
    DevConsole.log('Deactivating package');

    if (this.child) {
      this.child.removeAllListeners();
      kill(this.child.pid as number, 'SIGKILL');
      this.child = null;
    }

    this.statusBarView?.dispose();
    this.buildView?.destroy();
    this.saveConfirmView?.destroy();
    this.linter?.destroy();
    this.targetManager.destroy();

    this.disposables.dispose();
  },

  updateStatusBar(): void {
    const path = Utils.activePath();
    const activeTarget = this.targetManager.getActiveTarget(path);

    if (this.statusBarView && activeTarget) {
      this.statusBarView.setTarget(activeTarget.name);
    }
  },

  startNewBuild(source: BuildSource, atomCommandName: string | null): void {
    const path = Utils.activePath();
    let buildTitle = '';

    this.linter?.clear();

    Promise.resolve(path ? this.targetManager.getTargets(path) : [])
      .then((targets) => {
        if (!targets || 0 === targets.length) {
          throw new BuildError('No eligible build target.', 'No configuration to build this project exists.');
        }

        const target = targets.find((t) => t.atomCommandName === atomCommandName) ?? this.targetManager.getActiveTarget(path);

        if (!target?.exec) {
          throw new BuildError('Invalid build file.', 'No executable command specified.');
        }

        this.statusBarView?.buildStarted();
        this.busyProvider?.add(`${Utils.capitalizedName()}: ${target.name}`);
        this.buildView.buildStarted();
        this.buildView.setHeading('Running preBuild...');

        return Promise.resolve(target.preBuild ? target.preBuild() : null).then(() => target);
      })
      .then((target: ResolvedBuildTarget) => {
        const replace = Utils.replace;
        const env: Record<string, string> = { ...process.env, ...target.env } as Record<string, string>;

        Object.keys(env).forEach((key) => {
          env[key] = replace(env[key], target.env);
        });

        const exec = replace(target.exec, target.env);
        const args = target.args.map((arg) => replace(arg, target.env));
        const cwd = replace(target.cwd, target.env);
        const isWin = process.platform === 'win32';
        const shCmd = isWin ? 'cmd' : '/bin/sh';
        const shCmdArg = isWin ? '/C' : '-c';

        // Store this as we need to re-set it after postBuild
        buildTitle = [target.sh ? `${shCmd} ${shCmdArg} ${exec}` : exec, ...args, '\n'].join(' ');

        this.buildView.setHeading(buildTitle);

        const child = (
          target.sh
            ? spawn(shCmd, [shCmdArg, [exec].concat(args).join(' ')], {
                cwd: cwd,
                env: env,
                stdio: ['ignore', null, null]
              })
            : crossSpawn(exec, args, {
                cwd: cwd,
                env: env,
                stdio: ['ignore', null, null]
              })
        ) as BuildChildProcess;

        this.child = child;

        let stdout = '';
        let stderr = '';

        child.stdout?.setEncoding('utf8');
        child.stderr?.setEncoding('utf8');
        child.stdout?.on('data', (d: string) => {
          stdout += d;
          this.buildView.write(d);
        });
        child.stderr?.on('data', (d: string) => {
          stderr += d;
          this.buildView.write(d);
        });
        child.killSignals = (target.killSignals || ['SIGINT', 'SIGTERM', 'SIGKILL']).slice();

        child.on('error', (err: NodeJS.ErrnoException) => {
          this.buildView.write((target.sh ? 'Unable to execute with shell: ' : 'Unable to execute: ') + exec + '\n');

          if (/\s/.test(exec) && !target.sh) {
            this.buildView.write('`cmd` cannot contain space. Use `args` for arguments.\n');
          }

          if ('ENOENT' === err.code) {
            this.buildView.write(`Make sure cmd:'${exec}' and cwd:'${cwd}' exists and have correct access permissions.\n`);
            this.buildView.write(`Binaries are found in these folders: ${process.env.PATH}\n`);
          }
        });

        child.on('close', (exitCode) => {
          this.child = null;
          this.errorMatcher.set(target, cwd, stdout + stderr);

          let success = 0 === exitCode;

          if (Config.get('matchedErrorFailsBuild')) {
            success = success && !this.errorMatcher.getMatches().some((match) => match.type?.toLowerCase() === 'error');
          }

          this.linter?.processMessages(this.errorMatcher.getMatches(), cwd);

          if (Config.get('beepWhenDone')) {
            atom.beep();
          }

          this.buildView.setHeading('Running postBuild...');

          return Promise.resolve(target.postBuild ? target.postBuild(success, stdout, stderr) : null).then(() => {
            this.buildView.setHeading(buildTitle);

            this.busyProvider?.remove(`${Utils.capitalizedName()}: ${target.name}`, success);
            this.buildView.buildFinished(success);
            this.statusBarView?.setBuildSuccess(success);

            // The panel stays open after a successful build; it is closed by the
            // user, by the next build's `reset()` or by `buildium:toggle-panel`.
            if (!success && Config.get('scrollOnError')) {
              this.errorMatcher.matchFirst();
            }

            this.nextBuild?.();
            this.nextBuild = null;
          });
        });
      })
      .catch((err: Error) => {
        if (err instanceof BuildError) {
          if (source === 'save') {
            // If there is no eligible build tool, and cause of build was a save, stay quiet.
            return;
          }

          atom.notifications.addWarning(err.name, {
            detail: err.message,
            stack: err.stack
          } as NotificationOptions);
        } else {
          atom.notifications.addError('Failed to build.', {
            detail: err.message,
            stack: err.stack
          });
        }
      });
  },

  sendNextSignal(): void {
    try {
      const signal = this.child?.killSignals.shift();
      kill(this.child?.pid as number, signal);
    } catch {
      /* Something may have happened to the child (e.g. terminated by itself). Ignore this. */
    }
  },

  abort(cb?: () => void): void {
    if (this.child && !this.child.killed) {
      this.buildView.buildAbortInitiated();
      this.child.killed = true;
      this.child.on('exit', () => {
        this.child = null;
        cb?.();
      });
    }

    this.sendNextSignal();
  },

  build(source: BuildSource, event?: Event): void {
    this.doSaveConfirm(this.unsavedTextEditors(), () => {
      const nextBuild = this.startNewBuild.bind(this, source, event ? event.type : null);

      if (this.child) {
        this.nextBuild = nextBuild;
        return this.abort();
      }

      return nextBuild();
    });
  },

  doSaveConfirm(modifiedTextEditors: TextEditor[], continuecb: () => void, cancelcb?: () => void): void {
    const saveAndContinue = (save: boolean) => {
      modifiedTextEditors.forEach((textEditor) => save && textEditor.save());
      continuecb();
    };

    if (0 === modifiedTextEditors.length || Config.get('saveOnBuild')) {
      saveAndContinue(true);
      return;
    }

    this.saveConfirmView?.destroy();

    this.saveConfirmView = new SaveConfirmView();
    this.saveConfirmView.show(saveAndContinue, cancelcb);
  },

  unsavedTextEditors(): TextEditor[] {
    return atom.workspace.getTextEditors().filter((textEditor) => {
      return textEditor.isModified() && undefined !== textEditor.getPath();
    });
  },

  stop(): void {
    this.nextBuild = null;

    if (this.child) {
      this.abort(() => {
        this.buildView.buildAborted();
        this.statusBarView?.buildAborted();
      });
    } else {
      this.buildView.reset();
    }
  },

  consumeLinterIndie(registerIndie: RegisterIndie): void {
    DevConsole.log('Consuming linter');

    this.linter?.destroy();
    this.linter = new Linter(registerIndie);
  },

  consumeBuilder(builder: BuildProviderConstructor | BuildProviderConstructor[]): Disposable {
    DevConsole.log('Consuming builder');

    if (Array.isArray(builder)) this.tools.push(...builder);
    else this.tools.push(builder);

    this.targetManager.setTools(this.tools);

    return new Disposable(() => {
      this.tools = this.tools.filter(Array.isArray(builder) ? (tool) => builder.indexOf(tool) === -1 : (tool) => tool !== builder);
      this.targetManager.setTools(this.tools);
    });
  },

  consumeStatusBar(statusBar: StatusBarService): void {
    DevConsole.log('Consuming status-bar');

    // No `attach()` here: `Config.observe` fires immediately with the current
    // value, so the two `observe` calls in the constructor have already attached
    // the tile. A third call would only destroy and re-create it.
    this.statusBarView = new StatusBarView(statusBar);
    this.statusBarView.onClick(() => this.targetManager.selectActiveTarget());
    this.targetManager.refreshTargets();
  },

  consumeBusySignal(registry: { create(): BusyProvider }): void {
    DevConsole.log('Consuming busy-signal');

    this.busyProvider = registry.create();
    this.targetManager.setBusyProvider(this.busyProvider);
  }
};
