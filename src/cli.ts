#!/usr/bin/env node
import * as commandLineArgs from 'command-line-args';

enum StyleOption {
  SASS_STYLE_COMPRESSED = 'compressed',
  SASS_STYLE_COMPACT = 'compact',
  SASS_STYLE_EXPANDED = 'expanded',
  SASS_STYLE_NESTED = 'nested'
}

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
  { name: 'version', alias: 'v', description: 'Display compiled versions.' },
  { name: 'help', alias: 'h', description: 'Display this help message.', type: Boolean }
];

(async () => {
  const options = commandLineArgs(optionDefinitions, { camelCase: true });

  if (options.help || Object.keys(options).length === 0) {
    const commandLineUsage = await import('command-line-usage');
    const usage = commandLineUsage([{ header: 'Options', optionList: optionDefinitions }]);
    console.log(usage);
  } else if (options.version) {
    return;
  }
})();
