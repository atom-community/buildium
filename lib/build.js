'use strict';

var atom$1 = require('atom');
var child_process = require('child_process');
var atomPackageDeps = require('atom-package-deps');
var fs = require('fs');
var path = require('path');
var atomSpacePenViews = require('atom-space-pen-views');
var Terminal = require('term.js');
var crossSpawn = require('cross-spawn');
var EventEmitter = require('events');
var XRegExp = require('xregexp');
var kill = require('tree-kill');
var cosmiconfig = require('cosmiconfig');
var CSON = require('cson-parser');
var TOML = require('@iarna/toml');
var JSON5 = require('json5');
var os = require('os');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var atomPackageDeps__namespace = /*#__PURE__*/_interopNamespace(atomPackageDeps);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var Terminal__default = /*#__PURE__*/_interopDefaultLegacy(Terminal);
var crossSpawn__default = /*#__PURE__*/_interopDefaultLegacy(crossSpawn);
var EventEmitter__default = /*#__PURE__*/_interopDefaultLegacy(EventEmitter);
var XRegExp__default = /*#__PURE__*/_interopDefaultLegacy(XRegExp);
var kill__default = /*#__PURE__*/_interopDefaultLegacy(kill);
var CSON__default = /*#__PURE__*/_interopDefaultLegacy(CSON);
var TOML__default = /*#__PURE__*/_interopDefaultLegacy(TOML);
var JSON5__default = /*#__PURE__*/_interopDefaultLegacy(JSON5);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);

function uniquifySettings(settings) {
  const genName = (name, index) => `${name} - ${index}`;

  const newSettings = [];
  settings.forEach(setting => {
    let i = 0;
    let testName = setting.name;

    while (newSettings.find(ns => ns.name === testName)) {
      testName = genName(setting.name, ++i);
    }

    newSettings.push({ ...setting,
      name: testName
    });
  });
  return newSettings;
}

function activePath() {
  const textEditor = atom.workspace.getActiveTextEditor();

  if (!textEditor || !textEditor.getPath()) {
    /* default to building the first one if no editor is active */
    if (0 === atom.project.getPaths().length) {
      return false;
    }

    return atom.project.getPaths()[0];
  }
  /* otherwise, build the one in the root of the active editor */


  return atom.project.getPaths().sort((a, b) => b.length - a.length).find(async p => {
    try {
      const realpath = await fs__default['default'].promises.realpath(p);
      return (await fs__default['default'].promises.realpath(textEditor.getPath()).substr(0, realpath.length)) === realpath;
    } catch (err) {
      /* Path no longer available. Possible network volume has gone down */
      return false;
    }
  });
}

function getDefaultSettings(cwd, setting) {
  return Object.assign({}, setting, {
    env: setting.env || {},
    args: setting.args || [],
    cwd: setting.cwd || cwd,
    sh: undefined === setting.sh ? true : setting.sh,
    errorMatch: setting.errorMatch || ''
  });
}

function replace(value = '', targetEnv) {
  if (!(typeof value === 'string')) {
    return value;
  }

  const env = Object.assign({}, process.env, targetEnv);
  value = value.replace(/\$(\w+)/g, function (match, name) {
    return name in env ? env[name] : match;
  });
  const editor = atom.workspace.getActiveTextEditor();
  const projectPaths = atom.project.getPaths().map(async projectPath => {
    try {
      return await fs__default['default'].promises.realpath(projectPath);
    } catch (e) {
      /* Do nothing. */
    }

    return null;
  });
  let projectPath = projectPaths[0];

  if (editor && undefined !== editor.getPath()) {
    const activeFile = fs__default['default'].realpathSync(editor.getPath());
    const activeFilePath = path__default['default'].dirname(activeFile);
    projectPath = projectPaths.find(p => activeFilePath && activeFilePath.startsWith(p));
    value = value.replace(/{FILE_ACTIVE}/g, activeFile);
    value = value.replace(/{FILE_ACTIVE_PATH}/g, activeFilePath);
    value = value.replace(/{FILE_ACTIVE_NAME}/g, path__default['default'].basename(activeFile));
    value = value.replace(/{FILE_ACTIVE_NAME_BASE}/g, path__default['default'].basename(activeFile, path__default['default'].extname(activeFile)));
    value = value.replace(/{SELECTION}/g, editor.getSelectedText());
    const cursorScreenPosition = editor.getCursorScreenPosition();
    value = value.replace(/{FILE_ACTIVE_CURSOR_ROW}/g, cursorScreenPosition.row + 1);
    value = value.replace(/{FILE_ACTIVE_CURSOR_COLUMN}/g, cursorScreenPosition.column + 1);
  }

  value = value.replace(/{PROJECT_PATH}/g, projectPath);

  if (atom.project.getRepositories[0]) {
    value = value.replace(/{REPO_BRANCH_SHORT}/g, atom.project.getRepositories()[0].getShortHead());
  }

  return value;
}

class BuildError extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
    this.message = message;
    Error.captureStackTrace(this, BuildError);
  }

}

