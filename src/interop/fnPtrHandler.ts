import { SassAsmModule } from '../SassAsmModule';

/**
 * Returns handler object to wrap `addFunction` and `removeFunction`
 */
const getFnPtrHandler = ({ addFunction, removeFunction }: SassAsmModule) => {
  let count = 0;

  return {
    add: (fn: Function, signature: string) => {
      if (count === 20) {
        throw new Error('Maximum number of function pointer added');
      }
      count++;
      return addFunction(fn, signature);
    },
    remove: (fnPtr: number) => {
      if (count > 0) {
        count--;
        removeFunction(fnPtr);
      }
    }
  };
};

export { getFnPtrHandler };
