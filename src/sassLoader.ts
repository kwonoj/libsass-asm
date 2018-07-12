import { buildContext } from './interop/context';
import { buildInteropUtility } from './interop/interopUtility';
import { getVersion } from './interop/miscellaneous';
import { wrapSassOptions } from './interop/options/wrapSassOptions';
import { wrapSassContext } from './interop/wrapSassContext';
import { SassAsmModule } from './SassAsmModule';
import { SassFactory } from './SassFactory';

/**
 * Create SassFactory interface object through loaded libass wasm module.
 *
 * @param {SassAsmModule} asmModule wasm module
 * @returns {SassFactory}
 */
export const sassLoader = (asmModule: SassAsmModule): SassFactory => {
  const { cwrap } = asmModule;
  const cwrapCtx = wrapSassContext(cwrap);
  const cwrapOptions = wrapSassOptions(cwrap);
  const interop = buildInteropUtility(asmModule);

  return {
    getVersion: getVersion(asmModule),
    context: buildContext(cwrapCtx, cwrapOptions, interop),
    interop,
    raw: {
      context: cwrapCtx,
      options: cwrapOptions
    }
  };
};
