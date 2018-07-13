import { cwrapSignature } from 'emscripten-wasm-loader';

/**
 * Creates cwrapped interface for importer api.
 *
 * https://github.com/sass/libsass/blob/master/docs/api-importer.md
 */
const wrapSassImporter = (_cwrap: cwrapSignature) => ({
  //Sass_C_Import_Callback sass_make_importer (Sass_C_Import_Fn, void* cookie);
  //Sass_C_Import_Fn sass_import_get_function (Sass_C_Import_Callback fn);
  import_get_function: () => {
    throw new Error('not implemented');
  },
  //void* sass_import_get_cookie (Sass_C_Import_Callback fn);
  import_get_cookie: () => {
    throw new Error('not implemented');
  }
  //void sass_delete_importer (Sass_C_Import_Callback fn);
  //Sass_Import_Entry* sass_make_import_list (size_t length);
  //Sass_Import_Entry sass_make_import_entry (const char* path, char* source, char* srcmap);
  //Sass_Import_Entry sass_make_import (const char* rel, const char* abs, char* source, char* srcmap);
  //Sass_Import_Entry sass_import_set_error(Sass_Import_Entry import, const char* message, size_t line, size_t col);
  //void sass_import_set_list_entry (Sass_Import_Entry* list, size_t idx, Sass_Import_Entry entry);
  //Sass_Import_Entry sass_import_get_list_entry (Sass_Import_Entry* list, size_t idx);
  //const char* sass_import_get_imp_path (Sass_Import_Entry);
  //const char* sass_import_get_abs_path (Sass_Import_Entry);
  //const char* sass_import_get_source (Sass_Import_Entry);
  //const char* sass_import_get_srcmap (Sass_Import_Entry);
  //char* sass_import_take_source (Sass_Import_Entry);
  //char* sass_import_take_srcmap (Sass_Import_Entry);
  //size_t sass_import_get_error_line (Sass_Import_Entry);
  //size_t sass_import_get_error_column (Sass_Import_Entry);
  //const char* sass_import_get_error_message (Sass_Import_Entry);
  //void sass_delete_import_list (Sass_Import_Entry*);
  //void sass_delete_import (Sass_Import_Entry);
});

export { wrapSassImporter };
