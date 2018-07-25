import { log } from '../../util/logger';
import { buildInteropUtility } from '../interopUtility';
import { SassOptions, SassOptionsInterface } from '../options/sassOptions';
import { SassContext, SassContextInterface } from '../sassContext';
import { SassSourceContext } from '../SassSourceContext';
import { wrapSassContext } from '../wrapSassContext';

/**
 * @internal
 */
class SassFileContext implements SassSourceContext {
  private readonly sassFileContextPtr: number;
  private readonly inputPathPtr: number;
  private sassOptions: SassOptionsInterface | null;
  private sassContext: SassContextInterface | null;

  constructor(
    inputPath: string,
    private readonly cwrapCtx: ReturnType<typeof wrapSassContext>,
    private readonly interop: ReturnType<typeof buildInteropUtility>
  ) {
    this.inputPathPtr = this.interop.str.alloc(inputPath);
    this.sassFileContextPtr = this.cwrapCtx.make_file_context(this.inputPathPtr);
    log(`SassFileContext: created new instance`, { sassFileContextPtr: this.sassFileContextPtr });
  }

  //Instead of reconstructing js object from raw pointer,
  //returns reference of option instance already created.
  public get options(): SassOptionsInterface | null {
    const sassOptionPtr = this.cwrapCtx.file_context_get_options(this.sassFileContextPtr);
    //internal access to raw pointer - interface doesn't expose it.
    const containedOptionPtr = (this.sassOptions as SassOptions).sassOptionsPtr;
    log(`SassFileContext: get option pointer from context`, { sassOptionPtr, containedOptionPtr });

    if (!!this.sassOptions && (this.sassOptions as SassOptions).sassOptionsPtr === sassOptionPtr) {
      return this.sassOptions;
    }
    log(`SassFileContext: pointer mismatch between datacontext to contained value, returning empty`);
    return null;
  }

  public set options(option: SassOptionsInterface | null) {
    if (!option) {
      log(`SassFileContext: cannot set null value as option`);
      return;
    }

    //Hold reference to SassOptionsInterface to access struct values in JS context
    this.sassOptions = null;
    this.sassOptions = option;

    //internal access to raw pointer - interface doesn't expose it.
    this.cwrapCtx.file_context_set_options(this.sassFileContextPtr, (this.sassOptions as SassOptions).sassOptionsPtr);
  }

  public getContext(): SassContextInterface {
    const sassContextPtr = this.cwrapCtx.file_context_get_context(this.sassFileContextPtr);
    if (!!this.sassContext && (this.sassContext as SassContext).sassContextPtr !== sassContextPtr) {
      throw new Error(`Unexpected: context has changed`);
    }

    return !!this.sassContext
      ? this.sassContext
      : (this.sassContext = new SassContext(sassContextPtr, this.cwrapCtx, this.interop.str) as SassContextInterface);
  }

  public compile(): number {
    return this.cwrapCtx.compile_file_context(this.sassFileContextPtr);
  }

  public dispose(): void {
    this.cwrapCtx.delete_file_context(this.sassFileContextPtr);
    this.interop.free(this.inputPathPtr);
  }
}

export { SassFileContext, SassSourceContext };
