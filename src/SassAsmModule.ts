import { BaseAsmModule } from 'emscripten-wasm-loader';

/**
 * @internal
 *
 * libsass functions exported via EXPORTED_FUNCTIONS,
 * scope: Miscellaneous(https://github.com/sass/libsass/blob/master/docs/api-doc.md#miscellaneous-api-functions)
 */
interface SassAsmModule extends Required<BaseAsmModule> {
  _libsass_version: () => number;
  _libsass_language_version: () => number;
  _sass2scss_version: () => number;
  addFunction: (fn: Function) => number;
  removeFunction: (fnPtr: number) => void;
}

export { SassAsmModule };
