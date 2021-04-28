# buildium

> Build your current project, directly from Atom

[![apm](https://flat.badgen.net/apm/license/buildium)](https://atom.io/packages/buildium)
[![apm](https://flat.badgen.net/apm/v/buildium)](https://atom.io/packages/buildium)
[![apm](https://flat.badgen.net/apm/dl/buildium)](https://atom.io/packages/buildium)
[![David](https://flat.badgen.net/david/dep/idleberg/atom-buildium)](https://david-dm.org/idleberg/atom-buildium)

This package is a fork of `build`, with a few key-differences:

- no user tracking
- deferred package activation
- support for JSON build-files with comments
- support for TOML build-files
- improved visual integration
- updated dependencies

## Installation

### apm

Install `buildium` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install buildium`

### Using Git

Change to your Atom packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.atom\packages
```

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.atom\packages
```

**Linux & macOS**

```bash
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

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)
