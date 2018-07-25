import { log } from '../../util/logger';
import { SassImportEntryInterface } from '../importer/sassImportEntry';
import { SassImportEntryList } from '../importer/sassImportEntryList';
import { wrapSassImporter } from '../importer/wrapSassImporter';
import { buildInteropUtility } from '../interopUtility';
import { wrapSassContext } from '../wrapSassContext';
import { wrapSassOptions } from './wrapSassOptions';

/**
 * Interop interface to `sass_option*` api
 * (https://github.com/sass/libsass/blob/master/docs/api-context.md#sass-options-api)
 */
interface SassOptionsInterface {
  /**
   * Property accessor to `sass_option_(get|set)_precision`
   */
  precision: number;

  /**
   * Property accessor to `sass_option_(get|set)_output_style`
   */
  outputStyle: OutputStyle;

  /**
   * Property accessor to `sass_option_(get|set)_source_comments`
   */
  sourceComments: boolean;

  /**
   * Property accessor to `sass_option_(get|set)_is_indented_syntax_src`
   */
  isIndentedSyntaxSrc: boolean;

  /**
   * Property accessor to `sass_option_(get|set)_omit_source_map_url`
   */
  omitMapComment: boolean;

  /**
   * Property accessor to `sass_option_(get|set)_omit_source_map_embed`
   */
  sourceMapEmbed: boolean;

  /**
   * Property accessor to `sass_option_(get|set)_source_map_file`
   */
  sourceMapFile: string;

  /**
   * Property accessor to `sass_option_(get|set)_output_path`
   */
  outputPath: string;
  /**
   * Property accessor to `sass_option_(get|set)_input_path`
   */
  inputPath: string;

  /**
   * Property accessor to `sass_option_(get|set)_c_importers`
   */
  importers: Array<SassImportEntryInterface>;

  /**
   * Push include path for compilation.
   * Accessor to sass_option_push_include_path
   *
   * @param {string} includePath path to be inlcluded
   */
  addIncludePath(includePath: string): void;
  /**
   * Push include path for plugin.
   * Accessor to sass_option_push_plugin_path
   *
   * @param {string} pluginPath path to be inlcluded
   */
  addPluginPath(pluginPath: string): void;

  /**
   * Release allocated memory with created instance.
   * Accessor to sass_delete_options
   */
  dispose(): void;
}

/**
 * Supported output style.
 */
enum OutputStyle {
  SASS_STYLE_NESTED,
  SASS_STYLE_EXPANDED,
  SASS_STYLE_COMPACT,
  SASS_STYLE_COMPRESSED
}

/**
 * @internal
 *
 */
class SassOptions implements SassOptionsInterface {
  /**
   * Raw pointer to `struct Sass_Options*`
   * @internal
   */
  public readonly sassOptionsPtr: number;

  /**
   * List of virtual mounted path.
   */
  private readonly mountedPath: Array<string> = [];

  /**
   * Hold pointers to internaly allocated strings, to be removed when disposing entry instance
   */
  private readonly allocatedStringPtr: Array<number> = [];

  /**
   * List of importers.
   */
  private importersList: SassImportEntryList | null;
  /**
   * Construct new instance of SassOptions.
   *
   * @param {ReturnType<typeof wrapSassContext>} cwrapCtx cwrapped function object to sass context api.
   * @param {ReturnType<typeof wrapSassOptions>} cwrapOptions cwrapped function object to sass option api.
   *
   * Manual creation of this class is prohibited;
   * Should use `context.options.create` static interface instead.
   */
  constructor(
    private readonly cwrapCtx: ReturnType<typeof wrapSassContext>,
    private readonly cwrapOptions: ReturnType<typeof wrapSassOptions>,
    private readonly cwrapImporter: ReturnType<typeof wrapSassImporter>,
    private readonly interop: ReturnType<typeof buildInteropUtility>
  ) {
    this.sassOptionsPtr = cwrapCtx.make_options();
    log(`SassOptions: created new instance`, { sassOptionsPtr: this.sassOptionsPtr });
  }

  public get precision(): number {
    return this.cwrapOptions.option_get_precision(this.sassOptionsPtr);
  }
  public set precision(precision: number) {
    this.cwrapOptions.option_set_precision(this.sassOptionsPtr, precision);
  }

  public get outputStyle(): OutputStyle {
    return this.cwrapOptions.option_get_output_style(this.sassOptionsPtr);
  }
  public set outputStyle(style: OutputStyle) {
    this.cwrapOptions.option_set_output_style(this.sassOptionsPtr, style);
  }

