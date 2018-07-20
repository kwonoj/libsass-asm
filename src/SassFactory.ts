import { buildContext } from './interop/context';
import { buildImporter } from './interop/importer';
import { wrapSassImporter } from './interop/importer/wrapSassImporter';
import { buildInteropUtility } from './interop/interopUtility';
import { getVersion } from './interop/miscellaneous';
import { wrapSassOptions } from './interop/options/wrapSassOptions';
import { wrapSassContext } from './interop/wrapSassContext';

/**
 * Interface to factory object loaded via `loadModule`,
 * provides interop interface to libsass functions.
 */
interface SassFactory {
  /**
   * Wrapped interface to getting version of libsass and others (language version, etcs)
   */
  getVersion: ReturnType<typeof getVersion>;
  /**
   * Creation method to context api
   */
  context: ReturnType<typeof buildContext>;
  /**
   * Create method to importer api
   */
  importer: ReturnType<typeof buildImporter>;
  /**
   * utility functions to interop raw libsass interface
   */
  interop: ReturnType<typeof buildInteropUtility>;
  /**
   * raw libsass api wrapped via cwrap
   */
  raw: {
    context: ReturnType<typeof wrapSassContext>;
    options: ReturnType<typeof wrapSassOptions>;
    importer: ReturnType<typeof wrapSassImporter>;
  };
}

export { SassFactory };
