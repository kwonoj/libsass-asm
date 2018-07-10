#!/usr/bin/env node
import chalk from 'chalk';
import * as commandLineArgs from 'command-line-args';

/**
 * Supported output style. Mirrors `style_option_strings[]` in sassc
 * (https://github.com/sass/sassc/blob/6a64d0569205bfcf0794a473f97affcb60b22fcc/sassc.c#L184-L189)
 */
enum StyleOption {
  SASS_STYLE_COMPRESSED = 'compressed',
  SASS_STYLE_COMPACT = 'compact',
  SASS_STYLE_EXPANDED = 'expanded',
  SASS_STYLE_NESTED = 'nested'
}

/**
 * Definitions of available command line args.
 */
const optionDefinitions = [
  { name: 'stdin', alias: 's', description: 'Read input from standard input instead of an input file.' },
  {
    name: 'style',
    alias: 't',
    description: `Output style. Can be: ${(Object as any).values(StyleOption).join(', ')}.`
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
 * Get usage definition for library version.
 *
 */
const buildDisplayVersion = async () => {
  const { loadModule } = await import('./loadModule');
  const sassFactory = await loadModule();
  const { libsassAsm, libsass, sassLang, sass2scss } = await sassFactory.getVersion();

  return {
    header: chalk.reset('Version'),
    content: [
      { name: 'libsass-asm', summary: libsassAsm },
      { name: 'libsass', summary: libsass },
      { name: 'sass', summary: sassLang },
      { name: 'sass2scss', summary: sass2scss }
    ]
  };
};

(async () => {
  const options = commandLineArgs(optionDefinitions, { camelCase: true });

  const displayHelp = options.help || Object.keys(options).length === 0;
  const displayVersion = options.version;

  if (displayHelp || displayVersion) {
    const cmdUsage = await import('command-line-usage');
    const usageDefinition = displayHelp
      ? { header: chalk.reset('Options'), optionList: optionDefinitions }
      : await buildDisplayVersion();
    const usage = cmdUsage([usageDefinition]);
    console.log(usage);
    return;
  }
})();
