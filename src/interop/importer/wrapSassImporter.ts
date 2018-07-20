import { cwrapSignature } from 'emscripten-wasm-loader';

/**
 * Creates cwrapped interface for importer api.
 *
 * https://github.com/sass/libsass/blob/master/docs/api-importer.md
 */
//TODO: verify return type / param type of cwrapped signature for Sass_Import_Entry
const wrapSassImporter = (cwrap: cwrapSignature) => ({
  //Sass_Importer_Entry sass_make_importer (Sass_Importer_Fn importer, double priority, void* cookie);
  make_importer: cwrap<(importFnPtr: number, cookie: number) => number>(`sass_make_importer`, 'number', [
    'number',
    'number'
  ]),
  //Sass_C_Import_Fn sass_importer_get_function (Sass_C_Import_Callback fn);
  importer_get_function: cwrap<(importCallbackPtr: number) => number>(`sass_importer_get_function`, 'number', [
    'number'
  ]),
  //void* sass_importer_get_cookie (Sass_C_Import_Callback fn);
  importer_get_cookie: cwrap<(importCallbackPtr: number) => number>(`sass_importer_get_cookie`, 'number', ['number']),
  //void sass_delete_importer (Sass_C_Import_Callback fn);
  delete_importer: cwrap<(importCallbackPtr: number) => null>(`sass_delete_importer`, null, ['number']),
  //Sass_Import_Entry* sass_make_import_list (size_t length);
  make_import_list: cwrap<(length: number) => number>(`sass_make_import_list`, 'number', ['number']),
  //Sass_Import_Entry sass_make_import_entry (const char* path, char* source, char* srcmap);
  make_import_entry: cwrap<(path: number, source: number, srcmap: number) => number>(
    `sass_make_import_entry`,
    'number',
    ['number', 'number', 'number']
  ),
  //Sass_Import_Entry sass_make_import (const char* rel, const char* abs, char* source, char* srcmap);
  make_import: cwrap<(rel: number, abs: number, source: number, srcmap: number) => number>(
    `sass_make_import`,
    'number',
    ['number', 'number', 'number', 'number']
  ),
  //Sass_Import_Entry sass_import_set_error(Sass_Import_Entry import, const char* message, size_t line, size_t col);
  import_set_error: cwrap<(importEntryPtr: number, message: number, line: number, col: number) => number>(
    `sass_import_set_error`,
    'number',
    ['number', 'number', 'number', 'number']
  ),
  //void sass_import_set_list_entry (Sass_Import_Entry* list, size_t idx, Sass_Import_Entry entry);
  import_set_list_entry: cwrap<(importEntryList: number, idx: number, entry: number) => null>(
    `sass_import_set_list_entry`,
    null,
    ['number', 'number', 'number']
  ),
  //Sass_Import_Entry sass_import_get_list_entry (Sass_Import_Entry* list, size_t idx);
  import_get_list_entry: cwrap<(importEntryList: number, idx: number) => number>(
    `sass_import_get_list_entry`,
    'number',
    ['number', 'number']
  ),
  //const char* sass_import_get_imp_path (Sass_Import_Entry);
  import_get_imp_path: cwrap<(importEntryPtr: number) => number>(`sass_import_get_imp_path`, 'number', ['number']),
  //const char* sass_import_get_abs_path (Sass_Import_Entry);
  import_get_abs_path: cwrap<(importEntryPtr: number) => number>(`sass_import_get_abs_path`, 'number', ['number']),
  //const char* sass_import_get_source (Sass_Import_Entry);
  import_get_source: cwrap<(importEntryPtr: number) => number>(`sass_import_get_source`, 'number', ['number']),
  //const char* sass_import_get_srcmap (Sass_Import_Entry);
  import_get_srcmap: cwrap<(importEntryPtr: number) => number>(`sass_import_get_srcmap`, 'number', ['number']),
  //char* sass_import_take_source (Sass_Import_Entry);
  import_take_source: cwrap<(importEntryPtr: number) => number>(`sass_import_take_source`, 'number', ['number']),
  //char* sass_import_take_srcmap (Sass_Import_Entry);
  import_take_srcmap: cwrap<(importEntryPtr: number) => number>(`sass_import_take_srcmap`, 'number', ['number']),
  //size_t sass_import_get_error_line (Sass_Import_Entry);
  import_get_error_line: cwrap<(importEntryPtr: number) => number>(`sass_import_get_error_line`, 'number', ['number']),
  //size_t sass_import_get_error_column (Sass_Import_Entry);
  import_get_error_column: cwrap<(importEntryPtr: number) => number>(`sass_import_get_error_column`, 'number', [
    'number'
  ]),
  //const char* sass_import_get_error_message (Sass_Import_Entry);
  import_get_error_message: cwrap<(importEntryPtr: number) => number>(`sass_import_get_error_message`, 'number', [
    'number'
  ]),
  //void sass_delete_import_list (Sass_Import_Entry*);
  delete_import_list: cwrap<(importEntryList: number) => void>(`sass_delete_import_list`, null, ['number']),
  //void sass_delete_import (Sass_Import_Entry);
  delete_import: cwrap<(importEntryPtr: number) => void>(`sass_delete_import`, null, ['number'])
});

export { wrapSassImporter };
