/**
 * Vendored from `@children-of-atom/select-list`, which is not published to npm.
 * Upstream: children-of-atom @ 6deeb204e8cbf569da917a945ffa635ef1a21427,
 * `libraries/select-list/src/components/SelectList.types.ts`.
 *
 * Local additions are marked `LOCAL` and are purely additive — see the header
 * of `SelectList.svelte` for the rationale.
 */

import type { MatcherOptions, NucleoMatcher } from 'nucleo-matcher-wasm';
import type { Component, Snippet } from 'svelte';

/**
 * Standard item shape for SelectList.
 * - label: main text (required)
 * - description: secondary text (optional)
 * - icon: string (emoji, icon name, or Svelte component) (optional)
 * - value: any user data (optional)
 * - [key: string]: any extra fields
 */
export interface SelectListItem {
  label: string;
  description?: string;
  icon?: string | Component; // string, emoji, or Svelte component
  value?: unknown;
  [key: string]: unknown;
}

/** Constructor type for the dynamically loaded NucleoMatcher class. */
export type NucleoMatcherConstructor = new (items: string[], options?: MatcherOptions | null) => NucleoMatcher;

/** A single item together with its fuzzy-match indices. */
export type FilteredResult<T> = {
  item: T;
  /** Character indices into the `filterKey` string that matched. Empty when query is blank. */
  indices: number[];
};

/** Case-matching strategy for the fuzzy matcher. */
export type CaseMatchingOption = 'smart' | 'ignore' | 'respect';

/** Extra Atom commands registered on the select-list container element. */
export type ExtraCommands = Record<string, (event: Event) => void>;

export interface Props {
  // ── Data ──────────────────────────────────────────────────────────────

  /** All items to display and filter. */
  items: SelectListItem[];

  // ── Rendering ─────────────────────────────────────────────────────────

  /**
   * Svelte 5 snippet for rendering the contents of each list item.
   *
   * Receives the item, the fuzzy-match character indices into its label, and
   * whether it is checked (multi-select mode only). When omitted, the built-in
   * layout renders `label`, `description` and `icon`.
   */
  itemSnippet?: Snippet<[item: SelectListItem, indices: number[], checked: boolean]>;

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
  itemClass?: (item: SelectListItem) => string | undefined;

  // ── Matching / filtering ──────────────────────────────────────────────

  /** Injected native matcher constructor. When `null`, falls back to substring matching. */
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

  /** Identify an item by a unique key for recency matching. Defaults to label. */
  itemKey?: (item: SelectListItem) => string;

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

  /** Incremented each time the list is shown — triggers query/selection reset. */
  showCount?: number;

  // ── Extra integration ─────────────────────────────────────────────────

  /**
   * Additional Atom commands registered on the container element.
   * Useful for consumer-specific bindings (e.g. pane split commands).
   */
  extraCommands?: ExtraCommands;

  // ── Callbacks ─────────────────────────────────────────────────────────

  /** Called when the user dismisses the list (Escape, blur, etc.). */
  onClose?: () => void;

  /** Single-select: called when the user confirms an item. */
  onConfirm?: (item: SelectListItem) => void;

  /** Multi-select: called when the user confirms checked items. */
  onConfirmMultiple?: (items: SelectListItem[]) => void;

  /** Called whenever the query text changes. */
  onQueryChange?: (query: string) => void;
}
