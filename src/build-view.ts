import { SvelteView } from '@children-of-atom/svelte-view';
import { Terminal } from '@xterm/xterm';
import BuildPanel from './components/BuildPanel.svelte';
import Config from './config.ts';
import { addXtermStyleSheet } from './xterm-styles.ts';
import { capitalizedName, getVersion } from './utils.ts';
import type { BuildPanelProps } from './components/BuildPanel.types.ts';
import type { BuildStatus } from './state.svelte.ts';
import type { Disposable, Panel } from 'atom';
import type { PanelOrientation } from './config.ts';

/**
 * Controller for the build panel.
 *
 * The markup, the resizer and the terminal's layout live in
 * `BuildPanel.svelte`; this owns the panel's lifecycle, the config
 * subscriptions and the `Terminal` instance that `buildium.ts` writes to. Every
 * public method is one the orchestrator already called, so the switch away from
 * `atom-space-pen-views` is invisible to it.
 *
 * The view is created once and outlives every attach/detach: only the `Panel`
 * is destroyed when the panel is toggled or re-docked, so the terminal's
 * scrollback survives exactly as it did before.
 */
export default class BuildView {
  terminal: Terminal;

  private view: SvelteView<BuildPanelProps>;
  private styles: Disposable;
  private panel: Panel | null = null;
  private starttime = new Date();
  private titleTimer: ReturnType<typeof setTimeout> | 0 = 0;
  private outcome: BuildStatus = 'idle';

  static initialTimerText(): string {
    return '0.000 s';
  }

  static initialHeadingText(): string {
    return `${capitalizedName()} ${getVersion()}`;
  }

  constructor() {
    this.styles = addXtermStyleSheet();

    this.terminal = new Terminal({
      cursorBlink: false,
      convertEol: true,
      scrollback: Config.get('terminalScrollback')
    });

    this.view = new SvelteView<BuildPanelProps>(BuildPanel, {
      terminal: this.terminal,
      heading: BuildView.initialHeadingText(),
      timer: BuildView.initialTimerText(),
      outcome: 'idle',
      aborting: false,
      orientation: Config.get('panelOrientation') || 'Bottom',
      fontSize: atom.config.get('editor.fontSize') as number,
      fontFamily: (atom.config.get('editor.fontFamily') as string) || '',
      onBuild: () => this.build(),
      onClear: () => this.clearOutput(),
      onClose: () => this.close()
    });

    Config.observe('panelVisibility', this.visibleFromConfig.bind(this));
    Config.observe('panelOrientation', this.orientationFromConfig.bind(this));
    atom.config.observe('editor.fontSize', this.fontSizeFromConfig.bind(this));
    atom.config.observe('editor.fontFamily', this.fontFamilyFromConfig.bind(this));
    atom.commands.add('atom-workspace', 'buildium:toggle-panel', this.toggle.bind(this));
  }

  destroy(): void {
    this.detach(true);
    this.view.destroy();
    this.terminal.dispose();
    this.styles.dispose();
  }

  /** The component's root, i.e. `div.build` — not the `<svelte-view-container>` wrapper. */
  private getPanelElement(): HTMLElement | null {
    return this.view.getElement().querySelector<HTMLElement>('.build');
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

    this.panel = addfn[orientation].call(atom.workspace, { item: this.view });
  }

  detach(force = false): void {
    const element = this.getPanelElement();

    if (atom.views.getView(atom.workspace) && element && document.activeElement === element) {
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
        // The original guarded this with a check for an `error` class on the
        // terminal element, which nothing ever sets — so the panel was always
        // detached here. Reproduced rather than corrected, since correcting it
        // would change when the panel stays open.
        this.detach();
        return;
    }

    this.attach();
  }

  orientationFromConfig(orientation: PanelOrientation): void {
    const wasAttached = this.isAttached();

    this.detach(true);

    if (wasAttached) {
      this.attach();
    }

    // The component resets its own inline sizing off this prop.
    this.view.updateProps({ orientation });
  }

  fontSizeFromConfig(size: number): void {
    this.view.updateProps({ fontSize: size });
  }

  fontFamilyFromConfig(family: string): void {
    this.view.updateProps({ fontFamily: family || '' });
  }

  reset(): void {
    clearTimeout(this.titleTimer);

    this.titleTimer = 0;
    this.outcome = 'idle';
    this.terminal.reset();

    this.view.updateProps({
      timer: BuildView.initialTimerText(),
      outcome: 'idle'
    });

    this.detach();
  }

  updateTitle(): void {
    this.view.updateProps({ timer: `${((Date.now() - this.starttime.getTime()) / 1000).toFixed(3)} s` });
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
    this.view.updateProps({ heading });
  }

  buildStarted(): void {
    this.starttime = new Date();
    this.reset();
    this.attach();

    if (Config.get('stealFocus')) {
      this.getPanelElement()?.focus();
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
    this.view.updateProps({ aborting: true });
  }

  buildAborted(): void {
    this.finalizeBuild(false);
  }

  finalizeBuild(success: boolean): void {
    this.outcome = success ? 'success' : 'error';

    this.view.updateProps({
      outcome: this.outcome,
      aborting: false
    });

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
