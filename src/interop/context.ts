import { mountDirectory, unmount } from 'emscripten-wasm-loader';
import * as nanoid from 'nanoid';
import { SassAsmModule } from '../SassAsmModule';
import { log } from '../util/logger';
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
  const { cwrap, FS } = asmModule;
  const cwrapCtx = wrapSassContext(cwrap);
  const cwrapOptions = wrapSassOptions(cwrap);

  const nodePathId = `/${nanoid(45)}`;
  FS.mkdir(nodePathId);
  log(`buildContext: root mounting point created`, { nodePathId });

  const mountPath = mountDirectory(FS, nodePathId);
  const unmountPath = unmount(FS, nodePathId);

  return {
    options: {
      create: () => new SassOptions(cwrapCtx, cwrapOptions, mountPath, unmountPath) as SassOptionsInterface
    }
  };
};

export { buildContext };