var name = "buildium";
var version = "0.74.2";
var description = "Build your current project, directly from Atom";
var keywords = [
	"build",
	"compile",
	"gulp",
	"make",
	"productivity"
];
var repository = "https://github.com/idleberg/atom-buildium";
var license = "MIT";
var main = "./lib/build";
var scripts = {
	build: "npm run clean && rollup --config",
	dev: "npm run start",
	clean: "rimraf ./lib",
	"lint:js": "eslint ./src --ignore-path .gitignore",
	"lint:md": "remark . --quiet --frail --ignore-path .gitignore",
	lint: "npm-run-all --parallel lint:*",
	start: "rollup --watch --config",
	test: "eslint ."
};
var husky = {
	hooks: {
		"pre-commit": "lint-staged --allow-empty"
	}
};
var dependencies = {
	"@atxm/developer-console": "^0.5.0",
	"@iarna/toml": "^2.2.5",
	"atom-package-deps": "^7.2.2",
	"atom-space-pen-views": "^2.0.3",
	cosmiconfig: "^7.0.0",
	"cross-spawn": "^7.0.3",
	"cson-parser": "^4.0.8",
	"js-yaml": "^4.0.0",
	json5: "^2.2.0",
	"term.js": "https://github.com/jeremyramin/term.js/tarball/de1635fc2695e7d8165012d3b1d007d7ce60eea2",
	"tree-kill": "^1.0.0",
	xregexp: "^5.0.1"
};
var devDependencies = {
	"@babel/core": "^7.13.10",
	"@babel/eslint-parser": "^7.13.10",
	"@babel/plugin-proposal-function-bind": "^7.12.13",
	"@babel/plugin-syntax-function-bind": "^7.12.13",
	"@babel/preset-env": "^7.13.10",
	"@rollup/plugin-babel": "^5.3.0",
	"@rollup/plugin-commonjs": "^18.0.0",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^11.2.1",
	"@stylelint/prettier-config": "^2.0.0",
	"@stylelint/remark-preset": "^2.0.0",
	"atom-build-spec-helpers": "^0.4.0",
	eslint: "^7.25.0",
	husky: ">=4 <5",
	jsonlint: "^1.6.3",
	"lint-staged": "^10.5.4",
	"npm-run-all": "^4.1.5",
	prettier: "^2.2.1",
	"remark-cli": "^9.0.0",
	rimraf: "^3.0.2",
	rollup: "^2.41.5",
	"rollup-plugin-terser": "^7.0.2",
	sass: "^1.32.11",
	stylelint: "^13.13.0",
	temp: "^0.9.4"
};
var engines = {
	atom: ">=1.0.0"
};
var activationCommands = {
	"atom-workspace": [
		"build:confirm",
		"build:error-match-first",
		"build:error-match",
		"build:no-confirm",
		"build:refresh-targets",
		"build:select-active-target",
		"build:stop",
		"build:toggle-panel",
		"build:trigger"
	]
};
var activationHooks = [
	"core:loaded-shell-environment"
];
var consumedServices = {
	builder: {
		versions: {
			"^2.0.0": "consumeBuilder"
		}
	},
	"status-bar": {
		versions: {
			"^1.0.0": "consumeStatusBar"
		}
	},
	"busy-signal": {
		versions: {
			"^1.0.0": "consumeBusySignal"
		}
	},
	"linter-indie": {
		versions: {
			"1.0.0": "consumeLinterRegistry"
		}
	}
};
var pkg = {
	name: name,
	version: version,
	description: description,
	keywords: keywords,
	repository: repository,
	license: license,
	main: main,
	scripts: scripts,
	husky: husky,
	"lint-staged": {
	"*.js": "eslint --cache --fix",
	"*.{js,json,md}": "prettier --write"
},
	dependencies: dependencies,
	devDependencies: devDependencies,
	engines: engines,
	activationCommands: activationCommands,
	activationHooks: activationHooks,
	consumedServices: consumedServices,
	"package-deps": [
	{
		name: "busy-signal"
	}
]
};

var Config = {
  schema: {
    panelVisibility: {
      title: 'Panel Visibility',
      description: 'Set when the build panel should be visible.',
      type: 'string',
      default: 'Toggle',
      enum: ['Toggle', 'Keep Visible', 'Show on Error', 'Hidden'],
      order: 1
    },
    autoToggleInterval: {
      title: 'Auto-toggle Interval',
      description: 'Set the interval until the panel closes automatically, in milliseconds. This setting works with *Panel Visibility* set to *Toggle*',
      type: 'integer',
      minimum: 1000,
      default: 3000,
      order: 2
    },
    buildOnSave: {
      title: 'Automatically build on save',
      description: 'Automatically build your project each time an editor is saved.',
      type: 'boolean',
      default: false,
      order: 3
    },
    saveOnBuild: {
      title: 'Automatically save on build',
      description: 'Automatically save all edited files when triggering a build.',
      type: 'boolean',
      default: false,
      order: 4
    },
    matchedErrorFailsBuild: {
      title: 'Any matched error will fail the build',
      description: 'Even if the build has a return code of zero it is marked as "failed" if any error is being matched in the output.',
      type: 'boolean',
      default: true,
      order: 5
    },
    scrollOnError: {
      title: 'Automatically scroll on build error',
      description: 'Automatically scroll to first matched error when a build failed.',
      type: 'boolean',
      default: false,
      order: 6
    },
    stealFocus: {
      title: 'Steal Focus',
      description: 'Steal focus when opening build panel.',
      type: 'boolean',
      default: true,
      order: 7
    },
    selectTriggers: {
      title: 'Selecting new target triggers the build',
      description: 'When selecting a new target (through status-bar, cmd-alt-t, etc), the newly selected target will be triggered.',
      type: 'boolean',
      default: true,
      order: 9
    },
    refreshOnShowTargetList: {
      title: 'Refresh targets when the target list is shown',
      description: 'When opening the targets menu, the targets will be refreshed.',
      type: 'boolean',
      default: false,
      order: 10
    },
    notificationOnRefresh: {
      title: 'Show notification when targets are refreshed',
      description: 'When targets are refreshed a notification with information about the number of targets will be displayed.',
      type: 'boolean',
      default: false,
      order: 11
    },
    beepWhenDone: {
      title: 'Beep when the build completes',
      description: 'Make a "beep" notification sound when the build is complete - in success or failure.',
      type: 'boolean',
      default: false,
      order: 12
    },
    panelOrientation: {
      title: 'Panel Orientation',
      description: 'Where to attach the build panel',
      type: 'string',
      default: 'Bottom',
      enum: ['Bottom', 'Top', 'Left', 'Right'],
      order: 13
    },
    statusBar: {
      title: 'Status Bar',
      description: 'Where to place the status bar. Set to `Disable` to disable status bar display.',
      type: 'string',
      default: 'Left',
      enum: ['Left', 'Right', 'Disable'],
      order: 14
    },
    statusBarPriority: {
      title: 'Priority on Status Bar',
      description: 'Lower priority tiles are placed further to the left/right, depends on where you choose to place Status Bar.',
      type: 'integer',
      default: -1000,
      order: 15
    },
    terminalScrollback: {
      title: 'Terminal Scrollback Size',
      description: 'Max number of lines of build log kept in the terminal',
      type: 'integer',
      default: 1000,
      order: 16
    },
    muteConflictWarning: {
      title: 'Mute Conflict Warning',
      description: 'Disables the startup dialog, whether the user wants to disable the original `build` package',
      type: 'boolean',
      default: false,
      order: 17
    }
  },

  get(key = '') {
    return key?.length ? atom.config.get(`${name}.${key}`) : atom.config.get(`${name}`);
  },

  set(key, value) {
    atom.config.set(`${name}.${key}`, value);
  },

  migrate(oldKey, newKey) {
    if (!atom.config.get(`${name}.${oldKey}`) || atom.config.get(`${name}.${newKey}`)) {
      return;
    }

    try {
      atom.config.set(`${name}.${newKey}`, atom.config.get(`${name}.${oldKey}`));
    } catch (error) {
      atom.notifications.addWarning(`Failed to migrate configuration, see console for details`);
      return;
    }

    atom.config.unset(`${name}.${oldKey}`);
  },

  observe(...args) {
    let key, options, callback;

    switch (args.length) {
      case 2:
        [key, callback] = args;
        options = {};
        break;

      case 3:
        [keyPath, options, callback] = args;
        break;

      default:
        console.error('An unsupported form of Config::observe is being used. See https://atom.io/docs/api/latest/Config for details');
        return;
    }

    atom.config.observe(`${name}.${key}`, options, callback);
  },

  unset(key = '') {
    const unsetKey = key?.length ? `${name}.${key}` : name;
    atom.config.unset(unsetKey);
  },

  open(options = {}) {
    options = {
      pending: true,
      searchAllPanes: true,
      ...options
    };
    atom.workspace.open(`atom://config/packages/${name}`, options);
  }

};

