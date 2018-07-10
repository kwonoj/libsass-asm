import { SassAsmModule } from '../SassAsmModule';

/**
 * Creates function to read versions of library.
 * @param asmModule
 */
const getVersion = (asmModule: SassAsmModule) => async () => {
  const { stackSave, stackRestore, Pointer_stringify } = asmModule;
  //version functions doesn't need param type conversion, call directly without cwrap
  const { _libsass_version, _libsass_language_version, _sass2scss_version } = asmModule;

  const { version } = await import('../../package.json');
  const stack = stackSave();
  const ret = {
    libsassAsm: version,
    libsass: Pointer_stringify(_libsass_version()),
    sassLang: Pointer_stringify(_libsass_language_version()),
    sass2scss: Pointer_stringify(_sass2scss_version())
  };
  stackRestore(stack);
  return ret;
};

export { getVersion };
