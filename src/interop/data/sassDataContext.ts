import { log } from '../../util/logger';
import { StringMethodInterface } from '../interopUtility';
import { SassOptions, SassOptionsInterface } from '../options/sassOptions';
import { SassContext, SassContextInterface } from '../sassContext';
import { SassSourceContext } from '../SassSourceContext';
import { wrapSassContext } from '../wrapSassContext';

class SassDataContext implements SassSourceContext {
  private readonly sassDataContextPtr: number;
  private sassOptions: SassOptionsInterface | null;
  private sassContext: SassContextInterface | null;

  /**
   *
   */
  constructor(
    input: string,
    private readonly cwrapCtx: ReturnType<typeof wrapSassContext>,
    private readonly strMethod: StringMethodInterface
  ) {
    const inputPtr = this.strMethod.alloc(input);
    this.sassDataContextPtr = this.cwrapCtx.make_data_context(inputPtr);
    log(`SassDataContext: created new instance`, { sassDataContextPtr: this.sassDataContextPtr });
  }

  //Instead of reconstructing js object from raw pointer,
  //returns reference of option instance already created.
  public get options(): SassOptionsInterface | null {
    const sassOptionPtr = this.cwrapCtx.data_context_get_options(this.sassDataContextPtr);
    //internal access to raw pointer - interface doesn't expose it.
    const containedOptionPtr = (this.sassOptions as SassOptions).sassOptionsPtr;
    log(`SassDataContext: get option pointer from context`, { sassOptionPtr, containedOptionPtr });

    if (!!this.sassOptions && (this.sassOptions as SassOptions).sassOptionsPtr === sassOptionPtr) {
      return this.sassOptions;
    }
    log(`SassDataContext: pointer mismatch between datacontext to contained value, returning empty`);
    return null;
  }

  public set options(option: SassOptionsInterface | null) {
    if (!option) {
      log(`SassDataContext: cannot set null value as option`);
      return;
    }

    //Hold reference to SassOptionsInterface to access struct values in JS context
    this.sassOptions = null;
    this.sassOptions = option;

    //internal access to raw pointer - interface doesn't expose it.
    this.cwrapCtx.data_context_set_options(this.sassDataContextPtr, (this.sassOptions as SassOptions).sassOptionsPtr);
  }

  public getContext(): SassContextInterface {
    const sassContextPtr = this.cwrapCtx.data_context_get_context(this.sassDataContextPtr);
    if (!!this.sassContext && (this.sassContext as SassContext).sassContextPtr !== sassContextPtr) {
      throw new Error(`Unexpected: context has changed`);
    }

    return !!this.sassContext
      ? this.sassContext
      : (this.sassContext = new SassContext(sassContextPtr, this.cwrapCtx, this.strMethod) as SassContextInterface);
  }

  public compile(): number {
    return this.cwrapCtx.compile_data_context(this.sassDataContextPtr);
  }

  public dispose(): void {
    this.cwrapCtx.delete_data_context(this.sassDataContextPtr);
  }
}

export { SassDataContext };
