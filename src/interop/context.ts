import { SassDataContext } from './data/sassDataContext';
import { SassFileContext, SassSourceContext } from './file/sassFileContext';
import { wrapSassImporter } from './importer/wrapSassImporter';
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
  cwrapImporter: ReturnType<typeof wrapSassImporter>,
  interop: ReturnType<typeof buildInteropUtility>
) => {
  return {
    options: {
      create: () =>
        new SassOptions(cwrapContext, cwrapOptions, cwrapImporter, interop) as SassOptionsInterface
    },
    file: {
      create: (inputPath: string) => new SassFileContext(inputPath, cwrapContext, interop) as SassSourceContext
    },
    data: {
      create: (input: string) => new SassDataContext(input, cwrapContext, interop) as SassSourceContext
    }
  };
};

export { buildContext };
