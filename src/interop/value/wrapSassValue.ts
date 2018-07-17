import { cwrapSignature } from 'emscripten-wasm-loader';

enum SassTag {
  SASS_BOOLEAN,
  SASS_NUMBER,
  SASS_COLOR,
  SASS_STRING,
  SASS_LIST,
  SASS_MAP,
  SASS_NULL,
  SASS_ERROR,
  SASS_WARNING
}

enum SassSeparator {
  SASS_COMMA,
  SASS_SPACE
}

// Value Operators
enum SassOP {
  AND,
  OR,
  EQ,
  NEQ,
  GT,
  GTE,
  LT,
  LTE,
  ADD,
  SUB,
  MUL,
  DIV,
  MOD,
  NUM_OPS
}

/**
 * Creates cwrapped interface for value api.
 *
 * https://github.com/sass/libsass/blob/master/docs/api-value.md
 */
const wrapSassValue = (_cwrap: cwrapSignature) => ({
  //union Sass_Value* sass_make_null    (void);
  make_null: null,
  //union Sass_Value* sass_make_boolean (bool val);
  make_boolean: null,
  //union Sass_Value* sass_make_string  (const char* val);
  make_string: null,
  //union Sass_Value* sass_make_qstring (const char* val);
  make_qstring: null,
  //union Sass_Value* sass_make_number  (double val, const char* unit);
  make_number: null,
  //union Sass_Value* sass_make_color   (double r, double g, double b, double a);
  make_color: null,
  //union Sass_Value* sass_make_list    (size_t len, enum Sass_Separator sep, bool is_bracketed);
  make_list: null,
  //union Sass_Value* sass_make_map     (size_t len);
  make_map: null,
  //union Sass_Value* sass_make_error   (const char* msg);
  make_error: null,
  //union Sass_Value* sass_make_warning (const char* msg);
  make_warning: null,
  //void sass_delete_value (union Sass_Value* val);
  delete_value: null,
  //union Sass_Value* sass_clone_value (const union Sass_Value* val);
  clone_value: null,
  //union Sass_Value* sass_value_stringify (const union Sass_Value* a, bool compressed, int precision);
  value_stringify: null,
  //union Sass_Value* sass_value_op (enum Sass_OP op, const union Sass_Value* a, const union Sass_Value* b);
  value_op: null,
  //enum Sass_Tag sass_value_get_tag (const union Sass_Value* v);
  value_get_tag: null,
  //bool sass_value_is_null (const union Sass_Value* v);
  value_is_null: null,
  //bool sass_value_is_number (const union Sass_Value* v);
  value_is_number: null,
  //bool sass_value_is_string (const union Sass_Value* v);
  value_is_string: null,
  //bool sass_value_is_boolean (const union Sass_Value* v);
  value_is_boolean: null,
  //bool sass_value_is_color (const union Sass_Value* v);
  value_is_color: null,
  //bool sass_value_is_list (const union Sass_Value* v);
  value_is_list: null,
  //bool sass_value_is_map (const union Sass_Value* v);
  value_is_map: null,
  //bool sass_value_is_error (const union Sass_Value* v);
  value_is_error: null,
  //bool sass_value_is_warning (const union Sass_Value* v);
  value_is_warning: null,
  //double sass_number_get_value (const union Sass_Value* v);
  number_get_value: null,
  //void sass_number_set_value (union Sass_Value* v, double value);
  number_set_value: null,
  //const char* sass_number_get_unit (const union Sass_Value* v);
  number_get_unit: null,
  //void sass_number_set_unit (union Sass_Value* v, char* unit);
  number_set_unit: null,
  //const char* sass_string_get_value (const union Sass_Value* v);
  string_get_value: null,
  //void sass_string_set_value (union Sass_Value* v, char* value);
  string_set_value: null,
  //bool sass_string_is_quoted(const union Sass_Value* v);
  string_is_quoted: null,
  //void sass_string_set_quoted(union Sass_Value* v, bool quoted);
  string_set_quoted: null,
  //bool sass_boolean_get_value (const union Sass_Value* v);
  boolean_get_value: null,
  //void sass_boolean_set_value (union Sass_Value* v, bool value);
  boolean_set_value: null,
  //double sass_color_get_r (const union Sass_Value* v);
  color_get_r: null,
  //void sass_color_set_r (union Sass_Value* v, double r);
  color_set_r: null,
  //double sass_color_get_g (const union Sass_Value* v);
  color_get_g: null,
  //void sass_color_set_g (union Sass_Value* v, double g);
  color_set_g: null,
  //double sass_color_get_b (const union Sass_Value* v);
  color_get_b: null,
  //void sass_color_set_b (union Sass_Value* v, double b);
  color_set_b: null,
  //double sass_color_get_a (const union Sass_Value* v);
  color_get_a: null,
  //void sass_color_set_a (union Sass_Value* v, double a);
  color_set_a: null,
  //size_t sass_list_get_length (const union Sass_Value* v);
  list_get_length: null,
  //enum Sass_Separator sass_list_get_separator (const union Sass_Value* v);
  list_get_separator: null,
  //void sass_list_set_separator (union Sass_Value* v, enum Sass_Separator value);
  list_set_separator: null,
  //bool sass_list_get_is_bracketed (const union Sass_Value* v);
  list_get_is_bracketed: null,
  //void sass_list_set_is_bracketed (union Sass_Value* v, bool value);
  list_set_is_bracketed: null,
  //union Sass_Value* sass_list_get_value (const union Sass_Value* v, size_t i);
  list_get_value: null,
  //void sass_list_set_value (union Sass_Value* v, size_t i, union Sass_Value* value);
  list_set_value: null,
  //size_t sass_map_get_length (const union Sass_Value* v);
  map_get_length: null,
  //union Sass_Value* sass_map_get_key (const union Sass_Value* v, size_t i);
  map_get_key: null,
  //void sass_map_set_key (union Sass_Value* v, size_t i, union Sass_Value*);
  map_set_key: null,
  //union Sass_Value* sass_map_get_value (const union Sass_Value* v, size_t i);
  map_get_value: null,
  //void sass_map_set_value (union Sass_Value* v, size_t i, union Sass_Value*);
  map_set_value: null,
  //char* sass_error_get_message (const union Sass_Value* v);
  error_get_message: null,
  //void sass_error_set_message (union Sass_Value* v, char* msg);
  error_set_message: null,
  //char* sass_warning_get_message (const union Sass_Value* v);
  warning_get_message: null,
  //void sass_warning_set_message (union Sass_Value* v, char* msg);
  warning_set_message: null
});

export { SassTag, SassSeparator, SassOP, wrapSassValue };
