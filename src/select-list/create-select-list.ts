/**
 * Vendored from `@children-of-atom/select-list`, which is not published to npm.
 * Upstream: children-of-atom @ 6deeb204e8cbf569da917a945ffa635ef1a21427,
 * `libraries/select-list/src/create-select-list.ts`.
 *
 * Local additions are marked `LOCAL`; the public API is otherwise unchanged so
 * this directory can be swapped for the package once it ships. The one
 * signature change is `SelectListHandle`, which is now generic over the item
 * type — it defaults to `SelectListItem`, so existing annotations still hold,
 * and it makes `updateProps()` type-check against the same options the list was
 * created with.
 */

import { createPanel, type SveltePanelResult } from '@children-of-atom/svelte-view';
import type { Component, Snippet } from 'svelte';
import SelectList from './components/SelectList.svelte';
import type { CaseMatchingOption, ExtraCommands, NucleoMatcherConstructor, SelectListItem } from './components/SelectList.types.ts';

let DefaultNucleoMatcherClass: NucleoMatcherConstructor | null = null;

/**
 * `nucleo-matcher-wasm` loads its binary with `readFileSync` off its own
 * `__dirname`, so it is an apm-installed dependency rather than something the
 * bundler inlines. A failed install degrades to substring matching instead of
 * breaking the package, which is why this is a guarded `require`.
 */
function loadNucleoMatcher(): NucleoMatcherConstructor | null {
  if (DefaultNucleoMatcherClass) return DefaultNucleoMatcherClass;

  try {
    const mod = require('nucleo-matcher-wasm');
    DefaultNucleoMatcherClass = mod.NucleoMatcher;
  } catch {
    // nucleo-matcher-wasm not available — fall back to substring matching
  }

  return DefaultNucleoMatcherClass;
}

export interface SelectListOptions<T> {
  // ── Data ──────────────────────────────────────────────────────────────

  /** All items to display and filter. */
  items: T[];

  /** Extract the string used for fuzzy matching from an item. Defaults to `item.label`. */
  filterKey?: (item: T) => string;

  // ── Rendering ─────────────────────────────────────────────────────────

  /**
   * Svelte 5 snippet for rendering each list item.
   *
   * Receives:
   * - `item`: the data item
   * - `indices`: fuzzy-match character indices into the `filterKey` string
   * - `checked`: whether the item is checked (multi-select mode only)
   *
   * When omitted, the built-in layout renders `item.label`, `item.description`, and `item.icon`.
   */
  itemSnippet?: Snippet<[item: T, indices: number[], checked: boolean]>;

  /** Optional snippet rendered when the list is empty. */
  emptySnippet?: Snippet<[query: string]>;

  // ── Labels / ARIA ─────────────────────────────────────────────────────

  /** `aria-label` for the dialog container (e.g. "Command Palette"). */
  label: string;

  /** `aria-label` for the `<ol>` listbox (e.g. "Commands"). */
  listLabel: string;

  /** `aria-label` for the text input (e.g. "Search commands"). */
  inputLabel: string;

  /** Placeholder text for the text input. */
  inputPlaceholder?: string;

  /** CSS class(es) appended to the outer `.select-list` container. */
  className?: string;

  /** LOCAL: CSS class(es) appended to the `<ol class="list-group">` listbox. */
  listClassName?: string;

  /** LOCAL: CSS class(es) appended to an individual `<li role="option">`. */
  itemClass?: (item: T) => string | undefined;

  // ── Matching / filtering ──────────────────────────────────────────────

  /** Override the native matcher constructor. Set to `null` to disable fuzzy matching. */
  NucleoMatcherClass?: NucleoMatcherConstructor | null;

  /** Case-matching strategy. Default: `'smart'`. */
  caseMatching?: CaseMatchingOption;

  /** Boost items whose filter key starts with the query. Default: `false`. */
  preferPrefix?: boolean;

  /** Whether filter keys are file paths (enables path-aware matching). Default: `false`. */
  matchPaths?: boolean;

  /** Transform the raw query before it is passed to the matcher. */
  filterQuery?: (query: string) => string;

  /** Maximum number of visible results (excluding recent). Default: `50`. */
  maxVisibleResults?: number;

  // ── Recent items ──────────────────────────────────────────────────────

  /** Ordered list of recent item keys (matched via `filterKey`). */
  recentKeys?: string[];

