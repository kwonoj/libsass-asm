/**
 * side effect module to enable few verbose logging.
 * This is actual entry point to cli, loads necessary modules up front.
 */
/* tslint:disable:no-var-requires no-require-imports */
require('v8-compile-cache');

if (!!process.env.DEBUG) {
  require('source-map-support').install();
  const { log, enableLogger } = require('./util/logger');
  enableLogger(require('debug')('libsass:logger'));
  log('Enabling verbose log');
}

require('./cli');
