import { View } from 'atom-space-pen-views';
import Config from './config.ts';
import type { Disposable } from 'atom';

export type StatusBarService = {
  addLeftTile(options: { item: unknown; priority?: number }): { destroy(): void };
  addRightTile(options: { item: unknown; priority?: number }): { destroy(): void };
};

export default class StatusBarView extends View {
  private statusBar: StatusBarService;
  private statusBarTile: { destroy(): void } | null = null;
  private tooltip: Disposable | null = null;
  private target?: string;
  private clickCallback?: () => void;

  constructor(statusBar: StatusBarService, ...args: unknown[]) {
    super(...args);

    this.statusBar = statusBar;

    Config.observe('statusBar', () => this.attach());
    Config.observe('statusBarPriority', () => this.attach());
  }

  static content(): void {
    this.div({ id: 'build-status-bar', class: 'inline-block' }, () => {
      this.a({ click: 'clicked', outlet: 'message' });
    });
  }

  attach(): void {
    this.destroy();

    const orientation = Config.get('statusBar');

    if ('Disable' === orientation) {
      return;
    }

    this.statusBarTile = this.statusBar[`add${orientation}Tile`]({
      item: this,
      priority: Config.get('statusBarPriority')
    });

    this.tooltip = atom.tooltips.add(this.element, {
      title: () => this.tooltipMessage()
    });
  }

  destroy(): void {
    if (this.statusBarTile) {
      this.statusBarTile.destroy();
      this.statusBarTile = null;
    }

    if (this.tooltip) {
      this.tooltip.dispose();
      this.tooltip = null;
    }
  }

  tooltipMessage(): string {
    return `Current build target is '${this.element.textContent}'`;
  }

  setClasses(classes?: string): void {
    this.removeClass('status-unknown status-success status-error');
    this.addClass(classes);
  }

  setTarget(t: string): void {
    if (this.target === t) {
      return;
    }

    this.target = t;
    this.message.text(t || '');
    this.setClasses();
  }

  buildAborted(): void {
    this.setBuildSuccess(false);
  }

  setBuildSuccess(success: boolean): void {
    this.setClasses(success ? 'status-success' : 'status-error');
  }

  buildStarted(): void {
    this.setClasses();
  }

  onClick(cb: () => void): void {
    this.clickCallback = cb;
  }

  clicked(): void {
    this.clickCallback?.();
  }
}
