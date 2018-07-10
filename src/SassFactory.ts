import { buildContext } from './interop/context';
import { getVersion } from './interop/miscellaneous';

/**
 * Interface to factory object loaded via `loadModule`,
 * provides interop interface to libsass functions.
 */
interface SassFactory {
  getVersion: ReturnType<typeof getVersion>;
  context: ReturnType<typeof buildContext>;
}

export { SassFactory };