class BuildView extends atomSpacePenViews.View {
  static initialTimerText() {
    return '0.0 s';
  }

  static initialHeadingText() {
    return `${pkg.name.charAt(0).toUpperCase()}${pkg.name.slice(1)} v${pkg.version}`;
  }

  static content() {
    this.div({
      tabIndex: -1,
      class: 'build tool-panel native-key-bindings'
    }, () => {
      this.div({
        class: 'heading',
        outlet: 'panelHeading'
      }, () => {
        this.div({
          class: 'control-container'
        }, () => {
          this.button({
            class: 'btn btn-default icon icon-zap',
            click: 'build',
            title: 'Builds current project'
          }, 'Build');
          this.button({
            class: 'btn btn-default icon icon-trashcan',
            click: 'clearOutput',
            title: 'Clears the output'
          }, 'Clear');
          this.button({
            class: 'btn btn-default icon icon-x',
            click: 'close',
            title: 'Closes the build panel'
          }, 'Close');
          this.div({
            class: 'title',
            outlet: 'title'
          }, () => {
            this.span({
              class: 'build-timer',
              outlet: 'buildTimer'
            }, this.initialTimerText());
          });
        });
        this.div({
          class: 'icon heading-text text-highlight',
          outlet: 'heading'
        }, this.initialHeadingText());
      });
      this.div({
        class: 'output panel-body',
        outlet: 'output'
      });
      this.div({
        class: 'resizer',
        outlet: 'resizer'
      });
    });
  }

  constructor(...args) {
    var _context;

    super(...args);
    this.starttime = new Date();
    this.terminal = new Terminal__default['default']({
      cursorBlink: false,
      convertEol: true,
      useFocus: false,
      termName: 'xterm-256color',
      scrollback: Config.get('terminalScrollback')
    }); // On some systems, prependListern and prependOnceListener is expected to exist. Add them until terminal replacement is here.

    this.terminal.prependListener = (...a) => {
      this.terminal.addListener(...a);
    };

    this.terminal.prependOnceListener = (...a) => {
      this.terminal.addOnceListener(...a);
    };

    this.terminal.getContent = function () {
      return this.lines.reduce((m1, line) => {
        return m1 + line.reduce((m2, col) => m2 + col[1], '') + '\n';
      }, '');
    };

    this.fontGeometry = {
      w: 15,
      h: 15
    };
    this.terminal.open(this.output[0]);
    this.destroyTerminal = (_context = this.terminal).destroy.bind(_context);

    this.terminal.destroy = this.terminal.destroySoon = () => {}; // This terminal will be open forever and reset when necessary


    this.terminalEl = atomSpacePenViews.$(this.terminal.element);
    this.terminalEl[0].terminal = this.terminal; // For testing purposes

    this.resizeStarted = this.resizeStarted.bind(this);
    this.resizeMoved = this.resizeMoved.bind(this);
    this.resizeEnded = this.resizeEnded.bind(this);
    Config.observe('panelVisibility', this.visibleFromConfig.bind(this));
    Config.observe('panelOrientation', this.orientationFromConfig.bind(this));
    atom.config.observe('editor.fontSize', this.fontSizeFromConfig.bind(this));
    atom.config.observe('editor.fontFamily', this.fontFamilyFromConfig.bind(this));
    atom.commands.add('atom-workspace', 'buildium:toggle-panel', this.toggle.bind(this));
  }

  destroy() {
    this.destroyTerminal();
    clearInterval(this.detectResizeInterval);
  }

  resizeStarted() {
    document.body.style['-webkit-user-select'] = 'none';
    document.addEventListener('mousemove', this.resizeMoved);
    document.addEventListener('mouseup', this.resizeEnded);
  }

  resizeMoved(ev) {
    const {
      h
    } = this.fontGeometry;

    switch (Config.get('panelOrientation')) {
      case 'Bottom':
        {
          const delta = this.resizer.get(0).getBoundingClientRect().top - ev.y;
          if (Math.abs(delta) < h * 5 / 6) return;
          const nearestRowHeight = Math.round((this.terminalEl.height() + delta) / h) * h;
          const maxHeight = atomSpacePenViews.$('.item-views').height() + atomSpacePenViews.$('.build .output').height();
          this.terminalEl.css('height', `${Math.min(maxHeight, nearestRowHeight)}px`);
          break;
        }

      case 'Top':
        {
          const delta = this.resizer.get(0).getBoundingClientRect().top - ev.y;
          if (Math.abs(delta) < h * 5 / 6) return;
          const nearestRowHeight = Math.round((this.terminalEl.height() - delta) / h) * h;
          const maxHeight = atomSpacePenViews.$('.item-views').height() + atomSpacePenViews.$('.build .output').height();
          this.terminalEl.css('height', `${Math.min(maxHeight, nearestRowHeight)}px`);
          break;
        }

      case 'Left':
        {
          const delta = this.resizer.get(0).getBoundingClientRect().right - ev.x;
          this.css('width', `${this.width() - delta - this.resizer.outerWidth()}px`);
          break;
        }

      case 'Right':
        {
          const delta = this.resizer.get(0).getBoundingClientRect().left - ev.x;
          this.css('width', `${this.width() + delta}px`);
          break;
        }
    }

    this.resizeTerminal();
  }

