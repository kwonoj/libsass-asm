import { log } from '../util/logger';
import { wrapSassContext } from './wrapSassContext';
import { wrapSassOptions } from './wrapSassOptions';

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
   * Push include path for compilation.
   * @param {string} includePath path to be inlcluded
   */
  addIncludePath(includePath: string): void;
  /**
   * Push include path for plugin.
   * @param {string} pluginPath path to be inlcluded
   */
  addPluginPath(pluginPath: string): void;

  /**
   * Release allocated memory with created instance.
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
 * Interop interface to `sass_option*` api
 * (https://github.com/sass/libsass/blob/master/docs/api-context.md#sass-options-api)
 *
 */
class SassOptions implements SassOptionsInterface {
  /**
   * Raw pointer to `struct Sass_Options*`
   */
  private readonly sassOptionsPtr: number;
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
    private readonly cwrapOptions: ReturnType<typeof wrapSassOptions>
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

  public addIncludePath(_includePath: string): void {
    //TODO: allocate string, mount path
    //this.cwrapOptions.option_push_include_path(this.sassOptionsPtr);
  }

  public addPluginPath(_pluginPath: string): void {
    //this.cwrapOptions.option_push_plugin_path(this.sassOptionsPtr);
  }

  public dispose(): void {
    //TODO: unmount path
    this.cwrapCtx.delete_options(this.sassOptionsPtr);
    log(`SassOptions: disposed instance`);
  }
}

export { SassOptionsInterface, SassOptions, OutputStyle };
