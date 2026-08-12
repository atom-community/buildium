/**
 * Reactive UI state shared between the orchestrator and the Svelte components.
 *
 * Orchestration code (`buildium.ts` and the view controllers) writes here;
 * components only read. Keeping the state outside the components means a view
 * can be re-created — as the status bar tile is on every config change —
 * without losing what it was displaying.
 */

/**
 * Outcome of the most recent build. `idle` covers both "never built" and
 * "currently building", neither of which is colour-coded.
 */
export type BuildStatus = 'idle' | 'success' | 'error';

export const buildState = $state({
  /** Name of the active build target; empty while none is selected. */
  target: '',
  status: 'idle' as BuildStatus
});
