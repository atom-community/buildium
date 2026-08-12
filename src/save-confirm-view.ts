import { View } from 'atom-space-pen-views';
import type { Panel } from 'atom';

export type SaveConfirmCallback = (save: boolean) => void;

export default class SaveConfirmView extends View {
  private confirmcb?: SaveConfirmCallback;
  private cancelcb?: () => void;
  private panel: Panel | null = null;

  static content(): void {
    this.div({ class: 'build-confirm overlay from-top' }, () => {
      this.h3('You have unsaved changes');
      this.div({ class: 'btn-container pull-right' }, () => {
        this.button(
          {
            class: 'btn btn-primary',
            outlet: 'saveBuildButton',
            title: 'Save and Build',
            click: 'saveAndConfirm'
          },
          'Save and build'
        );
        this.button(
          {
            class: 'btn btn-primary',
            title: 'Build without Saving',
            click: 'confirmWithoutSave'
          },
          'Build without Saving'
        );
      });
      this.div({ class: 'btn-container pull-left' }, () => {
        this.button({ class: 'btn', title: 'Cancel', click: 'cancel' }, 'Cancel');
      });
    });
  }

  destroy(): void {
    this.confirmcb = undefined;
    this.cancelcb = undefined;

    if (this.panel) {
      this.panel.destroy();
      this.panel = null;
    }
  }

  show(confirmcb: SaveConfirmCallback, cancelcb?: () => void): void {
    this.confirmcb = confirmcb;
    this.cancelcb = cancelcb;

    this.panel = atom.workspace.addTopPanel({
      item: this
    });

    this.saveBuildButton.focus();
  }

  cancel(): void {
    const cancelcb = this.cancelcb;

    this.destroy();

    if (cancelcb) {
      cancelcb();
    }
  }

  saveAndConfirm(): void {
    if (this.confirmcb) {
      this.confirmcb(true);
    }

    this.destroy();
  }

  confirmWithoutSave(): void {
    if (this.confirmcb) {
      this.confirmcb(false);
    }

    this.destroy();
  }
}