  public get sourceComments(): boolean {
    return !!this.cwrapOptions.option_get_source_comments(this.sassOptionsPtr);
  }

  public set sourceComments(enabled: boolean) {
    this.cwrapOptions.option_set_source_comments(this.sassOptionsPtr, enabled);
  }

  public get isIndentedSyntaxSrc(): boolean {
    return !!this.cwrapOptions.option_get_is_indented_syntax_src(this.sassOptionsPtr);
  }

  public set isIndentedSyntaxSrc(isIndented: boolean) {
    this.cwrapOptions.option_set_is_indented_syntax_src(this.sassOptionsPtr, isIndented);
  }

  public get omitMapComment(): boolean {
    return !!this.cwrapOptions.option_get_omit_source_map_url(this.sassOptionsPtr);
  }

  public set omitMapComment(isOmitted: boolean) {
    this.cwrapOptions.option_set_omit_source_map_url(this.sassOptionsPtr, isOmitted);
  }

  public get sourceMapEmbed(): boolean {
    return !!this.cwrapOptions.option_get_source_map_embed(this.sassOptionsPtr);
  }

  public set sourceMapEmbed(embed: boolean) {
    this.cwrapOptions.option_set_source_map_embed(this.sassOptionsPtr, embed);
  }

  public get sourceMapFile(): string {
    const mapFilePtr = this.cwrapOptions.option_get_source_map_file(this.sassOptionsPtr);
    return this.interop.str.ptrToString(mapFilePtr);
  }

  public set sourceMapFile(mapFile: string) {
    const mapFilePtr = this.interop.str.alloc(mapFile);
    this.allocatedStringPtr.push(mapFilePtr);
    this.cwrapOptions.option_set_source_map_file(this.sassOptionsPtr, mapFilePtr);
  }

  public get outputPath(): string {
    const outPathPtr = this.cwrapOptions.option_get_output_path(this.sassOptionsPtr);
    return this.interop.str.ptrToString(outPathPtr);
  }

  public set outputPath(outPath: string) {
    const outputPathPtr = this.interop.str.alloc(outPath);
    this.allocatedStringPtr.push(outputPathPtr);
    this.cwrapOptions.option_set_output_path(this.sassOptionsPtr, outputPathPtr);
  }

  public get inputPath(): string {
    const inputPathPtr = this.cwrapOptions.option_get_input_path(this.sassOptionsPtr);
    return this.interop.str.ptrToString(inputPathPtr);
  }

  public set inputPath(outPath: string) {
    const outputPathStr = this.interop.str.alloc(outPath);
    this.allocatedStringPtr.push(outputPathStr);
    this.cwrapOptions.option_set_input_path(this.sassOptionsPtr, outputPathStr);
  }

  public get importers(): Array<SassImportEntryInterface> {
    return !!this.importersList ? this.importersList.entry : [];
  }

  public set importers(values: Array<SassImportEntryInterface>) {
    this.importersList = new SassImportEntryList(this.cwrapImporter, values.length);
    this.importersList.entry = values;

    this.cwrapOptions.option_set_c_importers(this.sassOptionsPtr, this.importersList.sassImportEntryListPtr);
  }

  public addIncludePath(includePath: string): void {
    const mounted = this.interop.mount(includePath);
    this.mountedPath.push(mounted);

    const mountedPtr = this.interop.str.alloc(mounted);
    this.allocatedStringPtr.push(mountedPtr);
    this.cwrapOptions.option_push_include_path(this.sassOptionsPtr, mountedPtr);
  }

  public addPluginPath(pluginPath: string): void {
    const mounted = this.interop.mount(pluginPath);
    this.mountedPath.push(mounted);

    const mountedPtr = this.interop.str.alloc(mounted);
    this.allocatedStringPtr.push(mountedPtr);
    this.cwrapOptions.option_push_plugin_path(this.sassOptionsPtr, mountedPtr);
  }

  public dispose(): void {
    this.cwrapCtx.delete_options(this.sassOptionsPtr);
    this.mountedPath.forEach(p => this.interop.unmount(p));

    this.allocatedStringPtr.forEach(ptr => this.interop.free(ptr));
    this.allocatedStringPtr.splice(0);

    log(`SassOptions: disposed instance`);
  }
}

export { SassOptionsInterface, SassOptions, OutputStyle };
