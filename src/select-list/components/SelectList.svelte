<!--
  Vendored from `@children-of-atom/select-list`, which is not published to npm.
  Upstream: children-of-atom @ 6deeb204e8cbf569da917a945ffa635ef1a21427,
  `libraries/select-list/src/components/SelectList.svelte`.

  Deliberate divergences from upstream, all worth sending back:

  1. `itemSnippet` is implemented. Upstream declares it in `SelectListOptions`
     but the component never accepted it, so there was no way to render custom
     item markup — which is what the build-target list needs.
  2. `listClassName` / `itemClass` added, so a consumer can put Atom's
     `mark-active` on the `<ol>` and `active` on the matching `<li>`. Themes key
     the active-item checkmark off `.list-group.mark-active > li.active`, and
     both classes have to sit on those exact elements.
  3. `emptyMessage` / `noMatchesMessage` added. Upstream hard-codes both strings
     and only lets a consumer replace the whole empty state via `emptySnippet`,
     which is more than is needed to reword a sentence.
  4. `initialSelectedKey` added, so the list can open with a particular item
     preselected rather than always the first one.
  5. The two near-identical `{#each}` blocks are collapsed into one `listItem`
     snippet. Upstream's copies had already drifted: only the first one rendered
     component icons.
  6. Labels render through `HighlightText` instead of `{@html}`. Item labels are
     build-target names read out of project files; interpolating them as HTML is
     an injection the component does not need.
  7. The query input is themed off the custom properties that
     `styles/rosetta.*.less` bridges from the active theme's LESS variables, and
     its focus ring follows the `.focus()` mixin every themed input goes through.
     Upstream's hard-coded `rgba(255, 255, 255, …)` renders it all but invisible
     on a dark theme, and its near-white focus ring matches nothing else in the
     UI — see the `input.editor` rules below.
  8. The list suppresses mousedown's default action. Upstream's items carry
     `onclick` handlers that can never run: the mousedown blurs the query input,
     the container's `onfocusout` closes the list, and the click is dispatched
     into a detached tree. Keyboard use hides this, so upstream (and the fuzzy
     package, which copied the same handler) is mouse-dead too.
