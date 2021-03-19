# buildium

> Build your current project, directly from Atom

[![apm](https://flat.badgen.net/apm/license/buildium)](https://atom.io/packages/buildium)
[![apm](https://flat.badgen.net/apm/v/buildium)](https://atom.io/packages/buildium)
[![apm](https://flat.badgen.net/apm/dl/buildium)](https://atom.io/packages/buildium)
[![David](https://flat.badgen.net/david/dep/idleberg/atom-buildium)](https://david-dm.org/idleberg/atom-buildium)

This package is a fork of `build`, with a few key-differences:

- removed user Google Analytics tracking
- deferred package activation
- support for JSON build-files with comments
- updated dependencies

**Note:** Support for JavaScript build-files has been removed, but will hopefully come back in a future iteration

## Installation

### apm

Install `buildium` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install buildium`

### Using Git

Change to your Atom packages directory:

```powershell
# Windows Powershell
cd $Env:USERPROFILE\.atom\packages

# Windows Command Prompt
$ cd %USERPROFILE%\.atom\packages
```

```bash
# Linux & macOS
$ cd ~/.atom/packages/
```

Clone repository as `buildium`:

```bash
$ git clone https://github.com/idleberg/atom-buildium buildium
```

Inside the cloned directory, install dependencies using your preferred Node package manager:

```bash
$ yarn || npm install
```

## Usage

Please refer to the original [README](https://github.com/noseglid/atom-build#readme) for details.

## License

This work is dual-licensed under [The MIT License](https://opensource.org/licenses/MIT)