  /** Identify an item by a unique key for recency matching. Defaults to `filterKey`. */
  itemKey?: (item: T) => string;

  /**
   * LOCAL: key of the item to highlight when the list opens, instead of the
   * first one. Ignored once the user types or moves the selection.
   */
  initialSelectedKey?: string;

  /** Section heading for recent items. Default: `'Recently used'`. */
  recentSectionLabel?: string;

  /** Section heading for non-recent items (shown only when recent items exist). Default: `'All items'`. */
  allSectionLabel?: string;

  // ── Multi-select ──────────────────────────────────────────────────────

  /** Enable multi-select mode with checkboxes. Default: `false`. */
  multiSelect?: boolean;

  // ── State / loading ───────────────────────────────────────────────────

  /** Shown when the list is empty and items are loading. */
  loadingMessage?: string;

  /** Progress indicator badge shown alongside the loading message. */
  loadingBadge?: string | number;

  /** Error message shown instead of the list. */
  errorMessage?: string;

  /** LOCAL: shown when there are no items at all. Default: `'No items available'`. */
  emptyMessage?: string;

  /** LOCAL: shown when the query matches nothing. Default: `'No matching items'`. */
  noMatchesMessage?: string;

  /** Whether items are currently loading. Default: `false`. */
  isLoading?: boolean;

  /** Whether the dialog is busy (sets `aria-busy`). Default: `false`. */
  isBusy?: boolean;

  // ── Extra integration ─────────────────────────────────────────────────

  /**
   * Additional Atom commands registered on the container element.
   * Useful for consumer-specific bindings (e.g. pane split commands).
   */
  extraCommands?: ExtraCommands;

  // ── Callbacks ─────────────────────────────────────────────────────────

  /** Single-select: called when the user confirms an item. */
  onConfirm?: (item: T) => void;

  /** Multi-select: called when the user confirms checked items. */
  onConfirmMultiple?: (items: T[]) => void;

  /** Called whenever the query text changes. */
  onQueryChange?: (query: string) => void;

  /**
   * Called when the user dismisses the list (Escape, blur, etc.).
   * The panel is automatically hidden before this fires.
   * Use this for additional cleanup (e.g. restoring focus).
   */
  onDismiss?: () => void;
}

export interface SelectListHandle<T extends SelectListItem = SelectListItem> {
  /** Show the select-list panel. Resets query and selection on each show. */
  show(): void;

  /** Hide the select-list panel. */
  hide(): void;

  /** Toggle visibility. */
  toggle(): void;

  /** Whether the panel is currently visible. */
  isVisible(): boolean;

  /** Update props on the component (e.g. items, recentKeys). */
  updateProps(props: Partial<SelectListOptions<T>>): void;

  /** Destroy the panel and component. */
  dispose(): void;
}

export function createSelectList<T extends SelectListItem>(options: SelectListOptions<T>): SelectListHandle<T> {
  let showCount = 0;
  let panelResult: SveltePanelResult | null = null;

  function ensurePanel(): SveltePanelResult {
    if (panelResult) return panelResult;

    showCount++;

    const { NucleoMatcherClass, ...rest } = options;

    panelResult = createPanel(
      SelectList as unknown as Component<Record<string, unknown>>,
      {
        ...rest,
        NucleoMatcherClass: NucleoMatcherClass !== undefined ? NucleoMatcherClass : loadNucleoMatcher(),
        showCount,
        onClose: () => handle.hide()
      },
      { type: 'modal', visible: true }
    );

    return panelResult;
  }

  const handle: SelectListHandle<T> = {
    show(): void {
      const result = ensurePanel();

      if (result.panel.isVisible()) return;

      showCount++;
      result.view.updateProps({ showCount });
      result.panel.show();
    },

    hide(): void {
      if (!panelResult) return;

      panelResult.panel.hide();
      options.onDismiss?.();
    },

    toggle(): void {
      if (panelResult?.panel.isVisible()) {
        this.hide();
      } else {
        this.show();
      }
    },

    isVisible(): boolean {
      return panelResult?.panel.isVisible() ?? false;
    },

    updateProps(props: Partial<SelectListOptions<T>>): void {
      if (!panelResult) return;

      panelResult.view.updateProps(props as Record<string, unknown>);
    },

    dispose(): void {
      panelResult?.dispose();
      panelResult = null;
    }
  };

  return handle;
}
