import { SassImportEntry, SassImportEntryInterface } from './importer/sassImportEntry';
import { wrapSassImporter } from './importer/wrapSassImporter';
import { buildInteropUtility } from './interopUtility';

const buildImporter = (
  cwrapImporter: ReturnType<typeof wrapSassImporter>,
  interop: ReturnType<typeof buildInteropUtility>
) => {
  return {
    importEntry: {
      create: ({ rel, abs, source, sourceMap }: { rel: string; abs: string; source: string; sourceMap: string }) =>
        new SassImportEntry(cwrapImporter, interop.str, rel, abs, source, sourceMap) as SassImportEntryInterface
    }
  };
};

export { buildImporter };
