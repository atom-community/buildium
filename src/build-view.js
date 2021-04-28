import { capitalizedName, getVersion } from './utils';
import { View, $ } from 'atom-space-pen-views';
import Config from './config';
import Terminal from 'xterm';

export default class BuildView extends View {
  static initialTimerText() {
    return '0.000 s';
  }

  static initialHeadingText() {
    return `${capitalizedName()} ${getVersion()}`;
  }

  static content() {
    this.div({ tabIndex: -1, class: 'build tool-panel native-key-bindings' }, () => {
      this.div({ class: 'heading', outlet: 'panelHeading' }, () => {
        this.div({ class: 'control-container' }, () => {
          this.button(
            {
              class: 'btn btn-default icon icon-zap',
              click: 'build',
              title: 'Builds current project'
            },
            'Build'
          );
          this.button(
            {
              class: 'btn btn-default icon icon-trashcan',
              click: 'clearOutput',
              title: 'Clears the output'
            },
            'Clear'
          );
          this.button(
            {
              class: 'btn btn-default icon icon-x',
              click: 'close',
              title: 'Closes the build panel'
            },
            'Close'
          );
          this.div({ class: 'title', outlet: 'title' }, () => {
            this.span({ class: 'build-timer', outlet: 'buildTimer' }, this.initialTimerText());
          });
        });
        this.div({ class: 'icon heading-text text-highlight', outlet: 'heading' }, this.initialHeadingText());
      });

      this.div({ class: 'output panel-body', outlet: 'output' });
      this.div({ class: 'resizer', outlet: 'resizer' });
    });
  }

  constructor(...args) {
    super(...args);
    this.starttime = new Date();
    this.terminal = new Terminal({
      cursorBlink: false,
      convertEol: true,
      useFocus: false,
      termName: 'xterm-256color',
      scrollback: Config.get('terminalScrollback')
    });

    // On some systems, prependListern and prependOnceListener is expected to exist. Add them until terminal replacement is here.
    this.terminal.prependListener = (...a) => {
      this.terminal.on(...a);
    };
    this.terminal.prependOnceListener = (...a) => {
      this.terminal.addOnceListener(...a);
    };

    this.terminal.getContent = function () {
      return this.lines.reduce((m1, line) => {
        return m1 + line.reduce((m2, col) => m2 + col[1], '') + '\n';
      }, '');
    };

    this.fontGeometry = { w: 15, h: 15 };
    this.terminal.open(this.output[0]);
    this.destroyTerminal = ::this.terminal.destroy;
    this.terminal.destroy = this.terminal.destroySoon = () => {}; // This terminal will be open forever and reset when necessary
    this.terminalEl = $(this.terminal.element);
    this.terminalEl[0].terminal = this.terminal; // For testing purposes

    this.resizeStarted = ::this.resizeStarted;
    this.resizeMoved = ::this.resizeMoved;
    this.resizeEnded = ::this.resizeEnded;

    Config.observe('panelVisibility', ::this.visibleFromConfig);
    Config.observe('panelOrientation', ::this.orientationFromConfig);
    atom.config.observe('editor.fontSize', ::this.fontSizeFromConfig);
    atom.config.observe('editor.fontFamily', ::this.fontFamilyFromConfig);
    atom.commands.add('atom-workspace', 'buildium:toggle-panel', ::this.toggle);
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
    const { h } = this.fontGeometry;

    switch (Config.get('panelOrientation')) {
      case 'Bottom': {
        const delta = this.resizer.get(0).getBoundingClientRect().top - ev.y;
        if (Math.abs(delta) < (h * 5) / 6) return;

        const nearestRowHeight = Math.round((this.terminalEl.height() + delta) / h) * h;
        const maxHeight = $('.item-views').height() + $('.build .output').height();
        this.terminalEl.css('height', `${Math.min(maxHeight, nearestRowHeight)}px`);
        break;
      }

      case 'Top': {
        const delta = this.resizer.get(0).getBoundingClientRect().top - ev.y;
        if (Math.abs(delta) < (h * 5) / 6) return;

        const nearestRowHeight = Math.round((this.terminalEl.height() - delta) / h) * h;
        const maxHeight = $('.item-views').height() + $('.build .output').height();
        this.terminalEl.css('height', `${Math.min(maxHeight, nearestRowHeight)}px`);
        break;
      }

      case 'Left': {
        const delta = this.resizer.get(0).getBoundingClientRect().right - ev.x;
        this.css('width', `${this.width() - delta - this.resizer.outerWidth()}px`);
        break;
      }

      case 'Right': {
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
    const o = $('<div>A</div>').addClass('terminal').addClass('terminal-test').appendTo(this.output);
    const w = o[0].getBoundingClientRect().width;
    const h = o[0].getBoundingClientRect().height;
    o.remove();
    return { w, h };
  }

  resizeTerminal() {
    this.fontGeometry = this.getFontGeometry();
    const { w, h } = this.fontGeometry;
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
    this.panel = addfn[orientation].call(atom.workspace, { item: this });
    this.fixTerminalElHeight();
    this.resizeToNearestRow();
  }

  fixTerminalElHeight() {
    const nearestRowHeight = $('.build .output').height();
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
    this.css({ 'font-size': size });
    this.resizeToNearestRow();
  }

  fontFamilyFromConfig(family) {
    this.css({ 'font-family': family });
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
    this.buildTimer.text(((new Date() - this.starttime) / 1000).toFixed(3) + ' s');
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
    let curPos = text.length;
    // We need to decrease the size of `text` until we find a match. This is because
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