-->
<script lang="ts">
  import type { CaseMatching, MatchResultWithIndices } from 'nucleo-matcher-wasm';
  import { untrack } from 'svelte';
  import HighlightText from './HighlightText.svelte';
  import type { FilteredResult, Props, SelectListItem } from './SelectList.types.ts';

  let {
    // Data
    items,

    // Rendering
    itemSnippet,
    emptySnippet,

    // Labels / ARIA
    label,
    listLabel,
    inputLabel,
    inputPlaceholder = '',
    className = '',
    listClassName = '',
    itemClass,

    // Matching
    NucleoMatcherClass = null,
    caseMatching = 'smart',
    preferPrefix = false,
    matchPaths = false,
    filterQuery,
    maxVisibleResults = 50,

    // Recent items
    recentKeys = [],
    itemKey,
    initialSelectedKey,
    recentSectionLabel = 'Recently used',
    allSectionLabel = 'All items',

    // Multi-select
    multiSelect = false,

    // State / loading
    loadingMessage,
    loadingBadge,
    errorMessage,
    emptyMessage = 'No items available',
    noMatchesMessage = 'No matching items',
    isLoading = false,
    isBusy = false,
    showCount = 0,

    // Extra integration
    extraCommands,

    // Callbacks
    onClose,
    onConfirm,
    onConfirmMultiple,
    onQueryChange
  }: Props = $props();

  // ── Unique ID prefix ──────────────────────────────────────────────────

  const id = $props.id();

  const listId = `${id}-list`;

  function itemId(idx: number): string {
    return `${id}-item-${idx}`;
  }

  // ── State ─────────────────────────────────────────────────────────────

  let query = $state('');
  let selectedIndex = $state(0);
  let checkedSet = $state(new Set<string>());
  let matcher = $state<import('nucleo-matcher-wasm').NucleoMatcher | null>(null);

  // ── Element refs ──────────────────────────────────────────────────────

  let containerEl = $state<HTMLDivElement | undefined>(undefined);
  let inputEl = $state<HTMLInputElement | undefined>(undefined);
  let listEl = $state<HTMLOListElement | undefined>(undefined);

  // ── Key extraction ────────────────────────────────────────────────────

  function getItemKey(item: SelectListItem): string {
    return itemKey ? itemKey(item) : item.label;
  }

  // ── Reactive effects ──────────────────────────────────────────────────

  // Rebuild the NucleoMatcher whenever the item list or constructor-only options change.
  $effect(() => {
    if (!NucleoMatcherClass || !items.length) return;

    const labels = items.map((item) => item.label);
    const m = new NucleoMatcherClass(labels, { matchPaths, preferPrefix });

    matcher = m;

    return () => {
      if (matcher === m) matcher = null;
      m.free();
    };
  });

  // When the list is shown: reset query/selection/checks and focus input.
  $effect(() => {
    if (!showCount) return;

    query = '';
    selectedIndex = 0;
    checkedSet = new Set();
    inputEl?.focus();

    untrack(() => listEl?.scrollTo(0, 0));
  });

  // Reset selection to top whenever the query changes. Reading `query` is the
  // entire point of the effect, so it is passed in rather than merely mentioned.
  $effect(() => resetSelection(query));

  function resetSelection(_query: string): void {
    selectedIndex = 0;
  }

  // Notify consumer of query changes.
  $effect(() => {
    onQueryChange?.(query);
  });

  // Register Atom core navigation commands on the container.
  $effect(() => {
    if (!containerEl) return;

    const commands: Record<string, (e: Event) => void> = {
      'core:move-up': (e) => {
        e.stopPropagation();
        selectPrevious();
      },
      'core:move-down': (e) => {
        e.stopPropagation();
        selectNext();
      },
      'core:move-to-top': (e) => {
        e.stopPropagation();
        selectedIndex = 0;
        scrollSelectedIntoView();
      },
      'core:move-to-bottom': (e) => {
        e.stopPropagation();
        selectedIndex = Math.max(0, allResults.length - 1);
        scrollSelectedIntoView();
      },
      'core:confirm': (e) => {
        e.stopPropagation();
        confirmSelected();
      },
      'core:cancel': (e) => {
        e.stopPropagation();
        onClose?.();
      }
    };

    if (extraCommands) {
      Object.assign(commands, extraCommands);
    }

    const disposable = atom.commands.add(containerEl, commands);

    return () => disposable.dispose();
  });

  // ── Derived values ────────────────────────────────────────────────────

  const effectiveQuery = $derived(filterQuery ? filterQuery(query) : query);

  const itemByLabel = $derived(new Map(items.map((item) => [item.label, item])));

  const filteredResults = $derived.by<FilteredResult<SelectListItem>[]>(() => {
    if (!effectiveQuery.trim()) {
      return items.map((item) => ({ item, indices: [] }));
    }

    if (matcher) {
      const raw = matcher.matchLiteralIndices(effectiveQuery, null, {
        caseMatching: caseMatching as CaseMatching,
        normalization: undefined
      }) as MatchResultWithIndices[];

      return raw.flatMap(([matchedLabel, , indices]) => {
        const item = itemByLabel.get(matchedLabel);

        return item ? [{ item, indices }] : [];
      });
    }

    // Fallback: simple substring match before matcher is ready.
    const q = effectiveQuery.toLowerCase();

    return items.filter((item) => item.label.toLowerCase().includes(q)).map((item) => ({ item, indices: [] }));
  });

  const recentKeySet = $derived(new Set(recentKeys));

  const recentResults = $derived.by(() => {
    if (effectiveQuery.trim()) return [];

    return recentKeys
      .filter((key) => filteredResults.some((r) => getItemKey(r.item) === key))
      .map((key) => filteredResults.find((r) => getItemKey(r.item) === key)!)
      .filter(Boolean);
  });

  const remainingResults = $derived.by(() => {
    const cap = Math.max(0, maxVisibleResults - recentResults.length);

    return filteredResults.filter((r) => !recentKeySet.has(getItemKey(r.item))).slice(0, cap);
  });

  const allResults = $derived([...recentResults, ...remainingResults]);

  const effectiveIndex = $derived(allResults.length > 0 ? Math.min(selectedIndex, allResults.length - 1) : 0);

  const statusMessage = $derived.by((): string => {
    if (isLoading && loadingMessage) return loadingMessage;

    if (allResults.length > 0) {
      return `${allResults.length} ${allResults.length === 1 ? 'item' : 'items'} available`;
    }

    if (effectiveQuery.trim()) return noMatchesMessage;

    return '';
  });

  // Open with `initialSelectedKey` highlighted. Items usually arrive after the
  // list is already on screen, so this cannot live in the `showCount` effect —
  // it reacts to the results instead, and backs off as soon as the user has
  // moved the selection or typed anything.
  $effect(() => {
    const key = initialSelectedKey;
    const results = allResults;

    if (!key || !results.length) return;

    untrack(() => {
      if (query !== '' || selectedIndex !== 0) return;

      const idx = results.findIndex((r) => getItemKey(r.item) === key);

      if (idx > 0) {
        selectedIndex = idx;
        scrollSelectedIntoView();
      }
    });
  });

  // ── Helpers ────────────────────────────────────────────────────────────

  function confirmItem(item: SelectListItem): void {
    if (multiSelect) {
      const checked = Array.from(checkedSet)
        .map((key) => items.find((i) => getItemKey(i) === key))
        .filter((i): i is SelectListItem => i !== undefined);

      onConfirmMultiple?.(checked);
    } else {
      onConfirm?.(item);
    }
  }

  function confirmSelected(): void {
    const result = allResults[effectiveIndex];

    if (result) confirmItem(result.item);
  }

  function toggleChecked(item: SelectListItem): void {
    const key = getItemKey(item);
    const next = new Set(checkedSet);

    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }

    checkedSet = next;
  }

  function selectNext(): void {
    if (!allResults.length) return;

    selectedIndex = (selectedIndex + 1) % allResults.length;
    scrollSelectedIntoView();
  }

  function selectPrevious(): void {
    if (!allResults.length) return;

    selectedIndex = (selectedIndex - 1 + allResults.length) % allResults.length;
    scrollSelectedIntoView();
  }

  function scrollSelectedIntoView(): void {
    requestAnimationFrame(() => {
      listEl?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
    });
  }

  function handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        selectNext();
        break;

      case 'ArrowUp':
        event.preventDefault();
        selectPrevious();
        break;

      case 'Enter':
        event.preventDefault();
        confirmSelected();
        break;

      case 'Escape':
        event.preventDefault();
        onClose?.();
        break;

      case 'Home':
        event.preventDefault();
        selectedIndex = 0;
        scrollSelectedIntoView();
        break;

      case 'End':
        event.preventDefault();
        selectedIndex = Math.max(0, allResults.length - 1);
        scrollSelectedIntoView();
        break;

      case ' ':
        if (multiSelect) {
          event.preventDefault();
          const result = allResults[effectiveIndex];
          if (result) toggleChecked(result.item);
        }
        break;
    }
  }

  function handleItemClick(item: SelectListItem): void {
    if (multiSelect) {
      toggleChecked(item);
    } else {
      confirmItem(item);
    }
  }
