import { log } from '../util/logger';
import { wrapSassContext } from './wrapSassContext';
import { wrapSassOptions } from './wrapSassOptions';

interface SassOptionsInterface {
  /**
   * Release allocated memory with created instance.
   */
  dispose(): void;
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

  public dispose(): void {
    this.cwrapCtx.delete_options(this.sassOptionsPtr);
    log(`SassOptions: disposed instance`);
  }
}

export { SassOptionsInterface, SassOptions };
