import fs from 'fs';
import meta from '../package.json';
import path from 'path';

function uniquifySettings(settings) {
  const genName = (name, index) => `${name} - ${index}`;
  const newSettings = [];
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

function activePath() {
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
    .sort((a, b) => b.length - a.length)
    .find(async (p) => {
      try {
        const realpath = await fs.promises.realpath(p);
        return (await fs.promises.realpath(textEditor.getPath()).substr(0, realpath.length)) === realpath;
      } catch (err) {
        /* Path no longer available. Possible network volume has gone down */
        return false;
      }
    });
}

function getDefaultSettings(cwd, setting) {
  return Object.assign({}, setting, {
    env: setting.env || {},
    args: setting.args || [],
    cwd: setting.cwd || cwd,
    sh: undefined === setting.sh ? true : setting.sh,
    errorMatch: setting.errorMatch || ''
  });
}

function replace(value = '', targetEnv) {
  if (!(typeof value === 'string')) {
    return value;
  }

  const env = Object.assign({}, process.env, targetEnv);
  value = value.replace(/\$(\w+)/g, function (match, name) {
    return name in env ? env[name] : match;
  });

  const editor = atom.workspace.getActiveTextEditor();

  const projectPaths = atom.project.getPaths().map(async (projectPath) => {
    try {
      return await fs.promises.realpath(projectPath);
    } catch (e) {
      /* Do nothing. */
    }
    return null;
  });

  let projectPath = projectPaths[0];
  if (editor && undefined !== editor.getPath()) {
    const activeFile = fs.realpathSync(editor.getPath());
    const activeFilePath = path.dirname(activeFile);
    projectPath = projectPaths.find((p) => activeFilePath && activeFilePath.startsWith(p));
    value = value.replace(/{FILE_ACTIVE}/g, activeFile);
    value = value.replace(/{FILE_ACTIVE_PATH}/g, activeFilePath);
    value = value.replace(/{FILE_ACTIVE_NAME}/g, path.basename(activeFile));
    value = value.replace(/{FILE_ACTIVE_NAME_BASE}/g, path.basename(activeFile, path.extname(activeFile)));
    value = value.replace(/{SELECTION}/g, editor.getSelectedText());
    const cursorScreenPosition = editor.getCursorScreenPosition();
    value = value.replace(/{FILE_ACTIVE_CURSOR_ROW}/g, cursorScreenPosition.row + 1);
    value = value.replace(/{FILE_ACTIVE_CURSOR_COLUMN}/g, cursorScreenPosition.column + 1);
  }
  value = value.replace(/{PROJECT_PATH}/g, projectPath);
  if (atom.project.getRepositories[0]) {
    value = value.replace(/{REPO_BRANCH_SHORT}/g, atom.project.getRepositories()[0].getShortHead());
  }

  return value;
}

function capitalizedName() {
  return `${meta.name.charAt(0).toUpperCase()}${meta.name.slice(1)}`;
}

function getVersion() {
  return `v${meta.version}`;
}

export { uniquifySettings, activePath, getDefaultSettings, replace, capitalizedName, getVersion };