</script>

{#snippet listItem(result: FilteredResult<SelectListItem>, idx: number)}
  {@const isChecked = multiSelect && checkedSet.has(getItemKey(result.item))}

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <li
    id={itemId(idx)}
    class="two-lines {itemClass?.(result.item) ?? ''}"
    class:selected={idx === effectiveIndex}
    role="option"
    aria-selected={idx === effectiveIndex}
    aria-checked={multiSelect ? isChecked : undefined}
    onclick={() => handleItemClick(result.item)}
    onmouseenter={() => {
      selectedIndex = idx;
    }}
  >
    {#if multiSelect}
      <label class="input-label select-list-checkbox" aria-hidden="true">
        <input
          type="checkbox"
          class="input-checkbox"
          checked={isChecked}
          tabindex={-1}
          onchange={() => toggleChecked(result.item)}
          onclick={(e) => e.stopPropagation()}
        />
      </label>
    {/if}

    {#if itemSnippet}
      {@render itemSnippet(result.item, result.indices, isChecked)}
    {:else}
      {#if result.item.icon}
        {#if typeof result.item.icon === 'string'}
          <span class="select-list-icon">{result.item.icon}</span>
        {:else}
          {@const Icon = result.item.icon}
          <span class="select-list-icon"><Icon /></span>
        {/if}
      {/if}

      <div class="select-list-item-content">
        <span class="select-list-label">
          <HighlightText text={result.item.label} indices={result.indices} />
        </span>

        {#if result.item.description}
          <div class="select-list-description">{result.item.description}</div>
        {/if}
      </div>
    {/if}
  </li>
{/snippet}

<div
  bind:this={containerEl}
  class="select-list {className}"
  role="dialog"
  aria-label={label}
  aria-modal="true"
  aria-busy={isBusy || isLoading}
  onfocusout={(e) => {
    if (containerEl?.contains(e.relatedTarget as Node | null)) return;
    requestAnimationFrame(() => {
      if (document.hasFocus() && !containerEl?.contains(document.activeElement)) onClose?.();
    });
  }}
>
  <input
    bind:this={inputEl}
    bind:value={query}
    type="text"
    class="editor mini native-key-bindings"
    placeholder={inputPlaceholder}
    autocomplete="off"
    spellcheck="false"
    role="combobox"
    aria-haspopup="listbox"
    aria-expanded={allResults.length > 0}
    aria-controls={listId}
    aria-activedescendant={allResults.length > 0 ? itemId(effectiveIndex) : undefined}
    aria-autocomplete="list"
    aria-label={inputLabel}
    onkeydown={handleKeydown}
  />

  <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
    {statusMessage}
  </div>

  {#if errorMessage}
    <span class="error-message">{errorMessage}</span>
  {:else if allResults.length > 0}
    <!-- Nothing in the list is focusable, so pressing the mouse on an item moves
         focus to `<body>` and the container's `onfocusout` closes the list — a
         frame before `click` would have fired, and on an element that no longer
         exists. Suppressing mousedown's default keeps focus in the query input,
         so the click lands. The checkbox's own activation happens on `click` and
         is unaffected. -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <ol
      bind:this={listEl}
      id={listId}
      class="list-group {listClassName}"
      role="listbox"
      aria-label={listLabel}
      aria-multiselectable={multiSelect ? true : undefined}
      onmousedown={(e) => e.preventDefault()}
    >
      {#if recentResults.length > 0}
        <li role="presentation" class="list-section-heading">{recentSectionLabel}</li>

        {#each recentResults as result, i (getItemKey(result.item))}
          {@render listItem(result, i)}
        {/each}
      {/if}

      {#if remainingResults.length > 0}
        {#if recentResults.length > 0}
          <li role="presentation" class="list-section-heading">{allSectionLabel}</li>
        {/if}

        {#each remainingResults as result, i (getItemKey(result.item))}
          {@render listItem(result, recentResults.length + i)}
        {/each}
      {/if}
    </ol>
  {:else if emptySnippet}
    {@render emptySnippet(query)}
  {:else}
    <span class="empty-message">
      {#if isLoading && loadingMessage}
        {loadingMessage}
        {#if loadingBadge != null}
          <span class="loading-badge">{loadingBadge}</span>
        {/if}
      {:else if effectiveQuery.trim()}
        {noMatchesMessage}
      {:else}
        {emptyMessage}
      {/if}
    </span>
  {/if}
</div>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Upstream hard-codes `rgba(255, 255, 255, …)` here, which is a 6%-white box on
     whatever the overlay background happens to be — invisible on a dark theme and
     wrong on a light one. These read the active theme's values instead:
     `styles/rosetta.ui-variables.less` and `styles/rosetta.one-ui.less` import
     the theme's `ui-variables` and re-declare each LESS variable as a matching
     custom property on `:root`, which is the only way a compile-time `@variable`
     can reach CSS that Svelte injects at runtime. The fallbacks stay, and carry
     enough contrast either way, for names a given theme leaves undefined. */
  input.editor {
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 5px;
    padding: 5px 10px;
    font-size: inherit;
    font-family: inherit;
    color: var(--text-color-highlight, var(--text-color, inherit));
    background: var(--input-background-color, rgba(127, 127, 127, 0.16));
    border: 1px solid var(--input-border-color, rgba(127, 127, 127, 0.5));
    border-radius: 2px;
    outline: none;
  }

  input.editor::placeholder {
    color: var(--text-color-subtle, rgba(127, 127, 127, 0.9));
  }

  /* Themes route every focused input through one `.focus()` mixin — `outline:
     none; border-color: @accent-color; box-shadow: 0 0 0 1px @accent-color` —
     and `atom-text-editor[mini].is-focused` adds the focused input background on
     top of it. Upstream's near-white `--text-color-highlight` ring is the one
     thing here that does not look like the rest of the UI, so this restates the
     mixin. The fallback is one-dark-ui's own `@accent-color`, deliberately not
     `--background-color-info`, which carries `@accent-bg-color` — a darker blue
     that reads as subtly wrong next to every other focused input. */
  input.editor:focus {
    border-color: var(--accent-color, #568af2);
    box-shadow: 0 0 0 1px var(--accent-color, #568af2);
    background: var(--input-background-color-focus, var(--input-background-color, rgba(127, 127, 127, 0.16)));
  }

  .list-section-heading {
    padding: 2px 8px;
    font-size: 0.8em;
    font-weight: bold;
    opacity: 0.5;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: default;
    list-style: none;
  }

  .loading-badge {
    display: inline-block;
    margin-inline-start: 0.4em;
    padding: 1px 6px;
    border-radius: 10px;
    background: var(--badge-background-color, rgba(127, 127, 127, 0.2));
    font-variant-numeric: tabular-nums;
    font-size: 0.85em;
  }

  .select-list-checkbox {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    margin-right: 0.4em;
    cursor: pointer;
  }

  .select-list-item-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .select-list-icon {
    display: inline-flex;
    align-items: center;
    margin-right: 0.7em;
    font-size: 1.2em;
    opacity: 0.85;
  }

  .select-list-label {
    font-weight: 500;
    line-height: 1.2;
    display: block;
  }

  .select-list-description {
    color: var(--text-color-subtle, #888);
    font-size: 0.95em;
    margin-top: 0.1em;
    line-height: 1.3;
  }

  :global(.select-list) li[role='option'] {
    display: flex;
    align-items: center;
  }
</style>
