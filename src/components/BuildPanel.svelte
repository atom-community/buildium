<script lang="ts">
  import { FitAddon } from '@xterm/addon-fit';
  import type { Attachment } from 'svelte/attachments';
  import { observeTerminalTheme } from '../terminal-theme.ts';
  import type { BuildPanelProps } from './BuildPanel.types.ts';
  import type { PanelOrientation } from '../config.ts';

  /** Height the terminal falls back to when it can't be measured, in pixels. */
  const DEFAULT_TERMINAL_HEIGHT = 150;

  let { terminal, heading, timer, outcome, aborting, orientation, fontSize, fontFamily, onBuild, onClear, onClose }: BuildPanelProps = $props();

  let rootEl = $state<HTMLDivElement | undefined>(undefined);
  let resizerEl = $state<HTMLDivElement | undefined>(undefined);

  const fitAddon = new FitAddon();

  /** `.output`, the terminal's container. Set by `mountTerminal`. */
  let outputEl: HTMLElement | undefined;

  /** `div.xterm`, i.e. what xterm renders into. Only exists once opened. */
  let terminalEl: HTMLElement | undefined;

  /**
   * Opens the terminal into `.output` and keeps it fitted for as long as that
   * node lives. `terminal` never changes identity, so this runs once.
   */
  const mountTerminal: Attachment<HTMLElement> = (element) => {
    outputEl = element;

    terminal.loadAddon(fitAddon);
    terminal.open(element);

    terminalEl = terminal.element as HTMLElement;
    terminalEl.style.height = `${DEFAULT_TERMINAL_HEIGHT}px`;

    // xterm only reflows when it is told to, and the panel is resized by the
    // user, by the workspace, by orientation changes and by being attached or
    // detached alike. Observing the container covers all of them.
    const observer = new ResizeObserver(() => fit());

    observer.observe(element);

    // Only possible once the element is in the document: the colours are read
    // from its computed style.
    const themeSubscription = observeTerminalTheme(terminal, element);

    return () => {
      observer.disconnect();
      themeSubscription.dispose();
      // The terminal itself outlives the component: the controller owns it.
    };
  };

  // xterm derives its metrics from its own options rather than from inherited
  // CSS, so the editor font has to be pushed into it explicitly.
  $effect(() => {
    terminal.options.fontSize = fontSize;

    if (fontFamily) {
      terminal.options.fontFamily = fontFamily;
    }

    fit();
  });

  // Changing the docked edge swaps which axis the panel is sized on, so the
  // inline size from the previous orientation has to be dropped.
  $effect(() => applyOrientation(orientation));

  /** Reflows the terminal to the size of its container. No-op while detached. */
  function fit(): void {
    try {
      fitAddon.fit();
    } catch {
      /* `fit()` throws while the terminal has no measurable dimensions, i.e. whenever the panel is detached. */
    }
  }

  function applyOrientation(next: PanelOrientation): void {
    if (!rootEl || !terminalEl) {
      return;
    }

    switch (next) {
      case 'Top':
      case 'Bottom':
        rootEl.style.width = '';
        terminalEl.style.height = `${DEFAULT_TERMINAL_HEIGHT}px`;
        break;

      case 'Left':
      case 'Right':
        terminalEl.style.height = '';
        break;
    }

    fit();
  }

  /** The panel may not grow past the editor it shares the window with. */
  function maxTerminalHeight(): number {
    const itemViews = document.querySelector('.item-views');

    return (itemViews?.getBoundingClientRect().height ?? 0) + (outputEl?.getBoundingClientRect().height ?? 0);
  }

  function resizeStarted(): void {
    document.body.style.setProperty('-webkit-user-select', 'none');
    document.addEventListener('mousemove', resizeMoved);
    document.addEventListener('mouseup', resizeEnded);
  }

  function resizeMoved(event: MouseEvent): void {
    if (!rootEl || !resizerEl || !terminalEl) {
      return;
    }

    const resizerBox = resizerEl.getBoundingClientRect();

    switch (orientation) {
      case 'Bottom':
      case 'Top': {
        const delta = resizerBox.top - event.y;
        const height = terminalEl.getBoundingClientRect().height + (orientation === 'Bottom' ? delta : -delta);

        terminalEl.style.height = `${Math.max(0, Math.min(maxTerminalHeight(), height))}px`;
        break;
      }

      case 'Left': {
        const delta = resizerBox.right - event.x;

        rootEl.style.width = `${rootEl.getBoundingClientRect().width - delta - resizerBox.width}px`;
        break;
      }

      case 'Right': {
        const delta = resizerBox.left - event.x;

        rootEl.style.width = `${rootEl.getBoundingClientRect().width + delta}px`;
        break;
      }
    }

    fit();
  }

  function resizeEnded(): void {
    document.body.style.setProperty('-webkit-user-select', 'text');
    document.removeEventListener('mousemove', resizeMoved);
    document.removeEventListener('mouseup', resizeEnded);
  }
</script>

<!-- Every class name below is a public contract: `.build` is what the `escape`
     keymap binds to, and the rest are what this package's stylesheets — and any
     theme overriding them — select on. The octicon classes sit directly on the
     elements, as Atom's `.btn.icon` styling expects, which is why the buttons do
     not use `@children-of-atom/octicons-svelte` (its components render a nested
     `<span class="icon icon-*">` instead). -->
<div bind:this={rootEl} tabindex="-1" class="build tool-panel native-key-bindings" style:font-size="{fontSize}px" style:font-family={fontFamily || null}>
  <div class="heading" class:success={outcome === 'success'} class:error={outcome === 'error'}>
    <div class="control-container">
      <button class="btn btn-default icon icon-zap" title="Builds current project" onclick={onBuild}>Build</button>
      <button class="btn btn-default icon icon-trashcan" title="Clears the output" onclick={onClear}>Clear</button>
      <button class="btn btn-default icon icon-x" title="Closes the build panel" onclick={onClose}>Close</button>
      <div class="title" class:success={outcome === 'success'} class:error={outcome === 'error'}>
        <span class="build-timer">{timer}</span>
      </div>
    </div>
    <div class="icon heading-text text-highlight" class:icon-stop={aborting}>{heading}</div>
  </div>

  <div class="output panel-body" {@attach mountTerminal}></div>

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div bind:this={resizerEl} class="resizer" onmousedown={resizeStarted}></div>
</div>
