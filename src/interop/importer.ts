import { getFnPtrHandler } from './fnPtrHandler';
import { importCallbackType, SassImportEntry, SassImportEntryInterface } from './importer/sassImportEntry';
import { wrapSassImporter } from './importer/wrapSassImporter';
import { buildInteropUtility } from './interopUtility';

const importEntryFactory = (entry: SassImportEntry) => {
  function importEntryFactory(importCallback: importCallbackType): SassImportEntryInterface;
  function importEntryFactory(rel: string, abs: string, source: string, sourceMap: string): SassImportEntryInterface;
  function importEntryFactory(...args: Array<any>) {
    if (args.length === 1) {
      entry.makeImport(args[0]);
    } else {
      const [rel, abs, source, sourceMap] = args;
      entry.makeImporter(rel, abs, source, sourceMap);
    }
    return entry;
  }
  return importEntryFactory;
};

const buildImporter = (
  cwrapImporter: ReturnType<typeof wrapSassImporter>,
  interop: ReturnType<typeof buildInteropUtility>,
  fnPtrHandler: ReturnType<typeof getFnPtrHandler>
) => {
  return {
    importEntry: {
      create: importEntryFactory(new SassImportEntry(cwrapImporter, interop, fnPtrHandler))
    }
  };
};

export { buildImporter };
