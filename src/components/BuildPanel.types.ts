import type { Terminal } from '@xterm/xterm';
import type { PanelOrientation } from '../config.ts';
import type { BuildStatus } from '../state.svelte.ts';

/**
 * Props of `BuildPanel.svelte`.
 *
 * They live in a `.ts` file rather than in the component because `tsc` resolves
 * `*.svelte` through the loose shim in `shims.d.ts` and cannot see a type
 * exported from a component's module script — the controller needs this type.
 */
export type BuildPanelProps = {
  /**
   * Created by the controller, not by the component: `mount()` does not flush
   * effects synchronously, so a terminal created inside the component would not
   * exist yet when `new BuildView()` returns — and `buildium.ts` writes to it.
   * The component opens it into `.output` and keeps it fitted; the controller
   * disposes it.
   */
  terminal: Terminal;

  /** Command line of the running build, or the package name and version when idle. */
  heading: string;

  /** Elapsed build time, pre-formatted (e.g. `1.234 s`). */
  timer: string;

  /** Outcome of the last finished build; colours `.heading` and `.title`. */
  outcome: BuildStatus;

  /** True between the abort request and the child actually exiting. */
  aborting: boolean;

  /** Which edge the panel is docked to; decides how the resizer drags. */
  orientation: PanelOrientation;

  /** `editor.fontSize`, applied to the panel and the terminal alike. */
  fontSize: number;

  /** `editor.fontFamily`; empty means "leave xterm's default alone". */
  fontFamily: string;

  onBuild: () => void;
  onClear: () => void;
  onClose: () => void;
};
