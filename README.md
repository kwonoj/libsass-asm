[![CircleCI](https://circleci.com/gh/kwonoj/libsass-asm/tree/master.svg?style=svg)](https://circleci.com/gh/kwonoj/libsass-asm/tree/master)
[![npm](https://badgen.now.sh/npm/v/libsass-asm)](https://badgen.now.sh/npm/v/libsass-asm)
[![node](https://badgen.now.sh/badge/node/%3E%3D8.0)](https://www.npmjs.com/package/libsass-asm)

# libsass-asm

`libsass-asm` is javascript binding to [libsass](https://github.com/sass/libsass) based on WebAssembly libsass binary. This module aims to provide transparent binding to libsass without requiring native modules, to serve as building blocks for tools.

- Node.js only
: `libsass-asm` intended to be used for node.js based toolchains.
- Native WebAssembly binary
: Does not provide fallbacks for old version support, works only on node.js supports native web assembly.
- Transparent binding to libsass interface : Provides 1:1 corresponding interfaces to libsass, furthermore exposes raw interface to libsass itself.

# Install

```sh
npm install libsass-asm
```

# Usage

## Using libsass interface
`libsass-asm` relies on wasm binary of libsass, which need to be initialized first.

```ts
import { loadModule } from 'libsass-asm';

const sassFactory: SassFactory = await loadModule();
```

`loadModule` loads wasm binary, initialize it, and returns [factory object](https://github.com/kwonoj/libsass-asm/blob/master/src/SassFactory.ts) to create instance of sass interface class. Factory object provide static creation method for each sass* interfaces, for example you can create class to handle sass_options* interface via

```ts
const sassOptions: SassOptionsInterface = sassFactory.options.create();
```

then via `sassOptions` object can invoke sass_options* interface.

*Snippet of `SassOptionsInterface`*
```ts
interface SassOptionsInterface {
  ...
  /**
   * Property accessor to `sass_option_(get|set)_precision`
   */
  precision: number;

  /**
   * Property accessor to `sass_option_(get|set)_output_style`
   */
  outputStyle: OutputStyle;

  /**
   * Property accessor to `sass_option_(get|set)_source_comments`
   */
  sourceComments: boolean;

  /**
   * Property accessor to `sass_option_(get|set)_is_indented_syntax_src`
   */
  isIndentedSyntaxSrc: boolean;

  /**
   * Property accessor to `sass_option_(get|set)_omit_source_map_url`
   */
  omitMapComment: boolean;
  ...
}
```

## Mounting files
WebAssembly binary's memory space is separately allocated and cannot use node.js's filesystem access directly. To support it `libsass-asm` exposes few interfaces interop physical file via `SassFactory::interop` object.

- `mount(dirPath: string): string` : mount physical path. Once directory is mounted libsass can read all files under mounted path. Returns `virtual` path to mounted path.
- `unmount(mountedFilePath: string): void` : Unmount path if it's mounted.

All of `virtual` paths for mounted filesystem uses unix separator regardless of platform.

Note when setting options for libsass, it should be mounted path instead of physical path since libsass will try to read via mounted path only.

```ts
const inputFile = path.resolve('./input.scss');
const mountedPath = sassFactory.interop.mount('./');

const sassOptions: SassOptionsInterface = sassFactory.options.create();

sassOptions.inputPath = inputFile; //this will fail!
sassOptions.inputPath = unixify(path.join(mountedPath, 'input.scss'));
```

If input file have import paths, those paths should be mounted as well.

## Using libsass interface without class factory (advanced)
Most of sass_* bindings in `SassFactory` are written in ES classes. If you prefer to directly deal with C api style of libsass instead you can use `SassFactory::raw` object. `libsass-asm` internally contains wrapped function to call libsass functions in javascript, raw object exposes it directly.

```ts
const { raw } = await loadModule();

//calling `struct Sass_Options* sass_make_options (void);`
const sassOptionPtr: number = raw.context.make_options();
```

As written in above snippet, those interface does not marshall any values but return pointers directly so it have to be dealt with.

## Using cli
In addition to interface to libsass, `libsass-asm` provides cli as well. This is primarily to be used to run [test suite for libsass](https://github.com/sass/sass-spec) but can be used fo other usage as well.

```sh
$ sass -h

Options

  -s, --stdin               Read input from standard input instead of an input file.
  -t, --style               Output style. Can be: nested, expanded, compact, compressed.
  -l, --line-numbers        Emit comments showing original line numbers.
  -I, --load-path           Set Sass import path.
  -P, --plugin-path         Set path to autoload plugins.
  -m, --sourcemap           Emit source map (auto or inline).
  -M, --omit-map-comment    Omits the source map url comment.
  -p, --precision number    Set the precision for numbers.
  -a, --sass                Treat input as indented syntax.
  -v, --version             Display compiled versions.
  -h, --help                Display this help message.
  --files string[]          Specifies files for in order of [INPUT] [OUTPUT]
                            Do not need to explicitly specify --files args
  --root string[]           Top level path where sass inputs are located if there are import paths exist
                            other than input path.

Enabling verbose debug log

  Set 'DEBUG' environment variable to any to enable debug log
  $ DEBUG=* sass ...
```

Command line args interface mostly mirrors [sassc](https://github.com/sass/sassc), one notable difference is providing `root` options to specify which path to mount other than input file's path.

# Building / Testing

Few npm scripts are supported for build / test code.

- `build`: Transpiles code to ES5 commonjs to `dist`.
- `lint`: Run lint over all codebases
- `lint:staged`: Run lint only for staged changes. This'll be executed automatically with precommit hook.
- `commit`: Commit wizard to write commit message

# License

- libsass: [original license](https://github.com/sass/libsass/blob/master/LICENSE)
- libsass-asm: [MIT](https://github.com/kwonoj/libsass-asm/blob/master/LICENSE)

*NOTE: libsass-asm is **NOT** affiliated with official libsass and sass project.*
