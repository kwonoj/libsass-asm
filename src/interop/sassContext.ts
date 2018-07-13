import { StringMethodInterface } from './interopUtility';
import { wrapSassContext } from './wrapSassContext';

/**
 * struct Sass_Context
 */
interface SassContextInterface {
  /**
   * Property accessor to `sass_context_get_error_status`
   */
  errorStatus: number;
  /**
   * Property accessor to `sass_context_get_error_message`
   */
  errorMessage: string;
  /**
   * Property accessor to `sass_context_get_output_string`
   */
  outputString: string;
  /**
   * Property accessor to `sass_context_get_source_map_string`
   */
  sourceMapString: string;
}

class SassContext implements SassContextInterface {
  constructor(
    public readonly sassContextPtr: number,
    private readonly cwrapCtx: ReturnType<typeof wrapSassContext>,
    private readonly strMethod: StringMethodInterface
  ) {}

  public get errorStatus(): number {
    return this.cwrapCtx.context_get_error_status(this.sassContextPtr);
  }

  public get errorMessage(): string {
    const messagePtr = this.cwrapCtx.context_get_error_message(this.sassContextPtr);
    return this.strMethod.ptrToString(messagePtr);
  }

  public get outputString(): string {
    const outputPtr = this.cwrapCtx.context_get_output_string(this.sassContextPtr);
    return this.strMethod.ptrToString(outputPtr);
  }

  public get sourceMapString(): string {
    const sourceMapPtr = this.cwrapCtx.context_get_source_map_string(this.sassContextPtr);
    return this.strMethod.ptrToString(sourceMapPtr);
  }
}

export { SassContextInterface, SassContext };
