/**
 * The public contract between buildium and third-party `build-*` packages.
 *
 * These types describe the `builder` service (version ^2.0.0) documented in
 * `create-provider.md`. Keep them permissive: providers are plain JavaScript
 * and have never been type-checked against this package.
 */

export type ErrorMatchType = 'Error' | 'Warning';

export type ErrorMatch = {
  id?: string;
  type?: string;
  file?: string;
  line?: string | number;
  line_end?: string | number;
  col?: string | number;
  col_end?: string | number;
  message?: string;
  html_message?: string;
  index?: number;
  trace?: ErrorMatch[];
};

/**
 * A function-based error matcher, as an alternative to `errorMatch` regexes.
 */
export type FunctionMatch = (output: string) => ErrorMatch[];

/**
 * A build target, as returned by a provider's `settings()`.
 */
export type BuildTarget = {
  /** Human-readable name, shown in the target list and status bar. */
  name: string;

  /** The command to run. Named `cmd` in `.buildium.*` files. */
  exec: string;

  args?: string[];
  cwd?: string;
  env?: Record<string, string>;

  /** Run `exec` through a shell. Defaults to `true`. */
  sh?: boolean;

  errorMatch?: string | string[];
  warningMatch?: string | string[];
  functionMatch?: FunctionMatch | FunctionMatch[];

  /** Command registered on `atom-workspace` to trigger this target. */
  atomCommandName?: string;

  /** Keybinding bound to `atomCommandName`. */
  keymap?: string;

  /** Signals sent, in order, when aborting the build. */
  killSignals?: NodeJS.Signals[];

  preBuild?: () => unknown;
  postBuild?: (success: boolean, stdout: string, stderr: string) => unknown;
};

/**
 * A target after `Utils.getDefaultSettings()` has filled in the blanks.
 */
export type ResolvedBuildTarget = BuildTarget &
  Required<Pick<BuildTarget, 'args' | 'cwd' | 'env' | 'sh'>> & {
    errorMatch: string | string[];
  };

/**
 * The shape of a single target in a `.buildium.*` file or `package.json`.
 */
export type BuildFileTarget = Omit<BuildTarget, 'name' | 'exec'> & {
  name?: string;
  cmd?: string;
  targets?: Record<string, BuildFileTarget>;
};

/**
 * An instantiated build provider.
 *
 * @see create-provider.md
 */
export type BuildProvider = {
  getNiceName(): string;
  isEligible(): boolean;
  settings(): BuildTarget[] | Promise<BuildTarget[]>;
  destructor?(): void;
  on?(event: 'refresh', callback: () => void): unknown;
  removeAllListeners?(event: 'refresh'): unknown;
};

/**
 * The constructor a provider package hands to `consumeBuilder`.
 */
export type BuildProviderConstructor = new (cwd: string) => BuildProvider;

/**
 * Per-project-root bookkeeping kept by the target manager.
 */
export type PathTarget = {
  path: string;
  loading: boolean;
  targets: ResolvedBuildTarget[];
  instancedTools: BuildProvider[];
  activeTarget: string | null | undefined;
  tools: BuildProvider[];
  subscriptions: import('atom').CompositeDisposable;
};

export type BusyProvider = {
  add(title: string, options?: unknown): void;
  remove(title: string, success?: boolean): void;
};
