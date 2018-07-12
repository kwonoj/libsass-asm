import { log } from '../../util/logger';
import { SassOptions, SassOptionsInterface } from '../options/sassOptions';
import { wrapSassContext } from '../wrapSassContext';

interface SassFileContextInterface {
  /**
   * Property accessor to `file_context_(get|set)_options`
   */
  options: SassOptionsInterface | null;

  /**
   * Accessor to file_context_get_context
   */
  getContext(): SassContextInterface;

  compile(): void;

  /**
   * Release allocated memory with created instance.
   * Accessor to sass_delete_file_context
   */
  dispose(): void;
}

/**
 * @internal
 */
class SassFileContext implements SassFileContextInterface {
  private readonly sassFileContextPtr: number;
  private sassOptions: SassOptionsInterface | null;

  constructor(
    inputPath: string,
    private readonly cwrapCtx: ReturnType<typeof wrapSassContext>,
    private readonly strMethod: {
      alloc: (value: string) => number;
      ptrToString: (value: number) => string;
    }
  ) {
    const inputPathPtr = this.strMethod.alloc(inputPath);
    this.sassFileContextPtr = this.cwrapCtx.make_file_context(inputPathPtr);
    log(`SassFileContext: created new instance`, { sassFileContextPtr: this.sassFileContextPtr });
  }

  //Instead of reconstructing js object from raw pointer,
  //returns reference of option instance already created.
  public get options(): SassOptionsInterface | null {
    const sassOptionPtr = this.cwrapCtx.file_context_get_options(this.sassFileContextPtr);

    //internal access to raw pointer - interface doesn't expose it.
    if (!!this.sassOptions && (this.sassOptions as SassOptions).sassOptionsPtr === sassOptionPtr) {
      return this.sassOptions;
    }
    throw new Error(`Cannot get option`);
  }

  public set options(option: SassOptionsInterface | null) {
    if (!option) {
      throw new Error('Cannot set empty options');
    }
    this.sassOptions = null;
    this.sassOptions = option;

    //internal access to raw pointer - interface doesn't expose it.
    this.cwrapCtx.file_context_set_options(this.sassFileContextPtr, (this.sassOptions as SassOptions).sassOptionsPtr);
  }

  public getContext(): SassContextInterface {
    this.cwrapCtx.file_context_get_context(this.sassFileContextPtr);

    throw new Error('m');
  }

  public compile(): void {
    throw new Error('meh');
  }

  public dispose(): void {
    this.cwrapCtx.delete_file_context(this.sassFileContextPtr);
  }
}

export { SassFileContext, SassFileContextInterface };
