import { createSelectList, type SelectListHandle, type SelectListItem } from './select-list/index.ts';

type TargetItem = SelectListItem & {
  label: string;
};

/**
 * The build-target picker.
 *
 * The public methods are the ones `target-manager.ts` has always called, so the
 * switch from `atom-space-pen-views`' `SelectListView` to the Svelte select-list
 * is invisible to it. As before, `awaitSelection()` only ever settles on a
 * confirmed target — dismissing the list simply leaves it pending.
 */
export default class TargetsView {
  private list: SelectListHandle<TargetItem>;
  private resolveFunction: ((target: string) => void) | null = null;
  private confirmed = false;
  private activeTarget?: string;

  constructor() {
    this.list = createSelectList<TargetItem>({
      items: [],

      label: 'Build Targets',
      listLabel: 'Build targets',
      inputLabel: 'Search build targets',

      // `build-target` was on the space-pen view's root element, and `mark-active`
      // on its list; themes render the active item's checkmark off
      // `.list-group.mark-active > li.active`.
      className: 'build-target',
      listClassName: 'mark-active',
      itemClass: TargetsView.itemClassFor(undefined),

      emptyMessage: 'No targets found.',
      noMatchesMessage: 'No matches',

      onConfirm: (item) => this.confirm(item.label),
      onDismiss: () => this.dismissed()
    });

    this.list.show();
  }

  /**
   * A fresh closure per active target: `itemClass` is a reactive prop, but what
   * it closes over is not, so the identity change is what re-renders the list.
   */
  private static itemClassFor(activeTarget: string | undefined) {
    return (item: SelectListItem): string => (item.label === activeTarget ? 'active build-target' : 'build-target');
  }

  hide(): void {
    this.list.dispose();
  }

  setItems(items: string[]): void {
    this.list.updateProps({
      items: items.map((label): TargetItem => ({ label })),
      isLoading: false
    });
  }

  setActiveTarget(target: string): void {
    this.activeTarget = target;

    this.list.updateProps({
      initialSelectedKey: target,
      itemClass: TargetsView.itemClassFor(target)
    });
  }

  setLoading(message: string): void {
    this.list.updateProps({ isLoading: true, loadingMessage: message });
  }

  setError(message: string): void {
    this.list.updateProps({ errorMessage: message });
  }

  awaitSelection(): Promise<string> {
    return new Promise((resolve) => {
      this.resolveFunction = resolve;
    });
  }

  private confirm(target: string): void {
    this.confirmed = true;

    if (this.resolveFunction) {
      this.resolveFunction(target);
      this.resolveFunction = null;
    }

    this.hide();
  }

  private dismissed(): void {
    // `hide()` fires this too, so a confirmed selection must not be mistaken for
    // a dismissal.
    if (this.confirmed) {
      return;
    }

    this.list.dispose();
  }
}
