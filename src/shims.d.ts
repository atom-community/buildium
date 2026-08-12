/**
 * Ambient declarations for untyped runtime dependencies.
 *
 * `atom-space-pen-views` is deliberately typed loosely — it is scheduled for
 * removal and there is no value in modelling it properly.
 */

declare module 'atom' {
  export * from '@pulsar-edit/types';
}

/* `tsc` cannot parse components. Their internals — including prop types — are
   checked by `svelte-check` instead; this only makes the imports resolvable. */
declare module '*.svelte' {
  import type { Component } from 'svelte';

  const component: Component;
  export default component;
}

declare module 'atom-space-pen-views' {
  /* Views are jQuery objects carrying dynamically generated outlets, so there
     is nothing meaningful to model here. */
  type SpacePenView = any;

  export const View: SpacePenView;
  export const SelectListView: SpacePenView;
  export const $: any;
}

declare module 'cson-parser' {
  export function parse(content: string): unknown;
  export function stringify(value: unknown, visitor?: unknown, indent?: string | number): string;
}

declare module 'atom-package-deps' {
  export function install(packageName?: string, promptUser?: boolean): Promise<void>;
}
