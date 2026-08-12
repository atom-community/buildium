import { SelectListView } from 'atom-space-pen-views';
import type { Panel } from 'atom';

export default class TargetsView extends SelectListView {
  private panel!: Panel;
  private activeTarget?: string;
  private resolveFunction: ((target: string) => void) | null = null;

  constructor() {
    super(...arguments);
    this.show();
  }

  initialize(): void {
    super.initialize(...arguments);

    this.addClass('build-target');
    this.list.addClass('mark-active');
  }

  show(): void {
    this.panel = atom.workspace.addModalPanel({ item: this });
    this.panel.show();
    this.focusFilterEditor();
  }

  hide(): void {
    this.panel.hide();
  }

  setItems(_items?: string[]): void {
    super.setItems(...arguments);

    const activeItemView = this.find('.active');

    if (0 < activeItemView.length) {
      this.selectItemView(activeItemView);
      this.scrollToItemView(activeItemView);
    }
  }

  setActiveTarget(target: string): void {
    this.activeTarget = target;
  }

  viewForItem(targetName: string): unknown {
    const activeTarget = this.activeTarget;

    return TargetsView.render(function (this: typeof TargetsView) {
      const activeClass = targetName === activeTarget ? 'active' : '';
      this.li({ class: `${activeClass} build-target` }, targetName);
    });
  }

  getEmptyMessage(itemCount: number): string {
    return 0 === itemCount ? 'No targets found.' : 'No matches';
  }

  awaitSelection(): Promise<string> {
    return new Promise((resolve) => {
      this.resolveFunction = resolve;
    });
  }

  confirmed(target: string): void {
    if (this.resolveFunction) {
      this.resolveFunction(target);
      this.resolveFunction = null;
    }

    this.hide();
  }

  cancelled(): void {
    this.hide();
  }
}
