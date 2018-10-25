import chalk from 'chalk';
import * as commandLineArgs from 'command-line-args';
import * as debug from 'debug';
import * as fs from 'fs';
import * as path from 'path';
import * as unixify from 'unixify';
import * as util from 'util';
import { OutputStyle } from './index';
import { buildContext } from './interop/context';
import { SassOptionsInterface } from './interop/options/sassOptions';
import { SassContextInterface } from './interop/sassContext';

const d = debug('libsass:cli');
const styleOptions = ['nested', 'expanded', 'compact', 'compressed'];
/**
 * Definitions of available command line args.
 */
const optionDefinitions = [
  { name: 'stdin', alias: 's', description: 'Read input from standard input instead of an input file.', type: Boolean },
  {
    name: 'style',
    alias: 't',
    description: `Output style. Can be: ${styleOptions.join(', ')}.`
  },
  { name: 'line-numbers', alias: 'l', description: 'Emit comments showing original line numbers.', type: Boolean },
  { name: 'load-path', alias: 'I', description: 'Set Sass import path.' },
  { name: 'plugin-path', alias: 'P', description: 'Set path to autoload plugins.' },
  { name: 'sourcemap', alias: 'm', description: 'Emit source map (auto or inline).' },
  { name: 'omit-map-comment', alias: 'M', description: 'Omits the source map url comment.', type: Boolean },
  { name: 'precision', alias: 'p', description: 'Set the precision for numbers.', type: Number },
  { name: 'sass', alias: 'a', description: 'Treat input as indented syntax.', type: Boolean },
  { name: 'version', alias: 'v', description: 'Display compiled versions.', type: Boolean },
  { name: 'help', alias: 'h', description: 'Display this help message.', type: Boolean },
  {
    name: 'files',
    description:
      'Specifies files for in order of [INPUT] [OUTPUT] \n' + `Do not need to explicitly specify --files args`,
    type: String,
    multiple: true,
    defaultOption: true
  },
  {
    name: 'root',
    description: 'Top level path where sass inputs are located if there are import paths exist other than input path.',
    type: String,
    multiple: true
  }
];

/**
 * Definitions of help display for command line options.
 */
const helpDefinitions = [
  { header: chalk.reset('Options'), optionList: optionDefinitions },
  {
    header: chalk.reset('Enabling verbose debug log'),
    content: [`Set 'DEBUG' environment variable to any to enable debug log`, '$ DEBUG=* sass ...']
  }
];

/**
 * Get usage definition for library version.
 *
 */
const buildDisplayVersion = async () => {
  const { loadModule } = await import('./loadModule');
  const sassFactory = await loadModule();
  const { libsassAsm, libsass, sassLang, sass2scss } = await sassFactory.getVersion();

  return [
    {
      header: chalk.reset('Version'),
      content: [
        { name: 'libsass-asm', summary: libsassAsm },
        { name: 'libsass', summary: libsass },
        { name: 'sass', summary: sassLang },
        { name: 'sass2scss', summary: sass2scss }
      ]
    }
  ];
};

/**
 * Construct value of sass option per command line options.
 *
 * @param sassOption
 */
const buildSassOption = (
  context: ReturnType<typeof buildContext>,
  options: commandLineArgs.CommandLineOptions,
  outFile?: string | null
) => {
  const sassOption = context.options.create();
  //Set default values
  sassOption.outputStyle = OutputStyle.SASS_STYLE_NESTED;
  sassOption.precision = 5;

  Object.keys(options)
    .map(key => ({ key, value: options[key] }))
    .forEach(({ key, value }) => {
      d(`Setting sass options for `, { key, value });

      switch (key) {
        case 'stdin':
          break;
        case 'style':
          const style = styleOptions.indexOf(value);
          if (style < 0) {
            throw new Error(`Unexpected value '${value}' for style`);
          }
          sassOption.outputStyle = style;
          break;
        case 'lineNumbers':
          sassOption.sourceComments = true;
          break;
        case 'loadPath':
          sassOption.addIncludePath(value);
          break;
        case 'pluginPath':
          sassOption.addPluginPath(value);
          break;
        case 'sourcemap':
          sassOption.sourceMapEmbed = value === 'inline' || (value === 'auto' && !outFile);
          if (!!outFile && !sassOption.sourceMapEmbed) {
            sassOption.sourceMapFile = `${outFile}.map`;
          }
          d(`Setting source map`, {
            value,
            outFile,
            embed: sassOption.sourceMapEmbed,
            mapFile: sassOption.sourceMapFile
          });
        case 'omitMapComment':
          sassOption.omitMapComment = true;
          break;
        case 'precision':
          sassOption.precision = parseInt(value, 10);
          break;
        case 'sass':
          sassOption.isIndentedSyntaxSrc = true;
          break;
      }
    });

  return sassOption;
};

