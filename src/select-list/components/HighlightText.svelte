<!--
  Vendored from `@children-of-atom/select-list`, which is not published to npm.
  Upstream: children-of-atom @ 6deeb204e8cbf569da917a945ffa635ef1a21427,
  `libraries/select-list/src/components/HighlightText.svelte`. Unmodified.
-->
<script lang="ts">
  import type { HighlightSegment } from '../highlight.ts';
  import { buildHighlightSegments } from '../highlight.ts';

  let {
    text,
    indices
  }: {
    text: string;
    indices: number[];
  } = $props();

  const segments: HighlightSegment[] = $derived(buildHighlightSegments(text, indices));
</script>

{#each segments as seg}{#if seg.match}<span class="character-match">{seg.text}</span>{:else}{seg.text}{/if}{/each}
