import { getVersion } from './interop/miscellaneous';
import { SassAsmModule } from './SassAsmModule';
import { SassFactory } from './SassFactory';

/**
 * Create SassFactory interface object through loaded libass wasm module.
 *
 * @param {SassAsmModule} asmModule wasm module
 * @returns {SassFactory}
 */
export const sassLoader = (asmModule: SassAsmModule): SassFactory => {
  return {
    getVersion: getVersion(asmModule)
  };
};
