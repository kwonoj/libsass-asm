import { SassFileContext, SassFileContextInterface } from './file/sassFileContext';
import { buildInteropUtility } from './interopUtility';
import { SassOptions, SassOptionsInterface } from './options/sassOptions';
import { wrapSassOptions } from './options/wrapSassOptions';
import { wrapSassContext } from './wrapSassContext';

/**
 * Create interop interface around context.
 * (https://github.com/sass/libsass/blob/master/docs/api-context.md)
 *
 * @param asmModule
 */
const buildContext = (
  cwrapContext: ReturnType<typeof wrapSassContext>,
  cwrapOptions: ReturnType<typeof wrapSassOptions>,
  interop: ReturnType<typeof buildInteropUtility>
) => {
  const { str, mount, unmount } = interop;

  return {
    options: {
      create: () => new SassOptions(cwrapContext, cwrapOptions, mount, unmount, str) as SassOptionsInterface
    },
    file: {
      create: (inputPath: string) => new SassFileContext(inputPath, cwrapContext, str) as SassFileContextInterface
    }
  };
};

export { buildContext };
