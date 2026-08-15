import { CompositeDisposable } from 'atom';
import { createStatusBarTile, type SvelteStatusBarResult } from '@children-of-atom/svelte-view';
import Config from './config.ts';
import StatusTile from './components/StatusTile.svelte';
import { buildState } from './state.svelte.ts';
import type { Disposable } from 'atom';
import type { StatusBar } from '@pulsar-edit/types/status-bar';

export type StatusBarService = StatusBar;

/**
 * Controller for the status bar tile. What the tile displays lives in
 * `state.svelte.ts`, so re-creating the tile on a config change — which is what
 * `attach()` does — never loses the current target or build status.
 */
export default class StatusBarView {
  private statusBar: StatusBarService;
  private tile: SvelteStatusBarResult | null = null;
  private tooltip: Disposable | null = null;
  private clickCallback?: () => void;
  private subscriptions = new CompositeDisposable();

  constructor(statusBar: StatusBarService) {
    this.statusBar = statusBar;

    // `Config.observe` fires immediately with the current value, so letting each
    // observer attach would build and tear down the tile once per key before the
    // window has even settled. Ignore those first calls and attach once, below.
    let observing = false;
    const reattach = () => {
      if (observing) {
        this.attach();
      }
    };

    this.subscriptions.add(Config.observe('statusBar', reattach), Config.observe('statusBarPriority', reattach));

    observing = true;

    this.attach();
  }

  attach(): void {
    this.destroy();

    const orientation = Config.get('statusBar');

    if ('Disable' === orientation) {
      return;
    }

    this.tile = createStatusBarTile(
      this.statusBar,
      StatusTile,
      { onclick: () => this.clicked() },
      {
        position: orientation === 'Left' ? 'left' : 'right',
        priority: Config.get('statusBarPriority')
      }
    );

    // The wrapper is `display: contents` and therefore has no box for the
    // tooltip to anchor to; the component root does.
    const root = this.tile.view.getElement().querySelector<HTMLElement>('#build-status-bar');

    if (root) {
      this.tooltip = atom.tooltips.add(root, {
        title: () => this.tooltipMessage()
      });
    }
  }

  /** Tears down the tile only; `attach()` calls this to rebuild it. */
  destroy(): void {
    if (this.tile) {
      this.tile.dispose();
      this.tile = null;
    }

    if (this.tooltip) {
      this.tooltip.dispose();
      this.tooltip = null;
    }
  }

  /** Full teardown, including the config observers. For package deactivation. */
  dispose(): void {
    this.subscriptions.dispose();
    this.destroy();
  }

  tooltipMessage(): string {
    return `Current build target is '${buildState.target}'`;
  }

  setTarget(t: string): void {
    if (buildState.target === t) {
      return;
    }

    buildState.target = t || '';
    buildState.status = 'idle';
  }

  buildAborted(): void {
    this.setBuildSuccess(false);
  }

  setBuildSuccess(success: boolean): void {
    buildState.status = success ? 'success' : 'error';
  }

  buildStarted(): void {
    buildState.status = 'idle';
  }

  onClick(cb: () => void): void {
    this.clickCallback = cb;
  }

  clicked(): void {
    this.clickCallback?.();
  }
}
