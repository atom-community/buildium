/**
 * Vendored from `@children-of-atom/select-list`, which is not published to npm.
 * Upstream: children-of-atom @ 6deeb204e8cbf569da917a945ffa635ef1a21427,
 * `libraries/select-list/src/index.ts`.
 *
 * The export surface is upstream's, so `./select-list` can be replaced with the
 * package name once it ships.
 */

export { default as HighlightText } from './components/HighlightText.svelte';
export { default as SelectList } from './components/SelectList.svelte';
export type {
  CaseMatchingOption,
  ExtraCommands,
  FilteredResult,
  NucleoMatcherConstructor,
  Props as SelectListProps,
  SelectListItem
} from './components/SelectList.types.ts';
export type { SelectListHandle, SelectListOptions } from './create-select-list.ts';
export { createSelectList } from './create-select-list.ts';
export type { HighlightSegment } from './highlight.ts';
export { buildHighlightSegments } from './highlight.ts';
