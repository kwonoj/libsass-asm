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
  //union Sass_Value* sass_make_boolean (bool val);
  //union Sass_Value* sass_make_string  (const char* val);
  //union Sass_Value* sass_make_qstring (const char* val);
  //union Sass_Value* sass_make_number  (double val, const char* unit);
  //union Sass_Value* sass_make_color   (double r, double g, double b, double a);
  //union Sass_Value* sass_make_list    (size_t len, enum Sass_Separator sep, bool is_bracketed);
  //union Sass_Value* sass_make_map     (size_t len);
  //union Sass_Value* sass_make_error   (const char* msg);
  //union Sass_Value* sass_make_warning (const char* msg);
  //void sass_delete_value (union Sass_Value* val);
  //union Sass_Value* sass_clone_value (const union Sass_Value* val);
  //union Sass_Value* sass_value_stringify (const union Sass_Value* a, bool compressed, int precision);
  //union Sass_Value* sass_value_op (enum Sass_OP op, const union Sass_Value* a, const union Sass_Value* b);
  //enum Sass_Tag sass_value_get_tag (const union Sass_Value* v);
  //bool sass_value_is_null (const union Sass_Value* v);
  //bool sass_value_is_number (const union Sass_Value* v);
  //bool sass_value_is_string (const union Sass_Value* v);
  //bool sass_value_is_boolean (const union Sass_Value* v);
  //bool sass_value_is_color (const union Sass_Value* v);
  //bool sass_value_is_list (const union Sass_Value* v);
  //bool sass_value_is_map (const union Sass_Value* v);
  //bool sass_value_is_error (const union Sass_Value* v);
  //bool sass_value_is_warning (const union Sass_Value* v);
  //double sass_number_get_value (const union Sass_Value* v);
  //void sass_number_set_value (union Sass_Value* v, double value);
  //const char* sass_number_get_unit (const union Sass_Value* v);
  //void sass_number_set_unit (union Sass_Value* v, char* unit);
  //const char* sass_string_get_value (const union Sass_Value* v);
  //void sass_string_set_value (union Sass_Value* v, char* value);
  //bool sass_string_is_quoted(const union Sass_Value* v);
  //void sass_string_set_quoted(union Sass_Value* v, bool quoted);
  //bool sass_boolean_get_value (const union Sass_Value* v);
  //void sass_boolean_set_value (union Sass_Value* v, bool value);
  //double sass_color_get_r (const union Sass_Value* v);
  //void sass_color_set_r (union Sass_Value* v, double r);
  //double sass_color_get_g (const union Sass_Value* v);
  //void sass_color_set_g (union Sass_Value* v, double g);
  //double sass_color_get_b (const union Sass_Value* v);
  //void sass_color_set_b (union Sass_Value* v, double b);
  //double sass_color_get_a (const union Sass_Value* v);
  //void sass_color_set_a (union Sass_Value* v, double a);
  //size_t sass_list_get_length (const union Sass_Value* v);
  //enum Sass_Separator sass_list_get_separator (const union Sass_Value* v);
  //void sass_list_set_separator (union Sass_Value* v, enum Sass_Separator value);
  //bool sass_list_get_is_bracketed (const union Sass_Value* v);
  //void sass_list_set_is_bracketed (union Sass_Value* v, bool value);
  //union Sass_Value* sass_list_get_value (const union Sass_Value* v, size_t i);
  //void sass_list_set_value (union Sass_Value* v, size_t i, union Sass_Value* value);
  //size_t sass_map_get_length (const union Sass_Value* v);
  //union Sass_Value* sass_map_get_key (const union Sass_Value* v, size_t i);
  //void sass_map_set_key (union Sass_Value* v, size_t i, union Sass_Value*);
  //union Sass_Value* sass_map_get_value (const union Sass_Value* v, size_t i);
  //void sass_map_set_value (union Sass_Value* v, size_t i, union Sass_Value*);
  //char* sass_error_get_message (const union Sass_Value* v);
  //void sass_error_set_message (union Sass_Value* v, char* msg);
  //char* sass_warning_get_message (const union Sass_Value* v);
  //void sass_warning_set_message (union Sass_Value* v, char* msg);
});

export { SassTag, SassSeparator, SassOP, wrapSassValue };
