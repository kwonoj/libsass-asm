import { cwrapSignature } from '../SassAsmModule';

/**
 * Creates cwrapped interface for options api.
 */
const wrapSassOptions = (cwrap: cwrapSignature) => ({
  //int sass_option_get_precision (struct Sass_Options* options);
  option_get_precision: cwrap<(sassOptionsPtr: number) => number>(`option_get_precision`, 'number', ['number']),
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
  option_set_precision: cwrap<(sassOptionsPtr: number, precision: number) => void>(`sass_option_set_precision`, null, [
    'number',
    'number'
  ]),
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

export { wrapSassOptions };