const writeCompileResult = async (
  context: SassContextInterface,
  outputPath: string | null,
  sourceMapFile?: string | null
) => {
  const { errorStatus, errorMessage, outputString, sourceMapString } = context;

  if (errorStatus > 0) {
    //To conform sass-spec's matcher, explicitly emit via stderr
    process.stderr.write(errorMessage || `An error occurred; no error message available.\n`);
    return 1;
  }

  const write = async (outputPath: string, content: string) => {
    try {
      d(`writeCompileResult: writing file`, { outputPath });
      await util.promisify(fs.writeFile)(outputPath, content, 'utf-8');
      return 0;
    } catch (e) {
      console.error(`Failed to write output to ${outputPath}`, { e });
      return 2;
    }
  };

  if (!outputPath && !!outputString) {
    d(`writeCompileResult: path to output file not specified, print to stdout`);
    console.log(outputString);
  }

  if (!sourceMapFile && !!sourceMapString) {
    d(`writeCompileResult: path to source map file not specified, print to stdout`);
    console.log(sourceMapString);
  }

  if (outputPath) {
    const outputResult = await write(outputPath, outputString);
    d(`writeCompileResult: wrote compilation result`, { outputResult });
    if (outputResult === 0 && sourceMapFile) {
      const sourceMapResult = await write(sourceMapFile, sourceMapString);
      d(`writeCompileResult: wrote source map result`, { sourceMapResult });
      return sourceMapResult;
    }
    return outputResult;
  }

  return errorStatus;
};

const compileStdin = async (
  context: ReturnType<typeof buildContext>,
  options: SassOptionsInterface,
  outputPath: { raw: string; mountedDir: string; mountedFullPath: string }
) => {
  const stdin = await import('get-stdin');
  const { default: defaultExport } = stdin as any;
  const input = await (defaultExport || stdin)();

  const dataContext = context.data.create(input);
  const sassContext = dataContext.getContext();
  dataContext.options = options;

  dataContext.compile();
  const result = await writeCompileResult(sassContext, !!outputPath ? outputPath.raw : null);

  dataContext.dispose();

  return result;
};

const compile = async (
  context: ReturnType<typeof buildContext>,
  options: SassOptionsInterface,
  inputPath: { raw: string; mountedDir: string; mountedFullPath: string },
  outputPath: { raw: string; mountedDir: string; mountedFullPath: string }
) => {
  if (!!outputPath && !!outputPath.mountedFullPath) {
    options.outputPath = outputPath.mountedFullPath;
  }

  const sourceMapFile = options.sourceMapFile;
  options.inputPath = inputPath.mountedFullPath;

  //TODO: do we need to supply mountedpath instead?
  //(sass-spec fails on some test with mounted path, cause output expects physical path instead)
  const fileContext = context.file.create(inputPath.raw);
  const sassContext = fileContext.getContext();
  fileContext.options = options;
  fileContext.compile();

  //writeCompileResult's output path should be raw path instead of mounted virtual, it uses fs.write directly
  const rawOutputPath = !!outputPath ? outputPath.raw : null;
  const rawSourceMapPath = !!rawOutputPath && !!sourceMapFile ? `${rawOutputPath}.map` : null;
  const result = await writeCompileResult(sassContext, rawOutputPath, rawSourceMapPath);

  fileContext.dispose();

  return result;
};

/**
 * NOTE: What is this hack even?
 * for sass-spec it validates output of message which includes input file's path, which libsass-asm
 * doesn't uses but internally wires to virtual mounted path. This leads into test failure -
 * for those in test runner, strip out mounted path to allow spec runner validates test output.
 */
const overrideStdErr = ({ mountedFullPath, raw }: { mountedFullPath: string; raw: string }) => {
  if (!process.env.SASS_SPEC) {
    return;
  }

  d(`overrideStdErr: specified as test runner, strip out mounted path from console output`);

  const root = mountedFullPath.slice(0, mountedFullPath.indexOf(path.resolve(raw)));
  const original = process.stderr.write.bind(process.stderr);
  process.stderr.write = function(arg: string) {
    const replaced = arg.replace(root, '');
    return original(replaced);
  };
};

const main = async (argv: Array<string> = process.argv) => {
  const options = commandLineArgs(optionDefinitions, { argv, camelCase: true });
  const displayHelp = options.help || Object.keys(options).length === 0;
  const displayVersion = options.version;

  d(`Received options`, { options });
  if (displayHelp || displayVersion) {
    const cmdUsage = await import('command-line-usage');
    const { default: defaultExport } = cmdUsage as any;
    const usageDefinition = displayHelp ? helpDefinitions : await buildDisplayVersion();
    const usage = (defaultExport || cmdUsage)([...usageDefinition]);
    console.log(usage);
    return 0;
  }

  const { loadModule } = await import('./loadModule');
  const { context, interop } = await loadModule();
  const files: Array<string> = options.files || [];
  if (files.length > 2) {
    throw new Error(`Unexpected arguments provided, '${files.slice(2)}'`);
  }

  //Mount specified paths
  const additionalMountPath = (Array.isArray(options.root) ? options.root : []).map(x => interop.mount(x));
  const [mountedInput, mountedOutput] = files
    .filter(x => !!x)
    .map(p => ({ raw: p, dir: path.dirname(p!), file: path.basename(p!) }))
    .map(({ raw, dir, file }) => {
      const mountedDir = interop.mount(dir);
      return {
        raw,
        mountedDir: mountedDir,
        mountedFullPath: unixify(path.join(mountedDir, file)) as string
      };
    });

  overrideStdErr(mountedInput);

  const sassOption = buildSassOption(context, options, !!mountedOutput ? mountedOutput.mountedFullPath : undefined);

  const result = options.stdin
    ? await compileStdin(context, sassOption, mountedOutput)
    : await compile(context, sassOption, mountedInput, mountedOutput);

  sassOption.dispose();

  additionalMountPath.forEach(x => interop.unmount(x));
  [mountedInput, mountedOutput]
    .filter(x => !!x)
    .map(({ mountedDir }) => mountedDir)
    .forEach(dir => interop.unmount(dir));

  return result;
};

(async () => {
  try {
    process.exitCode = await main();
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
})();

export { main };
