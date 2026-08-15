/** Ambient declarations for untyped runtime dependencies. */

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

declare module 'cson-parser' {
  export function parse(content: string): unknown;
  export function stringify(value: unknown, visitor?: unknown, indent?: string | number): string;
}
