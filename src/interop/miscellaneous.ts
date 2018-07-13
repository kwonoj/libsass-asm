import { SassAsmModule } from '../SassAsmModule';

//https://github.com/sass/libsass/blob/master/docs/api-doc.md#miscellaneous-api-functions

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

const sassString = (_asmModule: SassAsmModule) => {
  //char* sass_string_unquote (const char* str);
  //char* sass_string_quote (const char* str, const char quote_mark);

  return {
    quote: null,
    unquote: null
  };
};

export { getVersion, sassString };
