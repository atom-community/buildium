<script lang="ts">
  import { buildState } from '../state.svelte.ts';

  type Props = {
    /** Invoked when the tile is clicked; opens the target list. */
    onclick: () => void;
  };

  let { onclick }: Props = $props();
</script>

<!-- The `#build-status-bar` id and the `status-*` classes are styled by
     `build.css`, and third parties may key off them; they are a public
     contract and must not be renamed. -->
<div id="build-status-bar" class="inline-block" class:status-success={buildState.status === 'success'} class:status-error={buildState.status === 'error'}>
  <!-- svelte-ignore a11y_missing_attribute -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- The placeholder is load-bearing, not cosmetic: `target` is empty from the
       moment the tile is created until the first target refresh resolves, and an
       empty inline `<a>` is a zero-width box with nothing to click. Without it
       the tile silently swallows the first click after a window reload, and stays
       unclickable forever in a project that has no build file. -->
  <a {onclick}>{buildState.target || 'No build target'}</a>
</div>
