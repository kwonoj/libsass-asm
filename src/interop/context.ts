import { cwrapSignature, SassAsmModule } from '../SassAsmModule';

/**
 * Creates cwrapped interface for context api.
 */
const wrapContextInterface = (cwrap: cwrapSignature) => ({
  //struct Sass_Options* sass_make_options (void);
  make_options: cwrap<() => number>(`sass_make_options`, 'number'),

  //struct Sass_File_Context* sass_make_file_context (const char* input_path);
  make_file_context: null,
  //struct Sass_Data_Context* sass_make_data_context (char* source_string);
  make_data_context: null,

  //int sass_compile_file_context (struct Sass_File_Context* ctx);
  compile_file_context: null,
  //int sass_compile_data_context (struct Sass_Data_Context* ctx);
  compile_data_context: null,

  //struct Sass_Compiler* sass_make_file_compiler (struct Sass_File_Context* file_ctx);
  make_file_compiler: null,
  //struct Sass_Compiler* sass_make_data_compiler (struct Sass_Data_Context* data_ctx);
  make_data_compiler: null,

  //int sass_compiler_parse (struct Sass_Compiler* compiler);
  compiler_parse: null,
  //int sass_compiler_execute (struct Sass_Compiler* compiler);
  compiler_execute: null,

  //void sass_delete_compiler (struct Sass_Compiler* compiler);
  delete_compiler: null,
  //void sass_delete_options(struct Sass_Options* options);
  delete_options: cwrap<(sassOptionsPtr: number) => void>(`sass_delete_options`, null, ['number']),

  //void sass_delete_file_context (struct Sass_File_Context* ctx);
  delete_file_context: null,
  //void sass_delete_data_context (struct Sass_Data_Context* ctx);
  delete_data_context: null,

  //struct Sass_Context* sass_file_context_get_context (struct Sass_File_Context* file_ctx);
  file_context_get_context: null,
  //struct Sass_Context* sass_data_context_get_context (struct Sass_Data_Context* data_ctx);
  data_context_get_context: null,

  //struct Sass_Options* sass_context_get_options (struct Sass_Context* ctx);
  context_get_options: null,
  //struct Sass_Options* sass_file_context_get_options (struct Sass_File_Context* file_ctx);
  file_context_get_options: null,
  //struct Sass_Options* sass_data_context_get_options (struct Sass_Data_Context* data_ctx);
  data_context_get_options: null,
  //void sass_file_context_set_options (struct Sass_File_Context* file_ctx, struct Sass_Options* opt);
  file_context_set_options: null,
  //void sass_data_context_set_options (struct Sass_Data_Context* data_ctx, struct Sass_Options* opt);
  data_context_set_options: null,

  //const char* sass_context_get_output_string (struct Sass_Context* ctx);
  context_get_output_string: null,
  //int sass_context_get_error_status (struct Sass_Context* ctx);
  context_get_error_status: null,
  //const char* sass_context_get_error_json (struct Sass_Context* ctx);
  context_get_error_json: null,
  //const char* sass_context_get_error_text (struct Sass_Context* ctx);
  context_get_error_text: null,
  //const char* sass_context_get_error_message (struct Sass_Context* ctx);
  context_get_error_message: null,
  //const char* sass_context_get_error_file (struct Sass_Context* ctx);
  context_get_error_file: null,
  //size_t sass_context_get_error_line (struct Sass_Context* ctx);
  context_get_error_line: null,
  //size_t sass_context_get_error_column (struct Sass_Context* ctx);
  context_get_error_column: null,
  //const char* sass_context_get_source_map_string (struct Sass_Context* ctx);
  context_get_source_map_string: null,
  //char** sass_context_get_included_files (struct Sass_Context* ctx);
  context_get_included_files: null,

  //size_t sass_compiler_get_import_stack_size(struct Sass_Compiler * compiler);
  compiler_get_import_stack_size: null,
  //Sass_Import_Entry sass_compiler_get_last_import(struct Sass_Compiler * compiler);
  compiler_get_last_import: null,
  //Sass_Import_Entry sass_compiler_get_import_entry(struct Sass_Compiler * compiler, size_t idx);
  compiler_get_import_entry: null,

  //size_t sass_compiler_get_callee_stack_size(struct Sass_Compiler * compiler);
  compiler_get_callee_stack_size: null,
  //Sass_Callee_Entry sass_compiler_get_last_callee(struct Sass_Compiler * compiler);
  compiler_get_last_callee: null,
  //Sass_Callee_Entry sass_compiler_get_callee_entry(struct Sass_Compiler * compiler, size_t idx);
  compiler_get_callee_entry: null,

  //char* sass_context_take_error_json (struct Sass_Context* ctx);
  context_take_error_json: null,
  //char* sass_context_take_error_text (struct Sass_Context* ctx);
  context_take_error_text: null,
  //char* sass_context_take_error_message (struct Sass_Context* ctx);
  context_take_error_message: null,
  //char* sass_context_take_error_file (struct Sass_Context* ctx);
  context_take_error_file: null,
  //char* sass_context_take_output_string (struct Sass_Context* ctx);
  context_take_output_string: null,
  //char* sass_context_take_source_map_string (struct Sass_Context* ctx);
  context_take_source_map_string: null
});

/**
 * Creates cwrapped interface for options api.
 */
