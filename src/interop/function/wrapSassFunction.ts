import { cwrapSignature } from 'emscripten-wasm-loader';

/**
 * Creates cwrapped interface for function api.
 *
 * https://github.com/sass/libsass/blob/master/docs/api-function.md
 */
const wrapSassFunction = (_cwrap: cwrapSignature) => ({
  //Sass_Function_List sass_make_function_list (size_t length);
  //Sass_Function_Entry sass_make_function (const char* signature, Sass_Function_Fn cb, void* cookie);
  //void sass_delete_function (Sass_Function_Entry entry);
  //void sass_delete_function_list (Sass_Function_List list);
  //Sass_Function_Entry sass_function_get_list_entry(Sass_Function_List list, size_t pos);
  //void sass_function_set_list_entry(Sass_Function_List list, size_t pos, Sass_Function_Entry cb);
  //void sass_import_set_list_entry (Sass_Import_List list, size_t idx, Sass_Import_Entry entry);
  //Sass_Import_Entry sass_import_get_list_entry (Sass_Import_List list, size_t idx);
  //const char* sass_function_get_signature (Sass_Function_Entry cb);
  //Sass_Function_Fn sass_function_get_function (Sass_Function_Entry cb);
  //void* sass_function_get_cookie (Sass_Function_Entry cb);
  //const char* sass_callee_get_name (Sass_Callee_Entry);
  //const char* sass_callee_get_path (Sass_Callee_Entry);
  //size_t sass_callee_get_line (Sass_Callee_Entry);
  //size_t sass_callee_get_column (Sass_Callee_Entry);
  //enum Sass_Callee_Type sass_callee_get_type (Sass_Callee_Entry);
  //Sass_Env_Frame sass_callee_get_env (Sass_Callee_Entry);
  //union Sass_Value* sass_env_get_lexical (Sass_Env_Frame, const char*);
  //void sass_env_set_lexical (Sass_Env_Frame, const char*, union Sass_Value*);
  //union Sass_Value* sass_env_get_local (Sass_Env_Frame, const char*);
  //void sass_env_set_local (Sass_Env_Frame, const char*, union Sass_Value*);
  //union Sass_Value* sass_env_get_global (Sass_Env_Frame, const char*);
  //void sass_env_set_global (Sass_Env_Frame, const char*, union Sass_Value*);
});

export { wrapSassFunction };
