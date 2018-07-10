/** side effect module to enable few verbose logging */
/* tslint:disable:no-var-requires no-require-imports */
if (!!process.env.DEBUG) {
  require('source-map-support').install();
  const { log, enableLogger } = require('./util/logger');
  enableLogger(require('debug')('libsass:logger'));
  log('Enabling verbose log');
}