  resizeEnded() {
    document.body.style['-webkit-user-select'] = 'text';
    document.removeEventListener('mousemove', this.resizeMoved);
    document.removeEventListener('mouseup', this.resizeEnded);
  }

  resizeToNearestRow() {
    if (-1 !== ['Top', 'Bottom'].indexOf(Config.get('panelOrientation'))) {
      this.fixTerminalElHeight();
    }

    this.resizeTerminal();
  }

  getFontGeometry() {
    const o = atomSpacePenViews.$('<div>A</div>').addClass('terminal').addClass('terminal-test').appendTo(this.output);
    const w = o[0].getBoundingClientRect().width;
    const h = o[0].getBoundingClientRect().height;
    o.remove();
    return {
      w,
      h
    };
  }

  resizeTerminal() {
    this.fontGeometry = this.getFontGeometry();
    const {
      w,
      h
    } = this.fontGeometry;

    if (0 === w || 0 === h) {
      return;
    }

    const terminalWidth = Math.floor(this.terminalEl.width() / w);
    const terminalHeight = Math.floor(this.terminalEl.height() / h);
    this.terminal.resize(terminalWidth, terminalHeight);
  }

  getContent() {
    return this.terminal.getContent();
  }

  attach(force = false) {
    if (!force) {
      switch (Config.get('panelVisibility')) {
        case 'Hidden':
        case 'Show on Error':
          return;
      }
    }

    if (this.panel) {
      this.panel.destroy();
    }

    const addfn = {
      Top: atom.workspace.addTopPanel,
      Bottom: atom.workspace.addBottomPanel,
      Left: atom.workspace.addLeftPanel,
      Right: atom.workspace.addRightPanel
    };
    const orientation = Config.get('panelOrientation') || 'Bottom';
    this.panel = addfn[orientation].call(atom.workspace, {
      item: this
    });
    this.fixTerminalElHeight();
    this.resizeToNearestRow();
  }

  fixTerminalElHeight() {
    const nearestRowHeight = atomSpacePenViews.$('.build .output').height();
    this.terminalEl.css('height', `${nearestRowHeight}px`);
  }

  detach(force) {
    force = force || false;

    if (atom.views.getView(atom.workspace) && document.activeElement === this[0]) {
      atom.views.getView(atom.workspace).focus();
    }

    if (this.panel && (force || 'Keep Visible' !== Config.get('panelVisibility'))) {
      this.panel.destroy();
      this.panel = null;
    }
  }

  isAttached() {
    return !!this.panel;
  }

  visibleFromConfig(val) {
    switch (val) {
      case 'Toggle':
      case 'Show on Error':
        if (!this.terminalEl.hasClass('error')) {
          this.detach();
        }

        return;
    }

    this.attach();
  }

  orientationFromConfig(orientation) {
    const isVisible = this.isVisible();
    this.detach(true);

    if (isVisible) {
      this.attach();
    }

    this.resizer.get(0).removeEventListener('mousedown', this.resizeStarted);

    switch (orientation) {
      case 'Top':
      case 'Bottom':
        this.get(0).style.width = null;
        this.resizer.get(0).addEventListener('mousedown', this.resizeStarted);
        break;

      case 'Left':
      case 'Right':
        this.terminalEl.get(0).style.height = null;
        this.resizer.get(0).addEventListener('mousedown', this.resizeStarted);
        break;
    }

    this.resizeTerminal();
  }

  fontSizeFromConfig(size) {
    this.css({
      'font-size': size
    });
    this.resizeToNearestRow();
  }

  fontFamilyFromConfig(family) {
    this.css({
      'font-family': family
    });
    this.resizeToNearestRow();
  }

  reset() {
    clearTimeout(this.titleTimer);
    this.buildTimer.text(BuildView.initialTimerText());
    this.titleTimer = 0;
    this.terminal.reset();
    this.panelHeading.removeClass('success error');
    this.title.removeClass('success error');
    this.detach();
  }

  updateTitle() {
    this.buildTimer.text(((new Date() - this.starttime) / 1000).toFixed(1) + ' s');
    this.titleTimer = setTimeout(this.updateTitle.bind(this), 100);
  }

  close() {
    this.detach(true);
  }

  toggle() {
    this.isAttached() ? this.detach(true) : this.attach(true);
  }

  clearOutput() {
    this.terminal.reset();
  }

  build() {
    atom.commands.dispatch(atom.views.getView(atom.workspace), 'buildium:trigger');
  }

  setHeading(heading) {
    this.heading.text(heading);
  }

  buildStarted() {
    this.starttime = new Date();
    this.reset();
    this.attach();

    if (Config.get('stealFocus')) {
      this.focus();
    }

    this.updateTitle();
  }

  buildFinished(success) {
    if (!success && !this.isAttached()) {
      this.attach(Config.get('panelVisibility') === 'Show on Error');
    }

    this.finalizeBuild(success);
  }

  buildAbortInitiated() {
    this.heading.addClass('icon-stop');
  }

  buildAborted() {
    this.finalizeBuild(false);
  }

  finalizeBuild(success) {
    this.title.addClass(success ? 'success' : 'error');
    this.panelHeading.addClass(success ? 'success' : 'error');
    this.heading.removeClass('icon-stop');
    clearTimeout(this.titleTimer);
  }

  scrollTo(text) {
    const content = this.getContent();
    let endPos = -1;
    let curPos = text.length; // We need to decrease the size of `text` until we find a match. This is because
    // terminal will insert line breaks ('\r\n') when width of terminal is reached.
    // It may have been that the middle of a matched error is on a line break.

    while (-1 === endPos && curPos > 0) {
      endPos = content.indexOf(text.substring(0, curPos--));
    }

    if (curPos === 0) {
      // No match - which is weird. Oh well - rather be defensive
      return;
    }

    const row = content.slice(0, endPos).split('\n').length;
    this.terminal.ydisp = 0;
    this.terminal.scrollDisp(row - 1);
  }

}

const styleSheet = `
  background-color: darkslateblue;
  border-radius: 2px;
  color: white;
  line-height: 1.5;
  padding: 1px 4px;
  text-shadow: 0 1px 0px rgba(0, 0, 0, 0.2);
`;

function __console__(type, ...args) {
  if (!atom?.inDevMode()) return;
  args.unshift(`%c${name}%c`, styleSheet, '');
  window.console[type](...args);
}