const wrapOptionsInterface = (cwrap: cwrapSignature) => ({
  //int sass_option_get_precision (struct Sass_Options* options);
  option_get_precision: null,
  //enum Sass_Output_Style sass_option_get_output_style (struct Sass_Options* options);
  option_get_output_style: null,
  //bool sass_option_get_source_comments (struct Sass_Options* options);
  option_get_source_comments: cwrap<(sassOptionsPtr: number) => boolean>(`sass_option_get_source_comments`, 'number', [
    'number'
  ]),
  //bool sass_option_get_source_map_embed (struct Sass_Options* options);
  option_get_source_map_embed: null,
  //bool sass_option_get_source_map_contents (struct Sass_Options* options);
  option_get_source_map_contents: null,
  //bool sass_option_get_source_map_file_urls (struct Sass_Options* options);
  option_get_source_map_file_urls: null,
  //bool sass_option_get_omit_source_map_url (struct Sass_Options* options);
  option_get_omit_source_map_url: null,
  //bool sass_option_get_is_indented_syntax_src (struct Sass_Options* options);
  option_get_is_indented_syntax_src: null,
  //const char* sass_option_get_indent (struct Sass_Options* options);
  option_get_indent: null,
  //const char* sass_option_get_linefeed (struct Sass_Options* options);
  option_get_linefeed: null,
  //const char* sass_option_get_input_path (struct Sass_Options* options);
  option_get_input_path: null,
  //const char* sass_option_get_output_path (struct Sass_Options* options);
  option_get_output_path: null,
  //const char* sass_option_get_source_map_file (struct Sass_Options* options);
  option_get_source_map_file: null,
  //const char* sass_option_get_source_map_root (struct Sass_Options* options);
  option_get_source_map_root: null,
  //Sass_C_Function_List sass_option_get_c_functions (struct Sass_Options* options);
  option_get_c_functions: null,
  //Sass_C_Import_Callback sass_option_get_importer (struct Sass_Options* options);
  option_get_importer: null,

  //size_t sass_option_get_include_path_size(struct Sass_Options* options);
  option_get_include_path_size: null,
  //const char* sass_option_get_include_path(struct Sass_Options* options, size_t i);
  option_get_include_path: null,

  //size_t sass_option_get_plugin_path_size(struct Sass_Options* options);
  option_get_plugin_path_size: null,
  //const char* sass_option_get_plugin_path(struct Sass_Options* options, size_t i);
  option_get_plugin_path: null,

  //void sass_option_set_precision (struct Sass_Options* options, int precision);
  option_set_precision: null,
  //void sass_option_set_output_style (struct Sass_Options* options, enum Sass_Output_Style output_style);
  option_set_output_style: null,
  //void sass_option_set_source_comments (struct Sass_Options* options, bool source_comments);
  option_set_source_comments: null,
  //void sass_option_set_source_map_embed (struct Sass_Options* options, bool source_map_embed);
  option_set_source_map_embed: null,
  //void sass_option_set_source_map_contents (struct Sass_Options* options, bool source_map_contents);
  option_set_source_map_contents: null,
  //void sass_option_set_source_map_file_urls (struct Sass_Options* options, bool source_map_file_urls);
  option_set_source_map_file_urls: null,
  //void sass_option_set_omit_source_map_url (struct Sass_Options* options, bool omit_source_map_url);
  option_set_omit_source_map_url: null,
  //void sass_option_set_is_indented_syntax_src (struct Sass_Options* options, bool is_indented_syntax_src);
  option_set_is_indented_syntax_src: null,
  //void sass_option_set_indent (struct Sass_Options* options, const char* indent);
  option_set_indent: null,
  //void sass_option_set_linefeed (struct Sass_Options* options, const char* linefeed);
  option_set_linefeed: null,
  //void sass_option_set_input_path (struct Sass_Options* options, const char* input_path);
  option_set_input_path: null,
  //void sass_option_set_output_path (struct Sass_Options* options, const char* output_path);
  option_set_output_path: null,
  //void sass_option_set_plugin_path (struct Sass_Options* options, const char* plugin_path);
  option_set_plugin_path: null,
  //void sass_option_set_include_path (struct Sass_Options* options, const char* include_path);
  option_set_include_path: null,
  //void sass_option_set_source_map_file (struct Sass_Options* options, const char* source_map_file);
  option_set_source_map_file: null,
  //void sass_option_set_source_map_root (struct Sass_Options* options, const char* source_map_root);
  option_set_source_map_root: null,
  //void sass_option_set_c_functions (struct Sass_Options* options, Sass_C_Function_List c_functions);
  option_set_c_functions: null,
  //void sass_option_set_importer (struct Sass_Options* options, Sass_C_Import_Callback importer);
  option_set_importer: null,

  //void sass_option_push_plugin_path (struct Sass_Options* options, const char* path);
  option_push_plugin_path: null,
  //void sass_option_push_include_path (struct Sass_Options* options, const char* path);
  option_push_include_path: null,

  //char* sass_find_file (const char* path, struct Sass_Options* opt);
  find_file: null,
  //char* sass_find_include (const char* path, struct Sass_Options* opt);
  find_include: null,

  //char* sass_compiler_find_file (const char* path, struct Sass_Compiler* compiler);
  compiler_find_file: null,
  //char* sass_compiler_find_include (const char* path, struct Sass_Compiler* compiler);
  compiler_find_include: null
});

const buildOptionInterface = (_asmModule: SassAsmModule, wrapped: ReturnType<typeof wrapContextInterface>) => {
  const { make_options, delete_options } = wrapped;

  const create = () => {
    const optionsPtr = make_options();

    return {
      dispose: () => delete_options(optionsPtr)
    };
  };

  return {
    create
  };
};

/**
 * Create interop interface around context.
 * (https://github.com/sass/libsass/blob/master/docs/api-context.md)
 *
 * @param asmModule
 */
const buildContext = (asmModule: SassAsmModule) => {
  const { cwrap } = asmModule;
  const wrappedContext = wrapContextInterface(cwrap);
  wrapOptionsInterface(cwrap);

  const options = buildOptionInterface(asmModule, wrappedContext);

  return {
    options
  };
};

export { buildContext };
