import { cwrapSignature } from 'emscripten-wasm-loader';

/**
 * Creates cwrapped interface for memory api.
 *
 * https://github.com/sass/libsass/blob/master/docs/api-doc.md#memory-handling-and-life-cycles
 */
const wrapSassMemory = (_cwrap: cwrapSignature) => ({
  //void* sass_alloc_memory(size_t size);
  //char* sass_copy_c_string(const char* str);
  //void sass_free_memory(void* ptr);
});

export { wrapSassMemory };
