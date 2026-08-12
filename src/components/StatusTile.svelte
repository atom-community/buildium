<script lang="ts">
  import { buildState } from '../state.svelte.ts';

  type Props = {
    /** Invoked when the tile is clicked; opens the target list. */
    onclick: () => void;
  };

  let { onclick }: Props = $props();
</script>

<!-- The `#build-status-bar` id and the `status-*` classes are styled by
     `build.less`, and third parties may key off them; they are a public
     contract and must not be renamed. -->
<div id="build-status-bar" class="inline-block" class:status-success={buildState.status === 'success'} class:status-error={buildState.status === 'error'}>
  <!-- svelte-ignore a11y_missing_attribute -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <a {onclick}>{buildState.target}</a>
</div>