var DevConsole = {
  debug(...data) {
    __console__('debug', ...data);
  },

  error(...data) {
    __console__('error', ...data);
  },

  info(...data) {
    __console__('info', ...data);
  },

  log(...data) {
    __console__('log', ...data);
  },

  trace(...data) {
    __console__('trace', ...data);
  },

  warn(...data) {
    __console__('warn', ...data);
  }

};

class ErrorMatcher extends EventEmitter.EventEmitter {
  constructor() {
    super();
    this.regex = null;
    this.cwd = null;
    this.stdout = null;
    this.stderr = null;
    this.currentMatch = [];
    this.firstMatchId = null;
    atom.commands.add('atom-workspace', 'buildium:error-match', this.match.bind(this));
    atom.commands.add('atom-workspace', 'buildium:error-match-first', this.matchFirst.bind(this));
  }

  _gotoNext() {
    if (0 === this.currentMatch.length) {
      return;
    }

    this.goto(this.currentMatch[0].id);
  }

  goto(id) {
    const match = this.currentMatch.find(m => m.id === id);

    if (!match) {
      this.emit('error', "Can't find match with id " + id);
      return;
    } // rotate to next match


    while (this.currentMatch[0] !== match) {
      this.currentMatch.push(this.currentMatch.shift());
    }

    this.currentMatch.push(this.currentMatch.shift());
    let file = match.file;

    if (!file) {
      this.emit('error', "Did not match any file. Don't know what to open.");
      return;
    }

    if (!path__default['default'].isAbsolute(file)) {
      file = this.cwd + path__default['default'].sep + file;
    }

    const row = match.line ? match.line - 1 : 0;
    /* Because atom is zero-based */

    const col = match.col ? match.col - 1 : 0;
    /* Because atom is zero-based */

    fs__default['default'].exists(file, exists => {
      if (!exists) {
        this.emit('error', 'Matched file does not exist: ' + file);
        return;
      }

      atom.workspace.open(file, {
        initialLine: row,
        initialColumn: col,
        searchAllPanes: true
      });
      this.emit('matched', match);
    });
  }

  _parse() {
    this.currentMatch = []; // first run all functional matches

    this.functions && this.functions.forEach((f, functionIndex) => {
      this.currentMatch = this.currentMatch.concat(f(this.output).map((match, matchIndex) => {
        match.id = 'error-match-function-' + functionIndex + '-' + matchIndex;
        match.type = match.type || 'Error';
        return match;
      }));
    }); // then for all match kinds

    Object.keys(this.regex).forEach(kind => {
      // run all matches
      this.regex[kind] && this.regex[kind].forEach((regex, i) => {
        regex && XRegExp__default['default'].forEach(this.output, regex, (match, matchIndex) => {
          match.id = 'error-match-' + i + '-' + matchIndex;
          match.type = kind;
          this.currentMatch.push(match);
        });
      });
    });
    this.currentMatch.sort((a, b) => a.index - b.index);
    this.firstMatchId = this.currentMatch.length > 0 ? this.currentMatch[0].id : null;
  }

  _prepareRegex(regex) {
    regex = regex || [];
    regex = regex instanceof Array ? regex : [regex];
    return regex.map(r => {
      try {
        return XRegExp__default['default'](r);
      } catch (err) {
        this.emit('error', 'Error parsing regex. ' + err.message);
        return null;
      }
    });
  }

  set(target, cwd, output) {
    if (target.functionMatch) {
      this.functions = (target.functionMatch instanceof Array ? target.functionMatch : [target.functionMatch]).filter(f => {
        if (typeof f !== 'function') {
          this.emit('error', 'found functionMatch that is no function: ' + typeof f);
          return false;
        }

        return true;
      });
    }

    this.regex = {
      Error: this._prepareRegex(target.errorMatch),
      Warning: this._prepareRegex(target.warningMatch)
    };
    this.cwd = cwd;
    this.output = output;
    this.currentMatch = [];

    this._parse();
  }

  match() {
    this._gotoNext();
  }

  matchFirst() {
    if (this.firstMatchId) {
      this.goto(this.firstMatchId);
    }
  }

  hasMatch() {
    return 0 !== this.currentMatch.length;
  }

  getMatches() {
    return this.currentMatch;
  }

}

class Linter {
  constructor(registry) {
    this.linter = registry.register({
      name: 'Build'
    });
  }

  destroy() {
    this.linter.dispose();
  }

  clear() {
    this.linter.deleteMessages();
  }

  processMessages(messages, cwd) {
    function extractRange(json) {
      return [[(json.line || 1) - 1, (json.col || 1) - 1], [(json.line_end || json.line || 1) - 1, (json.col_end || json.col || 1) - 1]];
    }

    function normalizePath(p) {
      return path__default['default'].isAbsolute(p) ? p : path__default['default'].join(cwd, p);
    }

    function typeToSeverity(type) {
      switch (type && type.toLowerCase()) {
        case 'err':
        case 'error':
          return 'error';

        case 'warn':
        case 'warning':
          return 'warning';

        default:
          return null;
      }
    }

    this.linter.setMessages(messages.map(match => ({
      type: match.type || 'Error',
      text: !match.message && !match.html_message ? 'Error from build' : match.message,
      html: match.message ? undefined : match.html_message,
      filePath: normalizePath(match.file),
      severity: typeToSeverity(match.type),
      range: extractRange(match),
      trace: match.trace && match.trace.map(trace => ({
        type: trace.type || 'Trace',
        text: !trace.message && !trace.html_message ? 'Trace in build' : trace.message,
        html: trace.message ? undefined : trace.html_message,
        filePath: trace.file && normalizePath(trace.file),
        severity: typeToSeverity(trace.type) || 'info',
        range: extractRange(trace)
      }))
    })));
  }

}

class SaveConfirmView extends atomSpacePenViews.View {
  static content() {
    this.div({
      class: 'build-confirm overlay from-top'
    }, () => {
      this.h3('You have unsaved changes');
      this.div({
        class: 'btn-container pull-right'
      }, () => {
        this.button({
          class: 'btn btn-success',
          outlet: 'saveBuildButton',
          title: 'Save and Build',
          click: 'saveAndConfirm'
        }, 'Save and build');
        this.button({
          class: 'btn btn-info',
          title: 'Build Without Saving',
          click: 'confirmWithoutSave'
        }, 'Build Without Saving');
      });
      this.div({
        class: 'btn-container pull-left'
      }, () => {
        this.button({
          class: 'btn btn-info',
          title: 'Cancel',
          click: 'cancel'
        }, 'Cancel');
      });
    });
  }

