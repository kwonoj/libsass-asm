import * as path from 'path';
import * as webpack from 'webpack';
const terserPlugin = require('terser-webpack-plugin'); //tslint:disable-line: no-require-imports no-var-requires

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
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          compilerOptions: {
            module: 'esnext'
          }
        }
      }
    ]
  },

  optimization: {
    minimizer: [new terserPlugin()]
  },

  node: {
    __dirname: false
  },

  plugins: [new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })]
};
