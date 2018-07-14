import * as path from 'path';
import * as uglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as webpack from 'webpack';

module.exports = {
  mode: 'production',
  entry: './src/verbose.ts',
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cli.bundle.js',
    library: '',
    libraryTarget: 'commonjs'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  target: 'node',

  module: {
    // configuration regarding modules
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$|\.tsx$/,
        exclude: ['node_modules'],
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [
    new uglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          ecma: 6,
          pure_getters: true,
          passes: 3,
          sequences: false,
          dead_code: true
        },
        output: { comments: false, beautify: false }
      }
    }),
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })
  ]
};
