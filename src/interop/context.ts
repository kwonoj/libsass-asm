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
  const { cwrap, FS, stackAlloc, stringToUTF8, Pointer_stringify } = asmModule;
  const cwrapCtx = wrapSassContext(cwrap);
  const cwrapOptions = wrapSassOptions(cwrap);

  const str = {
    alloc: (value: string) => {
      const len = (value.length << 2) + 1;
      const ret = stackAlloc(len);
      stringToUTF8(value, ret, len);
      return ret;
    },
    ptrToString: Pointer_stringify
  };

  const nodePathId = `/${nanoid(45)}`;
  FS.mkdir(nodePathId);
  log(`buildContext: root mounting point created`, { nodePathId });

  const mountPath = mountDirectory(FS, nodePathId);
  const unmountPath = unmount(FS, nodePathId);

  return {
    options: {
      create: () => new SassOptions(cwrapCtx, cwrapOptions, mountPath, unmountPath, str) as SassOptionsInterface
    }
  };
};

export { buildContext };
