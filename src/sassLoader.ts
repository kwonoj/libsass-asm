import { buildContext } from './interop/context';
import { getFnPtrHandler } from './interop/fnPtrHandler';
import { buildImporter } from './interop/importer';
import { wrapSassImporter } from './interop/importer/wrapSassImporter';
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
  const cwrapImporter = wrapSassImporter(cwrap);

  const interop = buildInteropUtility(asmModule);
  const fnPtrHandler = getFnPtrHandler(asmModule);

  return {
    getVersion: getVersion(asmModule),
    context: buildContext(cwrapCtx, cwrapOptions, cwrapImporter, interop),
    importer: buildImporter(cwrapImporter, interop, fnPtrHandler),
    interop,
    raw: {
      context: cwrapCtx,
      options: cwrapOptions,
      importer: cwrapImporter
    }
  };
};
