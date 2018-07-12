import { mountDirectory, unmount } from 'emscripten-wasm-loader';
import * as nanoid from 'nanoid';
import { SassAsmModule } from '../SassAsmModule';
import { log } from '../util/logger';

interface StringMethodInterface {
  alloc(value: string): number;
  ptrToString(value: number): string;
}

/**
 * Construct few utility function to be used interop between raw libsass interface.
 *
 * @param {SassAsmModule} asmModule
 */
const buildInteropUtility = (asmModule: SassAsmModule) => {
  const { FS, stackAlloc, stringToUTF8, Pointer_stringify } = asmModule;

  const str: StringMethodInterface = {
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
  log(`sassLoader: root mounting point created`, { nodePathId });

  const mountPath = mountDirectory(FS, nodePathId);
  const unmountPath = unmount(FS, nodePathId);
  return {
    str,
    mount: mountPath,
    unmount: unmountPath
  };
};

export { buildInteropUtility, StringMethodInterface };