  destroy() {
    this.confirmcb = undefined;
    this.cancelcb = undefined;

    if (this.panel) {
      this.panel.destroy();
      this.panel = null;
    }
  }

  show(confirmcb, cancelcb) {
    this.confirmcb = confirmcb;
    this.cancelcb = cancelcb;
    this.panel = atom.workspace.addTopPanel({
      item: this
    });
    this.saveBuildButton.focus();
  }

  cancel() {
    this.destroy();

    if (this.cancelcb) {
      this.cancelcb();
    }
  }

  saveAndConfirm() {
    if (this.confirmcb) {
      this.confirmcb(true);
    }

    this.destroy();
  }

  confirmWithoutSave() {
    if (this.confirmcb) {
      this.confirmcb(false);
    }

    this.destroy();
  }

}

class StatusBarView extends atomSpacePenViews.View {
  constructor(statusBar, ...args) {
    super(...args);
    this.statusBar = statusBar;
    Config.observe('statusBar', () => this.attach());
    Config.observe('statusBarPriority', () => this.attach());
  }

  attach() {
    this.destroy();
    const orientation = Config.get('statusBar');

    if ('Disable' === orientation) {
      return;
    }

    this.statusBarTile = this.statusBar[`add${orientation}Tile`]({
      item: this,
      priority: Config.get('statusBarPriority')
    });
    this.tooltip = atom.tooltips.add(this, {
      title: () => this.tooltipMessage()
    });
  }

  destroy() {
    if (this.statusBarTile) {
      this.statusBarTile.destroy();
      this.statusBarTile = null;
    }

    if (this.tooltip) {
      this.tooltip.dispose();
      this.tooltip = null;
    }
  }

  static content() {
    this.div({
      id: 'build-status-bar',
      class: 'inline-block'
    }, () => {
      this.a({
        click: 'clicked',
        outlet: 'message'
      });
    });
  }

  tooltipMessage() {
    return `Current build target is '${this.element.textContent}'`;
  }

  setClasses(classes) {
    this.removeClass('status-unknown status-success status-error');
    this.addClass(classes);
  }

  setTarget(t) {
    if (this.target === t) {
      return;
    }

    this.target = t;
    this.message.text(t || '');
    this.setClasses();
  }

  buildAborted() {
    this.setBuildSuccess(false);
  }

  setBuildSuccess(success) {
    this.setClasses(success ? 'status-success' : 'status-error');
  }

  buildStarted() {
    this.setClasses();
  }

  onClick(cb) {
    this.onClick = cb;
  }

  clicked() {
    this.onClick && this.onClick();
  }

}

class TargetsView extends atomSpacePenViews.SelectListView {
  constructor() {
    super(...arguments);
    this.show();
  }

  initialize() {
    super.initialize(...arguments);
    this.addClass('build-target');
    this.list.addClass('mark-active');
  }

  show() {
    this.panel = atom.workspace.addModalPanel({
      item: this
    });
    this.panel.show();
    this.focusFilterEditor();
  }

  hide() {
    this.panel.hide();
  }

  setItems() {
    super.setItems(...arguments);
    const activeItemView = this.find('.active');

    if (0 < activeItemView.length) {
      this.selectItemView(activeItemView);
      this.scrollToItemView(activeItemView);
    }
  }

  setActiveTarget(target) {
    this.activeTarget = target;
  }

  viewForItem(targetName) {
    const activeTarget = this.activeTarget;
    return TargetsView.render(function () {
      const activeClass = targetName === activeTarget ? 'active' : '';
      this.li({
        class: activeClass + ' build-target'
      }, targetName);
    });
  }

  getEmptyMessage(itemCount) {
    return 0 === itemCount ? 'No targets found.' : 'No matches';
  }

  awaitSelection() {
    return new Promise((resolve, reject) => {
      this.resolveFunction = resolve;
    });
  }

  confirmed(target) {
    if (this.resolveFunction) {
      this.resolveFunction(target);
      this.resolveFunction = null;
    }

    this.hide();
  }

  cancelled() {
    this.hide();
  }

}

