import { SassAsmModule } from '../SassAsmModule';
import { SassOptions, SassOptionsInterface } from './sassOptions';
import { wrapSassContext } from './wrapSassContext';
import { wrapSassOptions } from './wrapSassOptions';

/**
 * Create interop interface around context.
 * (https://github.com/sass/libsass/blob/master/docs/api-context.md)
 *
 * @param asmModule
 */
const buildContext = (asmModule: SassAsmModule) => {
  const { cwrap } = asmModule;
  const cwrapCtx = wrapSassContext(cwrap);
  const cwrapOptions = wrapSassOptions(cwrap);

  return {
    options: {
      create: () => new SassOptions(cwrapCtx, cwrapOptions) as SassOptionsInterface
    }
  };
};

export { buildContext };
