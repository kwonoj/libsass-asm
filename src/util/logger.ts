import { enableLogger as emscriptenEnableLogger } from 'emscripten-wasm-loader';
type logFunctionType = (message: string, ...optionalParams: Array<any>) => void;
/**
 * Default log instance falls back to noop if not specified.
 */
let logInstance: logFunctionType = () => {
  /* noop */
};

const log: logFunctionType = (...args: Array<any>) => (logInstance as any)(...args);

/**
 * Enables logging internal behavior of libsass-asm.
 * @param logger function to log.
 */
const enableLogger = (logger: logFunctionType) => {
  const scopedLogger = (scope: string) => (message: string, ...optionalParams: Array<any>) => {
    logger(`${scope}::${message}`, ...optionalParams);
  };

  logInstance = scopedLogger(`libsass`);
  emscriptenEnableLogger(scopedLogger(`libsassLoader`));
};

export { enableLogger, logFunctionType, log };
