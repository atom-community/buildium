import { View } from 'atom-space-pen-views';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal } from '@xterm/xterm';
import Config from './config.ts';
import { capitalizedName, getVersion } from './utils.ts';
import type { Panel } from 'atom';
import type { PanelOrientation } from './config.ts';

/** Height the terminal falls back to when it can't be measured, in pixels. */
const DEFAULT_TERMINAL_HEIGHT = 150;

export default class BuildView extends View {
  terminal!: Terminal;

  private starttime = new Date();
  private fitAddon!: FitAddon;
  private resizeObserver!: ResizeObserver;
  /** The element xterm renders into, i.e. `div.xterm`. */
  private terminalEl!: HTMLElement;
  private panel: Panel | null = null;
  private titleTimer: ReturnType<typeof setTimeout> | 0 = 0;

  static initialTimerText(): string {
    return '0.000 s';
  }

  static initialHeadingText(): string {
    return `${capitalizedName()} ${getVersion()}`;
  }

  static content(): void {
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

  constructor(...args: unknown[]) {
    super(...args);

    this.terminal = new Terminal({
      cursorBlink: false,
      convertEol: true,
      scrollback: Config.get('terminalScrollback')
    });

    this.fitAddon = new FitAddon();
    this.terminal.loadAddon(this.fitAddon);

    this.terminal.open(this.output[0]);

    this.terminalEl = this.terminal.element as HTMLElement;
    this.terminalEl.style.height = `${DEFAULT_TERMINAL_HEIGHT}px`;

    // xterm only reflows when it is told to; the panel is resized by the user,
    // by the workspace and by orientation changes alike.
    this.resizeObserver = new ResizeObserver(() => this.fit());
    this.resizeObserver.observe(this.output[0]);

    this.resizeStarted = this.resizeStarted.bind(this);
    this.resizeMoved = this.resizeMoved.bind(this);
    this.resizeEnded = this.resizeEnded.bind(this);

    Config.observe('panelVisibility', this.visibleFromConfig.bind(this));
    Config.observe('panelOrientation', this.orientationFromConfig.bind(this));
    atom.config.observe('editor.fontSize', this.fontSizeFromConfig.bind(this));
    atom.config.observe('editor.fontFamily', this.fontFamilyFromConfig.bind(this));
    atom.commands.add('atom-workspace', 'buildium:toggle-panel', this.toggle.bind(this));
  }

  destroy(): void {
    this.resizeObserver.disconnect();
    this.terminal.dispose();
  }

  /** Reflows the terminal to the size of its container. No-op while detached. */
  fit(): void {
    try {
      this.fitAddon.fit();
    } catch {
      /* `fit()` throws while the terminal has no measurable dimensions, i.e. whenever the panel is detached. */
    }
  }

  resizeStarted(): void {
    document.body.style.setProperty('-webkit-user-select', 'none');
    document.addEventListener('mousemove', this.resizeMoved);
    document.addEventListener('mouseup', this.resizeEnded);
  }

  resizeMoved(ev: MouseEvent): void {
    switch (Config.get('panelOrientation')) {
      case 'Bottom':
      case 'Top': {
        const isBottom = Config.get('panelOrientation') === 'Bottom';
        const delta = this.resizer.get(0).getBoundingClientRect().top - ev.y;
        const height = this.terminalEl.getBoundingClientRect().height + (isBottom ? delta : -delta);

        this.terminalEl.style.height = `${Math.max(0, Math.min(this.maxTerminalHeight(), height))}px`;
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

    this.fit();
  }

  resizeEnded(): void {
    document.body.style.setProperty('-webkit-user-select', 'text');
    document.removeEventListener('mousemove', this.resizeMoved);
    document.removeEventListener('mouseup', this.resizeEnded);
  }

  /** The panel may not grow past the editor it shares the window with. */
  private maxTerminalHeight(): number {
    const itemViews = document.querySelector('.item-views');
    const output = this.output.get(0) as HTMLElement;

    return (itemViews?.getBoundingClientRect().height ?? 0) + output.getBoundingClientRect().height;
  }

  getContent(): string {
    const buffer = this.terminal.buffer.active;
    let content = '';

    for (let i = 0; i < buffer.length; i++) {
      content += `${buffer.getLine(i)?.translateToString(true) ?? ''}\n`;
    }

    return content;
  }

  attach(force = false): void {
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

    const addfn: Record<PanelOrientation, (options: { item: object }) => Panel<object>> = {
      Top: atom.workspace.addTopPanel,
      Bottom: atom.workspace.addBottomPanel,
      Left: atom.workspace.addLeftPanel,
      Right: atom.workspace.addRightPanel
    };

    const orientation = Config.get('panelOrientation') || 'Bottom';

    this.panel = addfn[orientation].call(atom.workspace, { item: this });
    this.fit();
  }

  detach(force = false): void {
    if (atom.views.getView(atom.workspace) && document.activeElement === this[0]) {
      atom.views.getView(atom.workspace).focus();
    }

    if (this.panel && (force || 'Keep Visible' !== Config.get('panelVisibility'))) {
      this.panel.destroy();
      this.panel = null;
    }
  }

  isAttached(): boolean {
    return Boolean(this.panel);
  }

  visibleFromConfig(val: string): void {
    switch (val) {
      case 'Toggle':
      case 'Show on Error':
        if (!this.terminalEl.classList.contains('error')) {
          this.detach();
        }
        return;
    }

    this.attach();
  }

  orientationFromConfig(orientation: PanelOrientation): void {
    const isVisible = this.isVisible();

    this.detach(true);

    if (isVisible) {
      this.attach();
    }

    this.resizer.get(0).removeEventListener('mousedown', this.resizeStarted);
    this.resizer.get(0).addEventListener('mousedown', this.resizeStarted);

    switch (orientation) {
      case 'Top':
      case 'Bottom':
        this.get(0).style.width = null;
        this.terminalEl.style.height = `${DEFAULT_TERMINAL_HEIGHT}px`;
        break;

      case 'Left':
      case 'Right':
        this.terminalEl.style.height = '';
        break;
    }

    this.fit();
  }

  fontSizeFromConfig(size: number): void {
    this.css({ 'font-size': size });
    this.terminal.options.fontSize = size;
    this.fit();
  }

  fontFamilyFromConfig(family: string): void {
    this.css({ 'font-family': family });

    if (family) {
      this.terminal.options.fontFamily = family;
    }

    this.fit();
  }

  reset(): void {
    clearTimeout(this.titleTimer);

    this.buildTimer.text(BuildView.initialTimerText());
    this.titleTimer = 0;
    this.terminal.reset();

    this.panelHeading.removeClass('success error');
    this.title.removeClass('success error');

    this.detach();
  }

  updateTitle(): void {
    this.buildTimer.text(`${((Date.now() - this.starttime.getTime()) / 1000).toFixed(3)} s`);
    this.titleTimer = setTimeout(this.updateTitle.bind(this), 100);
  }

  close(): void {
    this.detach(true);
  }

  toggle(): void {
    if (this.isAttached()) {
      this.detach(true);
    } else {
      this.attach(true);
    }
  }

  clearOutput(): void {
    this.terminal.reset();
  }

  build(): void {
    atom.commands.dispatch(atom.views.getView(atom.workspace), 'buildium:trigger');
  }

  write(data: string): void {
    this.terminal.write(data);
  }

  setHeading(heading: string): void {
    this.heading.text(heading);
  }

  buildStarted(): void {
    this.starttime = new Date();
    this.reset();
    this.attach();

    if (Config.get('stealFocus')) {
      this.focus();
    }

    this.updateTitle();
  }

  buildFinished(success: boolean): void {
    if (!success && !this.isAttached()) {
      this.attach(Config.get('panelVisibility') === 'Show on Error');
    }

    this.finalizeBuild(success);
  }

  buildAbortInitiated(): void {
    this.heading.addClass('icon-stop');
  }

  buildAborted(): void {
    this.finalizeBuild(false);
  }

  finalizeBuild(success: boolean): void {
    this.title.addClass(success ? 'success' : 'error');
    this.panelHeading.addClass(success ? 'success' : 'error');
    this.heading.removeClass('icon-stop');

    clearTimeout(this.titleTimer);
  }

  scrollTo(text: string): void {
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

    this.terminal.scrollToLine(row - 1);
  }
}
