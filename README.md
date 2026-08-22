# buildium

> Build your current project, directly from Pulsar

[![License](https://img.shields.io/github/license/atom-community/buildium?color=blue&style=for-the-badge)](https://github.com/atom-community/buildium/blob/master/LICENSE)
[![Release](https://img.shields.io/github/v/release/atom-community/buildium?style=for-the-badge)](https://github.com/atom-community/buildium/releases)
[![Downloads](https://img.shields.io/pulsar/dt/language-nsis?style=for-the-badge&color=slateblue)](https://web.pulsar-edit.dev/packages/language-nsis)

This package is a fork of `build`, with a few key-differences:

- it does not track your usage behaviour
- it defers activation
- it supports many types of build files
- it uses xterm as terminal
- it integrates naturally into visual language
- it's written in TypeScript
- it uses Svelte for UI
- it updates regularly

## Installation

### ppm

Install `buildium` from Pulsar's [Package Manager](https://docs.pulsar-edit.dev/using-pulsar/packages/#command-line) or the command-line equivalent:

`$ ppm install buildium`

### Using Git

Change to your Pulsar packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.pulsar\packages
```

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.pulsar\packages
```

**Linux & macOS**

```bash
$ cd ~/.pulsar/packages/
```

Clone repository as `buildium`:

```bash
$ git clone https://github.com/idleberg/atom-buildium buildium
```

Inside the cloned directory, install dependencies using your preferred Node package manager:

```bash
$ ppm install
```

## Usage

### Build Providers

This package provides services that ”build providers” can consume, it provides no functionality to build the code. In order to build, you will need to install additional packages. See the [list of build providers][build-providers] for registered packages or search the [packages website][packages].

### Build Files

If no provider suits your specific needs, you can create a build file in your project folder. A variety of file formats is supported, they need to match any of the following names:

- `package.json` with `buildium` object
- `buildium.config.cjs`
- `buildium.config.js`
- `buildium.config.json`
- `buildium.config.json5`
- `buildium.config.jsonc`
- `buildium.config.toml`
- `buildium.config.pkl`
- `buildium.config.yaml`
- `buildium.config.yml`
- `.buildium.cjs`
- `.buildium.js`
- `.buildium.json`
- `.buildium.json5`
- `.buildium.jsonc`
- `.buildium.toml`
- `.buildium.pkl`
- `.buildium.yaml`
- `.buildium.yml`

**Note:** The configurations above are listed in order of precedence

<details>
<summary><strong>Example</strong></summary>️

Let's take a look at a build file written in YAML

```yaml
cmd: '<command to execute>'
name: '<name of target>'
args:
  - '<argument1>'
  - '<argument2>'
sh: true
cwd: '<current working directory for `cmd`>'
env:
  VARIABLE1: 'VALUE1'
  VARIABLE2: 'VALUE2'
errorMatch:
  - ^regexp1$
  - ^regexp2$
warningMatch:
  - ^regexp1$
  - ^regexp2$
keymap: '<keymap string>'
atomCommandName: 'namespace:command'
targets:
  extraTargetName:
    cmd: '<command to execute>'
    args:
    # (any previous options are viable here except `targets` itself)
```

</details>

#### Configuration Options

| Option            | Type                        | Description                                                                                                                                                                                                                                       |
| ----------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cmd`             | `string`                    | The executable command                                                                                                                                                                                                                            |
| `name`            | `string?`                   | The name of the target, shown in the targets list (toggled by `buildium:select-active-target`)                                                                                                                                                    |
| `args`            | `string[]?`                 | An array of arguments for the command                                                                                                                                                                                                             |
| `sh`              | `boolean?`                  | If `true`, the combined command and arguments are passed to `/bin/sh`. Defaults to `true`.                                                                                                                                                        |
| `cwd`             | `string?`                   | The working directory for the command, i.e. what `.` resolves to                                                                                                                                                                                  |
| `env`             | `Record<string, string>?`   | An object of environment variables and their values to set                                                                                                                                                                                        |
| `errorMatch`      | `(string \| string[])?`     | A regular expression, or list thereof, matching output to a file, row and col. See [error matching][error-match] for details.                                                                                                                     |
| `warningMatch`    | `(string \| string[])?`     | Like `errorMatch`, but reported as just a warning                                                                                                                                                                                                 |
| `functionMatch`   | `(Function \| Function[])?` | **JS only**. A function, or list thereof, that returns a list of match objects                                                                                                                                                                    |
| `keymap`          | `string?`                   | A [keymap string][keymaps], e.g. `ctrl-alt-k` or `cmd-U`. Pressing this key combination triggers the target.                                                                                                                                      |
| `killSignals`     | `string[]?`                 | An array of signals, sent one after each time <kbd>Esc</kbd> is pressed until the process has terminated. Defaults to `SIGINT` → `SIGTERM` → `SIGKILL`; only `SIGKILL` is guaranteed to terminate the process, so it's recommended to include it. |
| `atomCommandName` | `string?`                   | A command name of the form `namespace:command`, registered on the [command registry][command-registry]. It becomes available in the command palette and can be triggered from there.                                                              |
| `targets`         | `Record<string, Target>?`   | Additional targets to build variations of your project. Any of the options above are viable here, except `targets` itself.                                                                                                                        |
| `preBuild`        | `Function?`                 | **JS only**. Called _before_ executing `cmd`, with no arguments. `this` is the build configuration.                                                                                                                                               |
| `postBuild`       | `Function?`                 | **JS only**. Called _after_ executing `cmd`, with three arguments: `boolean buildOutcome`, `string stdout` and `string stderr`. `this` is the build configuration.                                                                                |

**Note:** A `?` suffix marks an optional value. `errorMatch`, `warningMatch` and `functionMatch` are individually optional, but at least one of them is needed to report build failures.

#### Replacements

The following parameters will be replaced in `cmd`, any entry in `args`, `cwd` and values of `env`. They should all be enclosed in curly brackets.

| Placeholder                   | Description                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| `{FILE_ACTIVE}`               | Full path to the active file, e.g. `~/github/atom-build/lib/build.js`                |
| `{FILE_ACTIVE_PATH}`          | Full path to the parent folder of the active file is, e.g. `~/github/atom-build/lib` |
| `{FILE_ACTIVE_NAME}`          | Full name and extension of the active file, e.g. `buildium.js`                       |
| `{FILE_ACTIVE_NAME_BASE}`     | Base name of the active file, e.g. `build`                                           |
| `{FILE_ACTIVE_CURSOR_ROW}`    | Line number of the last cursor sits in the active document                           |
| `{FILE_ACTIVE_CURSOR_COLUMN}` | Column number of the last cursor sits in the active document                         |
| `{PROJECT_PATH}`              | Full path to project folder, e.g. `~/github/atom-build`                              |
| `{REPO_BRANCH_SHORT}`         | Name of the active Git branch, e.g. `main`                                           |
| `{SELECTION}`                 | Selected text in the active document                                                 |

### Keybindings

The following keybindings are for Windows and Linux, Mac should use <kbd>Cmd</kbd> instead of <kbd>Ctrl</kbd>

| Placeholder                                                                   | Description                                 |
| ----------------------------------------------------------------------------- | ------------------------------------------- |
| <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or <kbd>F9</kbd>                  | Builds your project                         |
| <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>G</kbd> or <kbd>F4</kbd>                  | Steps through build errors                  |
| <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>H</kbd> or <kbd>Shift</kbd>+<kbd>F4</kbd> | Steps to the first build error              |
| <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> or <kbd>F8</kbd>                  | Toggles the build panel                     |
| <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> or <kbd>F7</kbd>                  | Show available build targets                |
| <kdb>Esc</kdb>                                                                | Terminates build and closes the build panel |

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT).

[build-providers]: https://atombuild.github.io/
[packages]: https://packages.pulsar-edit.dev/packages/search?q=buildprovider
[error-match]: https://github.com/noseglid/atom-build#error-match
[keymaps]: https://docs.pulsar-edit.dev/infrastructure/keymaps-in-depth/
[command-registry]: https://docs.pulsar-edit.dev/api/pulsar/latest/CommandRegistry/
