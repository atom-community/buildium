<script lang="ts">
  type Props = {
    onSave: () => void;
    onSkipSave: () => void;
    onCancel: () => void;
  };

  let { onSave, onSkipSave, onCancel }: Props = $props();
</script>

<!-- `.build-confirm` is the selector the `enter` / `escape` keymaps bind to. -->
<div class="build-confirm overlay from-top">
  <h3>You have unsaved changes</h3>
  <div class="btn-container pull-right">
    <!-- The panel is added to the workspace after this component mounts, so
         the controller focuses this button once it is in the document. -->
    <!-- svelte-ignore a11y_autofocus -->
    <button autofocus class="btn btn-primary" title="Save and Build" onclick={onSave}>Save and build</button>
    <button class="btn btn-primary" title="Build without Saving" onclick={onSkipSave}>Build without Saving</button>
  </div>
  <div class="btn-container pull-left">
    <button class="btn" title="Cancel" onclick={onCancel}>Cancel</button>
  </div>
</div>
