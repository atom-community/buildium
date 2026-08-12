import { SvelteView } from '@children-of-atom/svelte-view';
import SaveConfirm from './components/SaveConfirm.svelte';
import type { Panel } from 'atom';

export type SaveConfirmCallback = (save: boolean) => void;

/**
 * Controller for the unsaved-changes overlay. Owns the panel; the markup and
 * the button wiring live in `SaveConfirm.svelte`.
 */
export default class SaveConfirmView {
  private view: SvelteView | null = null;
  private confirmcb?: SaveConfirmCallback;
  private cancelcb?: () => void;
  private panel: Panel | null = null;

  destroy(): void {
    this.confirmcb = undefined;
    this.cancelcb = undefined;

    if (this.panel) {
      this.panel.destroy();
      this.panel = null;
    }

    if (this.view) {
      this.view.destroy();
      this.view = null;
    }
  }

  show(confirmcb: SaveConfirmCallback, cancelcb?: () => void): void {
    this.confirmcb = confirmcb;
    this.cancelcb = cancelcb;

    this.view = new SvelteView(SaveConfirm, {
      onSave: () => this.saveAndConfirm(),
      onSkipSave: () => this.confirmWithoutSave(),
      onCancel: () => this.cancel()
    });

    this.panel = atom.workspace.addTopPanel({
      item: this.view
    });

    // The component mounts before the panel puts it in the document, so the
    // autofocus can only be honoured here.
    this.view.getElement().querySelector<HTMLElement>('[autofocus]')?.focus();
  }

  cancel(): void {
    const cancelcb = this.cancelcb;

    this.destroy();

    if (cancelcb) {
      cancelcb();
    }
  }

  saveAndConfirm(): void {
    this.confirmcb?.(true);
    this.destroy();
  }

  confirmWithoutSave(): void {
    this.confirmcb?.(false);
    this.destroy();
  }
}
