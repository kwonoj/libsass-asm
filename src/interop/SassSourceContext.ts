import { SassOptionsInterface } from './options/sassOptions';
import { SassContextInterface } from './sassContext';

/**
 * Interface to SassFileContext | SassDataContext
 */
interface SassSourceContext {
  /**
   * Property accessor to `_context_(get|set)_options`
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

export { SassSourceContext };
