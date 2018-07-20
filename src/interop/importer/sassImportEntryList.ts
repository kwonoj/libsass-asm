import { SassImportEntry, SassImportEntryInterface } from './sassImportEntry';
import { wrapSassImporter } from './wrapSassImporter';

/**
 * Interface to sass_*_list.
 * This won't be exposed as public but only being used to marshall between JS array.
 *
 * @internal
 */
class SassImportEntryList {
  public readonly sassImportEntryListPtr: number;
  private importEntries: Array<SassImportEntryInterface>;

  constructor(private readonly cwrapImporter: ReturnType<typeof wrapSassImporter>, private readonly size: number) {
    this.sassImportEntryListPtr = this.cwrapImporter.make_import_list(size);
  }

  public get entry(): Array<SassImportEntryInterface> {
    return [...Array(this.size).keys()]
      .map(idx => this.cwrapImporter.import_get_list_entry(this.sassImportEntryListPtr, idx))
      .map(x => this.importEntries.find(v => (v as SassImportEntry).sassImportEntryPtr === x))
      .filter(x => !!x) as Array<SassImportEntryInterface>;
  }

  public set entry(values: Array<SassImportEntryInterface>) {
    //Keep references to JS context values
    this.importEntries = values;

    values.forEach((value: SassImportEntry, idx) =>
      this.cwrapImporter.import_set_list_entry(this.sassImportEntryListPtr, idx, value.sassImportEntryPtr)
    );
  }
}

export { SassImportEntryList };
