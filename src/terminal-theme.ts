/**
 * xterm paints its glyphs from `Terminal.options.theme` and never from
 * inherited CSS, so no stylesheet can reach the output text — the defaults are
 * a hardcoded white-on-black. `build.less` mirrors the relevant `ui-variables`
 * onto `div.build` as custom properties; this reads them back off the live
 * element and hands them to xterm, which keeps the terminal in step with the
 * theme without duplicating a single colour here.
 */

import { Disposable } from 'atom';
import type { ITheme, Terminal } from '@xterm/xterm';

function readColor(styles: CSSStyleDeclaration, property: string): string | undefined {
  return styles.getPropertyValue(property).trim() || undefined;
}

/**
 * Keeps `terminal` painted in the active theme's colours. `element` is any node
 * inside `div.build`, since custom properties inherit.
 */
export function observeTerminalTheme(terminal: Terminal, element: HTMLElement): Disposable {
  // Set while the colours on the terminal are known to be stale, i.e. until the
  // first successful read and after every theme switch.
  let stale = true;

  function apply(): void {
    // A detached element has no computed style to speak of, and the panel
    // spends most of its life detached — writing what we would read there would
    // reset the terminal to xterm's own white-on-black.
    if (!element.isConnected) {
      return;
    }

    const styles = getComputedStyle(element);

    const theme: ITheme = {
      foreground: readColor(styles, '--buildium-terminal-foreground'),
      background: readColor(styles, '--buildium-terminal-background'),
      cursor: readColor(styles, '--buildium-terminal-cursor'),
      cursorAccent: readColor(styles, '--buildium-terminal-cursor-accent'),
      selectionBackground: readColor(styles, '--buildium-terminal-selection'),
      // `@text-color-highlight` is opaque and bright, so xterm would paint the
      // selection right over the glyphs — the foreground flips to the terminal
      // background for the same reason `cursorAccent` does.
      selectionForeground: readColor(styles, '--buildium-terminal-selection-foreground')
    };

    terminal.options.theme = theme;
    stale = false;
  }

  apply();

  const themes = atom.themes.onDidChangeActiveThemes(() => {
    stale = true;

    // The event fires once the new themes are active, but this package's own
    // stylesheets are recompiled against them separately — reading in the same
    // tick can still see the outgoing values. The next frame has them all.
    requestAnimationFrame(apply);
  });

  // Both cases the read above can miss are re-attachments: the component is
  // mounted before the panel is added to the workspace, and a theme may well be
  // switched while the panel is closed. Either way the element is resized as it
  // goes back in.
  const observer = new ResizeObserver(() => {
    if (stale) {
      apply();
    }
  });

  observer.observe(element);

  return new Disposable(() => {
    themes.dispose();
    observer.disconnect();
  });
}
