import fs from 'fs';
import path from 'path';
import { name, version } from '../package.json';
import type { BuildTarget, ResolvedBuildTarget } from './types.ts';

const genName = (base: string, index: number) => `${base} - ${index}`;

function uniquifySettings<T extends BuildTarget>(settings: T[]): T[] {
  const newSettings: T[] = [];

  settings.forEach((setting) => {
    let i = 0;
    let testName = setting.name;

    while (newSettings.find((ns) => ns.name === testName)) {
      testName = genName(setting.name, ++i);
    }

    newSettings.push({ ...setting, name: testName });
  });

  return newSettings;
}

function activePath(): string | false | undefined {
  const textEditor = atom.workspace.getActiveTextEditor();

  if (!textEditor || !textEditor.getPath()) {
    /* default to building the first one if no editor is active */
    if (0 === atom.project.getPaths().length) {
      return false;
    }

    return atom.project.getPaths()[0];
  }

  /* otherwise, build the one in the root of the active editor */
  return atom.project
    .getPaths()
    .toSorted((a, b) => b.length - a.length)
    .find((p) => {
      try {
        const realpath = fs.realpathSync(p);
        return fs.realpathSync(textEditor.getPath() as string).substr(0, realpath.length) === realpath;
      } catch {
        /* Path no longer available. Possible network volume has gone down */
        return false;
      }
    });
}

function getDefaultSettings(cwd: string, setting: BuildTarget): ResolvedBuildTarget {
  return {
    ...setting,
    env: setting.env || {},
    args: setting.args || [],
    cwd: setting.cwd || cwd,
    sh: undefined === setting.sh ? true : setting.sh,
    errorMatch: setting.errorMatch || ''
  };
}

function replace(value: string | undefined = '', targetEnv?: Record<string, string>): string {
  if (typeof value !== 'string') {
    return value;
  }

  const env: Record<string, string | undefined> = { ...process.env, ...targetEnv };

  let result = value.replace(/\$(\w+)/g, (match, variable: string) => (variable in env ? (env[variable] as string) : match));

  const editor = atom.workspace.getActiveTextEditor();

  const projectPaths = atom.project.getPaths().map((projectPath) => {
    try {
      return fs.realpathSync(projectPath);
    } catch {
      /* Path no longer available. Possibly a network volume has gone down. */
      return null;
    }
  });

  let projectPath = projectPaths[0];
  const editorPath = editor?.getPath();

  if (editor && editorPath) {
    const activeFile = fs.realpathSync(editorPath);
    const activeFilePath = path.dirname(activeFile);

    projectPath = projectPaths.find((p) => p !== null && activeFilePath.startsWith(p)) ?? projectPath;

    const cursorScreenPosition = editor.getCursorScreenPosition();

    result = result
      .replace(/{FILE_ACTIVE}/g, activeFile)
      .replace(/{FILE_ACTIVE_PATH}/g, activeFilePath)
      .replace(/{FILE_ACTIVE_NAME}/g, path.basename(activeFile))
      .replace(/{FILE_ACTIVE_NAME_BASE}/g, path.basename(activeFile, path.extname(activeFile)))
      .replace(/{SELECTION}/g, editor.getSelectedText())
      .replace(/{FILE_ACTIVE_CURSOR_ROW}/g, String(cursorScreenPosition.row + 1))
      .replace(/{FILE_ACTIVE_CURSOR_COLUMN}/g, String(cursorScreenPosition.column + 1));
  }

  result = result.replace(/{PROJECT_PATH}/g, projectPath ?? '');

  const repository = atom.project.getRepositories()[0];

  if (repository) {
    result = result.replace(/{REPO_BRANCH_SHORT}/g, repository.getShortHead());
  }

  return result;
}

function capitalizedName(): string {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

function getVersion(): string {
  return `v${version}`;
}

/**
 * Every file name that can produce build targets, in order of precedence — the
 * order documented in the readme, and the order cosmiconfig searches.
 *
 * This is the single source of truth for two things that must not drift apart:
 * which files `atom-build.ts` reads, and which files `build-file-watcher.ts`
 * refreshes on. `package.json` only counts when it carries a `buildium` object;
 * cosmiconfig enforces that through `packageProp`.
 */
const buildFileNames = [
  'package.json',
  'buildium.config.cts',
  'buildium.config.mts',
  'buildium.config.ts',
  'buildium.config.cjs',
  'buildium.config.mjs',
  'buildium.config.js',
  'buildium.config.json',
  'buildium.config.json5',
  'buildium.config.jsonc',
  'buildium.config.toml',
  'buildium.config.pkl',
  'buildium.config.yaml',
  'buildium.config.yml',
  '.buildium.cts',
  '.buildium.mts',
  '.buildium.ts',
  '.buildium.cjs',
  '.buildium.mjs',
  '.buildium.js',
  '.buildium.json',
  '.buildium.json5',
  '.buildium.jsonc',
  '.buildium.toml',
  '.buildium.pkl',
  '.buildium.yaml',
  '.buildium.yml',

  // Deprecated
  'atom-build.config.cjs',
  'atom-build.config.js',
  'atom-build.config.json',
  'atom-build.config.json5',
  'atom-build.config.jsonc',
  'atom-build.config.toml',
  'atom-build.config.pkl',
  'atom-build.config.yaml',
  'atom-build.config.yml',
  '.atom-build.cjs',
  '.atom-build.js',
  '.atom-build.json',
  '.atom-build.json5',
  '.atom-build.jsonc',
  '.atom-build.toml',
  '.atom-build.pkl',
  '.atom-build.yaml',
  '.atom-build.yml'
];

/**
 * How a legacy name maps to its current equivalent. Both shapes survived the
 * rename, so the shape is preserved: a dotfile stays a dotfile, and a
 * `*.config.*` file keeps that form.
 */
const legacyNameReplacements: [prefix: string, replacement: string][] = [
  ['atom-build.config.', 'buildium.config.'],
  ['.atom-build.', '.buildium.']
];

/**
 * The current name a legacy build file should be renamed to, or `undefined` if
 * the name is not a legacy one. The extension is left alone, so the same
 * cosmiconfig loader keeps applying.
 */
function modernBuildFileName(baseName: string): string | undefined {
  const replacement = legacyNameReplacements.find(([prefix]) => baseName.startsWith(prefix));

  return replacement ? `${replacement[1]}${baseName.slice(replacement[0].length)}` : undefined;
}

/**
 * The subset valid as a home-directory fallback, which applies to every
 * project. `package.json` is excluded deliberately: a `~/package.json` is
 * usually an accident of running `npm init` in the wrong directory, and letting
 * one silently supply build targets to every project would be surprising.
 */
const homeBuildFileNames = buildFileNames.filter((file) => file !== 'package.json');

export { uniquifySettings, activePath, getDefaultSettings, replace, capitalizedName, getVersion, buildFileNames, modernBuildFileName, homeBuildFileNames };