class TargetManager extends EventEmitter__default['default'] {
  constructor() {
    super();
    let projectPaths = atom.project.getPaths();
    this.pathTargets = projectPaths.map(path => this._defaultPathTarget(path));
    atom.project.onDidChangePaths(newProjectPaths => {
      const addedPaths = newProjectPaths.filter(el => projectPaths.indexOf(el) === -1);
      const removedPaths = projectPaths.filter(el => newProjectPaths.indexOf(el) === -1);
      addedPaths.forEach(path => this.pathTargets.push(this._defaultPathTarget(path)));
      this.pathTargets = this.pathTargets.filter(pt => -1 === removedPaths.indexOf(pt.path));
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
      subscriptions: new atom$1.CompositeDisposable()
    };
  }

  destroy() {
    this.pathTargets.forEach(pathTarget => pathTarget.tools.map(tool => {
      tool.removeAllListeners && tool.removeAllListeners('refresh');
      tool.destructor && tool.destructor();
    }));
  }

  setTools(tools) {
    this.tools = tools || [];
  }

  refreshTargets(refreshPaths) {
    DevConsole.log('Refreshing targets');
    refreshPaths = refreshPaths || atom.project.getPaths();
    this.busyProvider && this.busyProvider.add(`Refreshing targets for ${refreshPaths.join(',')}`);
    const pathPromises = refreshPaths.map(path => {
      const pathTarget = this.pathTargets.find(pt => pt.path === path);
      pathTarget.loading = true;
      pathTarget.instancedTools = pathTarget.instancedTools.map(t => t.removeAllListeners && t.removeAllListeners('refresh')).filter(() => false); // Just empty the array

      const settingsPromise = this.tools.map(Tool => new Tool(path)).filter(tool => tool.isEligible()).map(tool => {
        pathTarget.instancedTools.push(tool);
        tool.on && tool.on('refresh', this.refreshTargets.bind(this, [path]));
        return Promise.resolve().then(async () => await tool.settings()).catch(err => {
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
      return Promise.all(settingsPromise).then(settings => {
        settings = uniquifySettings([].concat.apply([], settings).filter(Boolean).map(setting => getDefaultSettings(path, setting)));

        if (null === pathTarget.activeTarget || !settings.find(s => s.name === pathTarget.activeTarget)) {
          /* Active target has been removed or not set. Set it to the highest prio target */
          pathTarget.activeTarget = settings[0] ? settings[0].name : undefined;
        } // CompositeDisposable cannot be reused, so we must create a new instance on every refresh


        pathTarget.subscriptions.dispose();
        pathTarget.subscriptions = new atom$1.CompositeDisposable();
        settings.forEach((setting, index) => {
          if (setting.keymap && !setting.atomCommandName) {
            setting.atomCommandName = `build:trigger:${setting.name}`;
          }

          if (setting.atomCommandName) {
            pathTarget.subscriptions.add(atom.commands.add('atom-workspace', setting.atomCommandName, atomCommandName => this.emit('trigger', atomCommandName)));
          }

          if (setting.keymap) {
            const keymapSpec = {
              'atom-workspace, atom-text-editor': {}
            };
            keymapSpec['atom-workspace, atom-text-editor'][setting.keymap] = setting.atomCommandName;
            pathTarget.subscriptions.add(atom.keymaps.add(setting.name, keymapSpec));
          }
        });
        pathTarget.targets = settings;
        pathTarget.loading = false;
        return pathTarget;
      }).catch(err => {
        atom.notifications.addError('Ooops. Something went wrong.', {
          detail: err.message,
          stack: err.stack,
          dismissable: true
        });
      });
    });
    return Promise.all(pathPromises).then(pathTargets => {
      this.fillTargets(activePath(), false);
      this.emit('refresh-complete');
      this.busyProvider && this.busyProvider.remove(`Refreshing targets for ${refreshPaths.join(',')}`);

      if (pathTargets.length === 0) {
        return;
      }

      if (Config.get('notificationOnRefresh')) {
        const rows = refreshPaths.map(path => {
          const pathTarget = this.pathTargets.find(pt => pt.path === path);

          if (!pathTarget) {
            return `Targets ${path} no longer exists. Is build deactivated?`;
          }

          return `${pathTarget.targets.length} targets at: ${path}`;
        });
        atom.notifications.addInfo('Build targets parsed.', {
          detail: rows.join('\n')
        });
      }
    }).catch(err => {
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
    this.getTargets(path, refreshOnEmpty).then(targets => targets.map(t => t.name)).then(targetNames => this.targetsView && this.targetsView.setItems(targetNames));
  }

  selectActiveTarget() {
    if (Config.get('refreshOnShowTargetList')) {
      this.refreshTargets();
    }

    const path = activePath();

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

    this.targetsView.awaitSelection().then(newTarget => {
      this.setActiveTarget(path, newTarget);
      this.targetsView = null;
    }).catch(err => {
      this.targetsView.setError(err.message);
      this.targetsView = null;
    });
  }

  getTargets(path, refreshOnEmpty = true) {
    const pathTarget = this.pathTargets.find(pt => pt.path === path);

    if (!pathTarget) {
      return Promise.resolve([]);
    }

    if (refreshOnEmpty && pathTarget.targets.length === 0) {
      return this.refreshTargets([pathTarget.path]).then(() => pathTarget.targets);
    }

    return Promise.resolve(pathTarget.targets);
  }

  getActiveTarget(path) {
    const pathTarget = this.pathTargets.find(pt => pt.path === path);

    if (!pathTarget) {
      return null;
    }

    return pathTarget.targets.find(target => target.name === pathTarget.activeTarget);
  }

  setActiveTarget(path, targetName) {
    this.pathTargets.find(pt => pt.path === path).activeTarget = targetName;
    this.emit('new-active-target', path, this.getActiveTarget(path));
  }

  isLoading(path) {
    return this.pathTargets.find(pt => pt.path === path).loading;
  }

}

var loaders = {
  cson(filePath, content) {
    try {
      return CSON__default['default'].parse(content);
    } catch (error) {
      error.message = `TOML Error in ${filePath}:\n${error.message}`;
      throw error;
    }
  },

  json5(filePath, content) {
    try {
      return JSON5__default['default'].parse(content);
    } catch (error) {
      error.message = `TOML Error in ${filePath}:\n${error.message}`;
      throw error;
    }
  },

  toml(filePath, content) {
    try {
      return TOML__default['default'].parse(content);
    } catch (error) {
      error.message = `TOML Error in ${filePath}:\n${error.message}`;
      throw error;
    }
  }

};

const explorer = cosmiconfig.cosmiconfig(pkg.name, {
  searchPlaces: ['.atom-build.cjs', '.atom-build.js', '.atom-build.json', '.atom-build.json5', '.atom-build.toml', '.atom-build.yaml', '.atom-build.yml'],
  loaders: {
    '.cson': loaders.cson,
    '.toml': loaders.toml,
    '.json': loaders.json5,
    '.json5': loaders.json5,
    'noExt': cosmiconfig.defaultLoaders['.json']
  }
});

async function getConfig(file) {
  const realFile = await fs__default['default'].promises.realpath(file);
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

class CustomFile extends EventEmitter__default['default'] {
  constructor(cwd) {
    super();
    this.cwd = cwd;
    this.fileWatchers = [];
  }

  destructor() {
    this.fileWatchers.map(fw => fw.close());
  }

  getNiceName() {
    return 'Custom file';
  }

  isEligible() {
    this.files = [].concat.apply([], ['cjs', 'js', 'json', 'json5', 'cson',, 'toml', 'yaml', 'yml'].map(ext => [path__default['default'].join(this.cwd, `.atom-build.${ext}`), path__default['default'].join(os__default['default'].homedir(), `.atom-build.${ext}`)])).filter(fs__default['default'].existsSync);
    return 0 < this.files.length;
  }

  async settings() {
    this.fileWatchers.map(fw => fw.close()); // On Linux, closing a watcher triggers a new callback, which causes an infinite loop
    // fallback to `watchFile` here which polls instead.

    this.fileWatchers = this.files.map(file => (os__default['default'].platform() === 'linux' ? fs__default['default'].watchFile : fs__default['default'].watch)(file, () => this.emit('refresh')));
    const config = [];
    const buildConfigs = await Promise.all(this.files.map(async file => await getConfig(file)));
    buildConfigs.map(build => {
      config.push(createBuildConfig(build, build.name || 'default'), ...Object.keys(build.targets || {}).map(name => createBuildConfig(build.targets[name], name)));
    });
    return config;
  }

}

var build = {
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

    atomPackageDeps__namespace.install(pkg.name);
    this.tools = [CustomFile];
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
    atom.workspace.observeTextEditors(editor => {
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
      atom.packages.onDidActivatePackage(e => {
        if (e.name.startsWith('build-') && e.mainModule.provideBuilder) {
          console.log('Activating', e.name);
          this.targetManager.refreshTargets();
        }
      });
      atom.packages.onDidDeactivatePackage(e => {
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
    this.targetManager.on('trigger', atomCommandName => this.build('trigger', atomCommandName));
  },

  setupBuildView() {
    this.buildView = new BuildView();
  },

  setupErrorMatcher() {
    this.errorMatcher = new ErrorMatcher();
    this.errorMatcher.on('error', message => {
      atom.notifications.addError('Error matching failed!', {
        detail: message
      });
    });
    this.errorMatcher.on('matched', match => {
      match[0] && this.buildView.scrollTo(match[0]);
    });
  },

  deactivate() {
    DevConsole.log('Deactivating package');

    if (this.child) {
      this.child.removeAllListeners();
      kill__default['default'](this.child.pid, 'SIGKILL');
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
    const path = activePath();
    const activeTarget = this.targetManager.getActiveTarget(path);
    this.statusBarView && activeTarget && this.statusBarView.setTarget(activeTarget.name);
  },

  startNewBuild(source, atomCommandName) {
    const path = activePath();
    let buildTitle = '';
    this.linter && this.linter.clear();
    Promise.resolve(this.targetManager.getTargets(path)).then(targets => {
      if (!targets || 0 === targets.length) {
        throw new BuildError('No eligible build target.', 'No configuration to build this project exists.');
      }

      let target = targets.find(t => t.atomCommandName === atomCommandName);

      if (!target) {
        target = this.targetManager.getActiveTarget(path);
      }

      if (!target.exec) {
        throw new BuildError('Invalid build file.', 'No executable command specified.');
      }

      this.statusBarView && this.statusBarView.buildStarted();
      this.busyProvider && this.busyProvider.add(`Build: ${target.name}`);
      this.buildView.buildStarted();
      this.buildView.setHeading('Running preBuild...');
      return Promise.resolve(target.preBuild ? target.preBuild() : null).then(() => target);
    }).then(target => {
      const replace$1 = replace;
      const env = Object.assign({}, process.env, target.env);
      Object.keys(env).forEach(key => {
        env[key] = replace$1(env[key], target.env);
      });
      const exec = replace$1(target.exec, target.env);
      const args = target.args.map(arg => replace$1(arg, target.env));
      const cwd = replace$1(target.cwd, target.env);
      const isWin = process.platform === 'win32';
      const shCmd = isWin ? 'cmd' : '/bin/sh';
      const shCmdArg = isWin ? '/C' : '-c'; // Store this as we need to re-set it after postBuild

      buildTitle = [target.sh ? `${shCmd} ${shCmdArg} ${exec}` : exec, ...args, '\n'].join(' ');
      this.buildView.setHeading(buildTitle);

      if (target.sh) {
        this.child = child_process.spawn(shCmd, [shCmdArg, [exec].concat(args).join(' ')], {
          cwd: cwd,
          env: env,
          stdio: ['ignore', null, null]
        });
      } else {
        this.child = crossSpawn__default['default'](exec, args, {
          cwd: cwd,
          env: env,
          stdio: ['ignore', null, null]
        });
      }

      let stdout = '';
      let stderr = '';
      this.child.stdout.setEncoding('utf8');
      this.child.stderr.setEncoding('utf8');
      this.child.stdout.on('data', d => stdout += d);
      this.child.stderr.on('data', d => stderr += d);
      this.child.stdout.pipe(this.buildView.terminal);
      this.child.stderr.pipe(this.buildView.terminal);
      this.child.killSignals = (target.killSignals || ['SIGINT', 'SIGTERM', 'SIGKILL']).slice();
      this.child.on('error', err => {
        this.buildView.terminal.write((target.sh ? 'Unable to execute with shell: ' : 'Unable to execute: ') + exec + '\n');

        if (/\s/.test(exec) && !target.sh) {
          this.buildView.terminal.write('`cmd` cannot contain space. Use `args` for arguments.\n');
        }

        if ('ENOENT' === err.code) {
          this.buildView.terminal.write(`Make sure cmd:'${exec}' and cwd:'${cwd}' exists and have correct access permissions.\n`);
          this.buildView.terminal.write(`Binaries are found in these folders: ${process.env.PATH}\n`);
        }
      });
      this.child.on('close', exitCode => {
        this.child = null;
        this.errorMatcher.set(target, cwd, stdout + stderr);
        let success = 0 === exitCode;

        if (Config.get('matchedErrorFailsBuild')) {
          success = success && !this.errorMatcher.getMatches().some(match => match.type && match.type.toLowerCase() === 'error');
        }

        this.linter && this.linter.processMessages(this.errorMatcher.getMatches(), cwd);

        if (Config.get('beepWhenDone')) {
          atom.beep();
        }

        this.buildView.setHeading('Running postBuild...');
        return Promise.resolve(target.postBuild ? target.postBuild(success, stdout, stderr) : null).then(() => {
          this.buildView.setHeading(buildTitle);
          this.busyProvider && this.busyProvider.remove(`Build: ${target.name}`, success);
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
    }).catch(err => {
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
      kill__default['default'](this.child.pid, signal);
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
    const saveAndContinue = save => {
      modifiedTextEditors.map(textEditor => save && textEditor.save());
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
    return atom.workspace.getTextEditors().filter(textEditor => {
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
      buttons: [{
        text: 'Disable Package',
        className: 'icon icon-playback-pause',

        onDidClick() {
          atom.packages.disablePackage('build');
          return notification.dismiss();
        }

      }, {
        text: "Don't Ask Again",

        onDidClick() {
          Config.set('muteConflictWarning', true);
          return notification.dismiss();
        }

      }]
    });
  },

  consumeLinterRegistry(registry) {
    DevConsole.log('Consuming linter');
    this.linter && this.linter.destroy();
    this.linter = new Linter(registry);
  },

  consumeBuilder(builder) {
    DevConsole.log('Consuming builder');
    if (Array.isArray(builder)) this.tools.push(...builder);else this.tools.push(builder);
    this.targetManager.setTools(this.tools);
    return new atom$1.Disposable(() => {
      this.tools = this.tools.filter(Array.isArray(builder) ? tool => builder.indexOf(tool) === -1 : tool => tool !== builder);
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

module.exports = build;
//# sourceMappingURL=build.js.map
