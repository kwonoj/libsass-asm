import { log } from '../../util/logger';
import { getFnPtrHandler } from '../fnPtrHandler';
import { buildInteropUtility } from '../interopUtility';
import { wrapSassImporter } from './wrapSassImporter';

type importCallbackType = (
  path: string,
  importEntry: SassImportEntryInterface,
  compiler: any
) => Array<SassImportEntryInterface>;

/**
 * Interop interface to `Sass_Import_Entry`
 *
 * This interface doesn't implements ownership api
 * sass_import_take_source / sass_import_take_srcmap
 */
interface SassImportEntryInterface {
  /**
   * Property accessor to `sass_import_set_error` and `sass_import_get_error_(line|column|message)`
   */
  error: { message: string; line: number; column: number };
  /**
   * Property accessor to `sass_import_get_imp_path`
   */
  readonly importPath: string;
  /**
   * Property accessor to `sass_import_get_abs_path`
   */
  readonly absPath: string;
  /**
   * Property accessor to `sass_import_get_source`
   */
  readonly source: string;
  /**
   * Property accessor to `sass_import_get_srcmap`
   */
  readonly sourceMap: string;

  /**
   * Release allocated memory with created instance.
   * Accessor to sass_delete_import
   */
  dispose(): void;
}

class SassImportEntry implements SassImportEntryInterface {
  /**
   * Raw pointer to `struct Sass_Import_Entry*`
   * @internal
   */
  public sassImportEntryPtr: number;
  /**
   * Hold pointer to function added via `addFunction`, to be removed when disposing entry instance.
   */
  private callbackPtr: number;
  /**
   * Hold pointers to internaly allocated strings, to be removed when disposing entry instance
   */
  private readonly allocatedStringPtr: Array<number> = [];

  constructor(
    private readonly cwrapImporter: ReturnType<typeof wrapSassImporter>,
    private readonly interop: ReturnType<typeof buildInteropUtility>,
    private readonly fnPtrHandler: ReturnType<typeof getFnPtrHandler>
  ) { }

  public makeImport(_importCallback: importCallbackType): void {
    function boo(_path: number, _cb: number, _comp: number) {
      //noop
    }
    this.callbackPtr = this.fnPtrHandler.add(boo);
    this.sassImportEntryPtr = this.cwrapImporter.make_importer(
      this.callbackPtr,
      0,
      0 /* TODO: need way to pass cookie */
    );

    log(`SassImportEntry: created new instance`, { sassImportEntryPtr: this.sassImportEntryPtr });
  }

  public makeImporter(rel: string, abs: string, source: string, sourceMap: string): void {
    const [relPtr, absPtr, sourcePtr, sourceMapPtr] =
    [this.interop.str.alloc(rel), this.interop.str.alloc(abs), this.interop.str.alloc(source), this.interop.str.alloc(sourceMap)];
    this.allocatedStringPtr.push(relPtr, absPtr, sourcePtr, sourceMapPtr);
    //make_import_entry internally just calls make_import
    this.sassImportEntryPtr = this.cwrapImporter.make_import(
      relPtr,
      absPtr,
      sourcePtr,
      sourceMapPtr
    );
    log(`SassImportEntry: created new instance`, { sassImportEntryPtr: this.sassImportEntryPtr });
  }

  public get error(): { message: string; line: number; column: number } {
    const column = this.cwrapImporter.import_get_error_column(this.sassImportEntryPtr);
    const line = this.cwrapImporter.import_get_error_line(this.sassImportEntryPtr);
    const error = this.cwrapImporter.import_get_error_message(this.sassImportEntryPtr);

    return {
      column,
      line,
      message: this.interop.str.ptrToString(error)
    };
  }

  public set error({ message, line, column }: { message: string; line: number; column: number }) {
    const messagePtr = this.interop.str.alloc(message);
    this.allocatedStringPtr.push(messagePtr);
    this.cwrapImporter.import_set_error(this.sassImportEntryPtr, messagePtr, line, column);
  }

  public get importPath(): string {
    const pathPtr = this.cwrapImporter.import_get_imp_path(this.sassImportEntryPtr);
    return this.interop.str.ptrToString(pathPtr);
  }

  public get absPath(): string {
    const pathPtr = this.cwrapImporter.import_get_abs_path(this.sassImportEntryPtr);
    return this.interop.str.ptrToString(pathPtr);
  }

  public get source(): string {
    const sourcePtr = this.cwrapImporter.import_get_source(this.sassImportEntryPtr);
    return this.interop.str.ptrToString(sourcePtr);
  }

  public get sourceMap(): string {
    const sourceMapPtr = this.cwrapImporter.import_get_srcmap(this.sassImportEntryPtr);
    return this.interop.str.ptrToString(sourceMapPtr);
  }

  public dispose(): void {
    this.cwrapImporter.delete_import(this.sassImportEntryPtr);
    this.fnPtrHandler.remove(this.callbackPtr);

    this.allocatedStringPtr.forEach((ptr) => this.interop.free(ptr));
    this.allocatedStringPtr.splice(0);
  }
}

export { SassImportEntryInterface, SassImportEntry, importCallbackType };
