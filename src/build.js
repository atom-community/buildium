import { Disposable } from 'atom';
import { spawn } from 'child_process';
import * as atomPackageDeps from 'atom-package-deps';
import * as Utils from './utils';
import BuildError from './build-error';
import BuildView from './build-view';
import Config from './config';
import crossSpawn from 'cross-spawn';
import DevConsole from './log';
import ErrorMatcher from './error-matcher';
import kill from 'tree-kill';
import Linter from './linter-integration';
import pkg from '../package.json';
import SaveConfirmView from './save-confirm-view';
import StatusBarView from './status-bar-view';
import TargetManager from './target-manager';
import Tools from './atom-build';

export default {
  config: Config.schema,

  activate() {
    DevConsole.log('Activating package');

    if (!/^win/.test(process.platform)) {
      // Manually append /usr/local/bin as it may not be set on some systems,
      // and it's common to have node installed here. Keep it at end so it won't
      // accidentially override any other node installation

      // Note: This should probably be removed in a end-user friendly way...
      process.env.PATH = (process.env.PATH ? process.env.PATH + ':' : '') + '/usr/local/bin';
    }

    atomPackageDeps.install(pkg.name);

    this.tools = [Tools];
    this.linter = null;

    this.setupTargetManager();
    this.setupBuildView();
    this.setupErrorMatcher();

    atom.commands.add('atom-workspace', 'buildium:trigger', () => this.build('trigger'));
    atom.commands.add('atom-workspace', 'buildium:stop', () => this.stop());
    atom.commands.add('atom-workspace', 'buildium:confirm', () => {
      document.activeElement.click();
    });
    atom.commands.add('atom-workspace', 'buildium:no-confirm', () => {
      if (this.saveConfirmView) {
        this.saveConfirmView.cancel();
      }
    });

    atom.workspace.observeTextEditors((editor) => {
      editor.onDidSave(() => {
        if (Config.get('buildOnSave')) {
          this.build('save');
        }
      });
    });

    atom.workspace.onDidChangeActivePaneItem(() => this.updateStatusBar());
    atom.packages.onDidActivateInitialPackages(() => this.targetManager.refreshTargets());

    if (!Config.get('muteConflictWarning') && atom.packages.isPackageActive('build')) {
      this.disableBuild();
    }
  },

  setupTargetManager() {
    this.targetManager = new TargetManager();
    this.targetManager.setTools(this.tools);
    this.targetManager.on('refresh-complete', () => {
      this.updateStatusBar();
    });
    this.targetManager.once('refresh-complete', () => {
      console.log('First refresh complete');
      atom.packages.onDidActivatePackage((e) => {
        if (e.name.startsWith('build-') && e.mainModule.provideBuilder) {
          console.log('Activating', e.name);
          this.targetManager.refreshTargets();
        }
      });
      atom.packages.onDidDeactivatePackage((e) => {
        if (e.name.startsWith('build-') && e.mainModule.provideBuilder) {
          console.log('Deactivating', e.name);
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
    this.targetManager.on('trigger', (atomCommandName) => this.build('trigger', atomCommandName));
  },

  setupBuildView() {
    this.buildView = new BuildView();
  },

  setupErrorMatcher() {
    this.errorMatcher = new ErrorMatcher();
    this.errorMatcher.on('error', (message) => {
      atom.notifications.addError('Error matching failed!', {
        detail: message
      });
    });
    this.errorMatcher.on('matched', (match) => {
      match[0] && this.buildView.scrollTo(match[0]);
    });
  },

  deactivate() {
    DevConsole.log('Deactivating package');

    if (this.child) {
      this.child.removeAllListeners();
      kill(this.child.pid, 'SIGKILL');
      this.child = null;
    }

    this.statusBarView && this.statusBarView.destroy();
    this.buildView && this.buildView.destroy();
    this.saveConfirmView && this.saveConfirmView.destroy();
    this.linter && this.linter.destroy();
    this.targetManager.destroy();

    clearTimeout(this.finishedTimer);
  },

  updateStatusBar() {
    const path = Utils.activePath();
    const activeTarget = this.targetManager.getActiveTarget(path);
    this.statusBarView && activeTarget && this.statusBarView.setTarget(activeTarget.name);
  },

  startNewBuild(source, atomCommandName) {
    const path = Utils.activePath();
    let buildTitle = '';
    this.linter && this.linter.clear();

    Promise.resolve(this.targetManager.getTargets(path))
      .then((targets) => {
        if (!targets || 0 === targets.length) {
          throw new BuildError('No eligible build target.', 'No configuration to build this project exists.');
        }

        let target = targets.find((t) => t.atomCommandName === atomCommandName);
        if (!target) {
          target = this.targetManager.getActiveTarget(path);
        }

        if (!target.exec) {
          throw new BuildError('Invalid build file.', 'No executable command specified.');
        }

        this.statusBarView && this.statusBarView.buildStarted();
        this.busyProvider && this.busyProvider.add(`${Utils.capitalizedName()}: ${target.name}`);
        this.buildView.buildStarted();
        this.buildView.setHeading('Running preBuild...');

        return Promise.resolve(target.preBuild ? target.preBuild() : null).then(() => target);
      })
      .then((target) => {
        const replace = Utils.replace;
        const env = Object.assign({}, process.env, target.env);
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
        if (target.sh) {
          this.child = spawn(shCmd, [shCmdArg, [exec].concat(args).join(' ')], {
            cwd: cwd,
            env: env,
            stdio: ['ignore', null, null]
          });
        } else {
          this.child = crossSpawn(exec, args, {
            cwd: cwd,
            env: env,
            stdio: ['ignore', null, null]
          });
        }

        let stdout = '';
        let stderr = '';
        this.child.stdout.setEncoding('utf8');
        this.child.stderr.setEncoding('utf8');
        this.child.stdout.on('data', (d) => (stdout += d));
        this.child.stderr.on('data', (d) => (stderr += d));
        this.child.stdout.pipe(this.buildView.terminal);
        this.child.stderr.pipe(this.buildView.terminal);
        this.child.killSignals = (target.killSignals || ['SIGINT', 'SIGTERM', 'SIGKILL']).slice();

        this.child.on('error', (err) => {
          this.buildView.terminal.write((target.sh ? 'Unable to execute with shell: ' : 'Unable to execute: ') + exec + '\n');

          if (/\s/.test(exec) && !target.sh) {
            this.buildView.terminal.write('`cmd` cannot contain space. Use `args` for arguments.\n');
          }

          if ('ENOENT' === err.code) {
            this.buildView.terminal.write(`Make sure cmd:'${exec}' and cwd:'${cwd}' exists and have correct access permissions.\n`);
            this.buildView.terminal.write(`Binaries are found in these folders: ${process.env.PATH}\n`);
          }
        });

        this.child.on('close', (exitCode) => {
          this.child = null;
          this.errorMatcher.set(target, cwd, stdout + stderr);

          let success = 0 === exitCode;
          if (Config.get('matchedErrorFailsBuild')) {
            success = success && !this.errorMatcher.getMatches().some((match) => match.type && match.type.toLowerCase() === 'error');
          }

          this.linter && this.linter.processMessages(this.errorMatcher.getMatches(), cwd);

          if (Config.get('beepWhenDone')) {
            atom.beep();
          }

          this.buildView.setHeading('Running postBuild...');
          return Promise.resolve(target.postBuild ? target.postBuild(success, stdout, stderr) : null).then(() => {
            this.buildView.setHeading(buildTitle);

            this.busyProvider && this.busyProvider.remove(`${Utils.capitalizedName()}: ${target.name}`, success);
            this.buildView.buildFinished(success);
            this.statusBarView && this.statusBarView.setBuildSuccess(success);
            if (success) {
              this.finishedTimer = setTimeout(() => {
                this.buildView.detach();
              }, Config.get('autoToggleInterval'));
            } else {
              if (Config.get('scrollOnError')) {
                this.errorMatcher.matchFirst();
              }
            }

            this.nextBuild && this.nextBuild();
            this.nextBuild = null;
          });
        });
      })
      .catch((err) => {
        if (err instanceof BuildError) {
          if (source === 'save') {
            // If there is no eligible build tool, and cause of build was a save, stay quiet.
            return;
          }

          atom.notifications.addWarning(err.name, {
            detail: err.message,
            stack: err.stack
          });
        } else {
          atom.notifications.addError('Failed to build.', {
            detail: err.message,
            stack: err.stack
          });
        }
      });
  },

  sendNextSignal() {
    try {
      const signal = this.child.killSignals.shift();
      kill(this.child.pid, signal);
    } catch (e) {
      /* Something may have happened to the child (e.g. terminated by itself). Ignore this. */
    }
  },

  abort(cb) {
    if (!this.child.killed) {
      this.buildView.buildAbortInitiated();
      this.child.killed = true;
      this.child.on('exit', () => {
        this.child = null;
        cb && cb();
      });
    }

    this.sendNextSignal();
  },

  build(source, event) {
    clearTimeout(this.finishedTimer);

    this.doSaveConfirm(this.unsavedTextEditors(), () => {
      const nextBuild = this.startNewBuild.bind(this, source, event ? event.type : null);
      if (this.child) {
        this.nextBuild = nextBuild;
        return this.abort();
      }
      return nextBuild();
    });
  },

  doSaveConfirm(modifiedTextEditors, continuecb, cancelcb) {
    const saveAndContinue = (save) => {
      modifiedTextEditors.map((textEditor) => save && textEditor.save());
      continuecb();
    };

    if (0 === modifiedTextEditors.length || Config.get('saveOnBuild')) {
      saveAndContinue(true);
      return;
    }

    if (this.saveConfirmView) {
      this.saveConfirmView.destroy();
    }

    this.saveConfirmView = new SaveConfirmView();
    this.saveConfirmView.show(saveAndContinue, cancelcb);
  },

  unsavedTextEditors() {
    return atom.workspace.getTextEditors().filter((textEditor) => {
      return textEditor.isModified() && undefined !== textEditor.getPath();
    });
  },

  stop() {
    this.nextBuild = null;
    clearTimeout(this.finishedTimer);
    if (this.child) {
      this.abort(() => {
        this.buildView.buildAborted();
        this.statusBarView && this.statusBarView.buildAborted();
      });
    } else {
      this.buildView.reset();
    }
  },

  disableBuild() {
    const notification = atom.notifications.addWarning("In order to avoid conflicts, it's recommended to disable (or remove) the original `build` package", {
      dismissable: true,
      buttons: [
        {
          text: 'Disable Package',
          className: 'icon icon-playback-pause',
          onDidClick() {
            atom.packages.disablePackage('build');
            return notification.dismiss();
          }
        },
        {
          text: "Don't Ask Again",
          onDidClick() {
            Config.set('muteConflictWarning', true);
            return notification.dismiss();
          }
        }
      ]
    });
  },

  consumeLinterRegistry(registry) {
    DevConsole.log('Consuming linter');

    this.linter && this.linter.destroy();
    this.linter = new Linter(registry);
  },

  consumeBuilder(builder) {
    DevConsole.log('Consuming builder');

    if (Array.isArray(builder)) this.tools.push(...builder);
    else this.tools.push(builder);
    this.targetManager.setTools(this.tools);
    return new Disposable(() => {
      this.tools = this.tools.filter(Array.isArray(builder) ? (tool) => builder.indexOf(tool) === -1 : (tool) => tool !== builder);
      this.targetManager.setTools(this.tools);
    });
  },

  consumeStatusBar(statusBar) {
    DevConsole.log('Consuming status-bar');

    this.statusBarView = new StatusBarView(statusBar);
    this.statusBarView.onClick(() => this.targetManager.selectActiveTarget());
    this.statusBarView.attach();
    this.targetManager.refreshTargets();
  },

  consumeBusySignal(registry) {
    DevConsole.log('Consuming busy-signal');

    this.busyProvider = registry.create();
    this.targetManager.setBusyProvider(this.busyProvider);
  }
};
