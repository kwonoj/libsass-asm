#!/usr/bin/env node
import chalk from 'chalk';
import * as commandLineArgs from 'command-line-args';
import * as debug from 'debug';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { OutputStyle } from './index';
import { buildContext } from './interop/context';
import { SassContextInterface } from './interop/file/sassContext';
import { SassOptionsInterface } from './interop/options/sassOptions';
import { SassFactory } from './SassFactory';
import './verbose';

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
  outFile: string | undefined
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
  outputPath: string | undefined,
  sourceMapFile: string | undefined
) => {
  const { errorStatus, errorMessage, outputString, sourceMapString } = context;

  const write = async (outputPath: string, content: string) => {
    if (errorStatus > 0) {
      console.log(errorMessage || `An error occurred; no error message available.\n`);
      return 1;
    }
    try {
      await util.promisify(fs.writeFile)(outputPath, content, 'utf-8');
      console.log(content);
      return 0;
    } catch (e) {
      console.log(`Filed to write output to ${outputPath}`, { e });
      return 2;
    }
  };

  if (outputPath) {
    const outputResult = await write(outputPath, outputString);
    if (outputResult === 0 && sourceMapFile) {
      return await write(sourceMapFile, sourceMapString);
    }
    return outputResult;
  }
  return 1;
};

const compileStdin = (..._args: Array<any>) => {
  return -1;
};

const compile = async (
  factory: SassFactory,
  options: SassOptionsInterface,
  inputPath: string,
  outputPath: string | undefined
) => {
  const { interop, context } = factory;
  const mountedPath = [inputPath, outputPath]
    .filter(x => !!x)
    .map(p => path.dirname(p!))
    .map(dir => {
      d(`mount directory '${dir}'`);
      return interop.mount(dir);
    });

  if (!!outputPath) {
    options.outputPath = outputPath;
  }

  const sourceMapFile = options.sourceMapFile;
  options.inputPath = inputPath;
  const fileContext = context.file.create(inputPath);
  const sassContext = fileContext.getContext();
  fileContext.options = options;
  fileContext.compile();

  const result = await writeCompileResult(sassContext, outputPath, sourceMapFile);

  mountedPath.forEach(dir => {
    interop.unmount(dir);
    d(`unmount directory '${dir}'`);
  });

  fileContext.dispose();

  return result;
};

const main = async (argv: Array<string> = process.argv) => {
  const options = commandLineArgs(optionDefinitions, { argv, camelCase: true });
  const displayHelp = options.help || Object.keys(options).length === 0;
  const displayVersion = options.version;

  d(`Received options`, { options });
  if (displayHelp || displayVersion) {
    const cmdUsage = await import('command-line-usage');
    const usageDefinition = displayHelp ? helpDefinitions : await buildDisplayVersion();
    const usage = cmdUsage([...usageDefinition]);
    console.log(usage);
    return;
  }

  const { loadModule } = await import('./loadModule');
  const factory = await loadModule();
  const files: Array<string> = options.files || [];
  if (files.length > 2) {
    throw new Error(`Unexpected arguments provided, '${files.slice(2)}'`);
  }

  const [inputPath, outputPath] = files;
  const sassOption = buildSassOption(factory.context, options, outputPath);
  const result = options.stdin
    ? compileStdin(factory, sassOption, outputPath)
    : await compile(factory, sassOption, inputPath, outputPath);

  sassOption.dispose();
  process.exit(result);
};

(async () => {
  try {
    await main();
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
})();

export { main };
