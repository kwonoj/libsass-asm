/**
 * Interface to factory object loaded via `loadModule`,
 * provides interop interface to libsass functions.
 */
interface SassFactory {
  getVersion: () => Promise<{
    libsassAsm: string;
    libsass: string;
    sassLang: string;
    sass2scss: string;
  }>;
}

export { SassFactory };
