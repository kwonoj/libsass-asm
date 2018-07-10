#!/usr/bin/env node
import chalk from 'chalk';
import * as commandLineArgs from 'command-line-args';
import { OutputStyle } from './index';
import './verbose';

const styleOptions = ['nested', 'expanded', 'compact', 'compressed'];
/**
 * Definitions of available command line args.
 */
const optionDefinitions = [
  { name: 'stdin', alias: 's', description: 'Read input from standard input instead of an input file.' },
  {
    name: 'style',
    alias: 't',
    description: `Output style. Can be: ${styleOptions.join(', ')}.`
  },
  { name: 'line-numbers', alias: 'l', description: 'Emit comments showing original line numbers.' },
  { name: 'load-path', alias: 'I', description: 'Set Sass import path.' },
  { name: 'plugin-path', alias: 'P', description: 'Set path to autoload plugins.' },
  { name: 'sourcemap', alias: 'm', description: 'Emit source map (auto or inline).' },
  { name: 'omit-map-comment', alias: 'M', description: 'Omits the source map url comment.' },
  { name: 'precision', alias: 'p', description: 'Set the precision for numbers.' },
  { name: 'sass', alias: 'a', description: 'Treat input as indented syntax.' },
  { name: 'version', alias: 'v', description: 'Display compiled versions.', type: Boolean },
  { name: 'help', alias: 'h', description: 'Display this help message.', type: Boolean }
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

(async () => {
  const options = commandLineArgs(optionDefinitions, { camelCase: true });
  const displayHelp = options.help || Object.keys(options).length === 0;
  const displayVersion = options.version;

  if (displayHelp || displayVersion) {
    const cmdUsage = await import('command-line-usage');
    const usageDefinition = displayHelp ? helpDefinitions : await buildDisplayVersion();
    const usage = cmdUsage([...usageDefinition]);
    console.log(usage);
    return;
  }

  const { loadModule } = await import('./loadModule');
  const { context } = await loadModule();
  const sassOption = context.options.create();
  sassOption.outputStyle = OutputStyle.SASS_STYLE_NESTED;
  sassOption.precision = 5;

  sassOption.dispose();
})();
