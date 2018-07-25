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
  const { FS, Pointer_stringify, _free, allocateUTF8 } = asmModule;

  const str: StringMethodInterface = {
    alloc: allocateUTF8,
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
    unmount: unmountPath,
    free: _free
  };
};

export { buildInteropUtility, StringMethodInterface };
