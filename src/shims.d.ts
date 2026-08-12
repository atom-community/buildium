/**
 * Ambient declarations for untyped runtime dependencies.
 *
 * `atom-space-pen-views` and `xterm@2` are deliberately typed loosely — both
 * are scheduled for removal and there is no value in modelling them properly.
 */

declare module 'atom' {
  export * from '@pulsar-edit/types';
}

declare module 'atom-space-pen-views' {
  /* Views are jQuery objects carrying dynamically generated outlets, so there
     is nothing meaningful to model here. */
  type SpacePenView = any;

  export const View: SpacePenView;
  export const SelectListView: SpacePenView;
  export const $: any;
}

declare module 'xterm' {
  type TerminalOptions = {
    cursorBlink?: boolean;
    convertEol?: boolean;
    useFocus?: boolean;
    termName?: string;
    scrollback?: number;
  };

  export default class Terminal {
    constructor(options?: TerminalOptions);

    element: HTMLElement;
    lines: Array<Array<[unknown, string]>>;
    ydisp: number;

    open(parent: HTMLElement): void;
    write(data: string): void;
    reset(): void;
    resize(columns: number, rows: number): void;
    destroy(): void;
    scrollDisp(rows: number): void;

    on(event: string, listener: (...args: unknown[]) => void): void;
    addOnceListener(event: string, listener: (...args: unknown[]) => void): void;

    // Added by `BuildView`
    getContent(): string;
    prependListener(event: string, listener: (...args: unknown[]) => void): void;
    prependOnceListener(event: string, listener: (...args: unknown[]) => void): void;
    destroySoon(): void;

    [key: string]: unknown;
  }
}

declare module 'cson-parser' {
  export function parse(content: string): unknown;
  export function stringify(value: unknown, visitor?: unknown, indent?: string | number): string;
}

declare module 'atom-package-deps' {
  export function install(packageName?: string, promptUser?: boolean): Promise<void>;
}
