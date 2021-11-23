// https://zenn.dev/yuki0410/articles/74f80c4243919ea2a247-2
// https://qiita.com/knjname/items/0c521a81ff2695a94368

import pluginNodeResolve from '@rollup/plugin-node-resolve';
import pluginCommonjs from '@rollup/plugin-commonjs';
import pluginTypescript from '@rollup/plugin-typescript';
import { babel as pluginBabel } from '@rollup/plugin-babel';
import { terser as pluginTerser } from 'rollup-plugin-terser';
import * as path from 'path';
import pkg from './package.json';

const paths = {
  root: '/',
  source: {
    root: './src/',
  },
  dist: {
    root: './dist/',
  },
};

const extensions = ['.ts', '.tsx', '.js', '.jsx'];


// ブラウザ用設定
const configureBrorser = {
  input: 'src/index.ts',
  output: [
    // minifyしないで出力
    {
      name: pkg.moduleName,
      file: pkg.browser,
      format: 'iife',
      sourcemap: true,
    },
    // minifyして出力
    {
      name: pkg.moduleName,
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'iife',
      sourcemap: true,
      plugins: [
        // minify用プラグイン
        pluginTerser(),
      ],
    }
  ],
  plugins: [
    pluginTypescript({
      sourceMap: true,
      inlineSources: true,
    }),
    pluginCommonjs({
      extensions: [".js", ".ts"],
    }),
    pluginBabel({
      extensions,
      babelHelpers: "bundled",
      configFile: path.resolve(__dirname, ".babelrc.js"),
    }),
    pluginNodeResolve({
      browser: true,
    }),
  ],
};


// ESモジュール用設定
const configureESModule = {
  input: 'src/index.ts',
  preserveModules: true,
  output: [
    {
      dir: 'dist/es6',
      format: 'es',
      sourcemap: true,
      exports: 'named',
    },
  ],
  // 他モジュールを含めない
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ],
  plugins: [
    pluginTypescript({
      declaration: true,
      rootDir: 'src',
      declarationDir: 'dist/es6',
    }),
    pluginBabel({
      extensions,
      babelHelpers: 'bundled',
      configFile: path.resolve(__dirname, '.babelrc.js'),
    }),
  ],
};



// CommonJS用設定
const configureCommonJS = {
  input: 'src/index.ts',
  preserveModules: true,
  output: [
    {
      dir: 'dist/commonjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
  ],
  // 他モジュールを含めない
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ],
  plugins: [
    pluginTypescript({
      declaration: true,
      rootDir: 'src',
      declarationDir: 'dist/commonjs',
    }),
    pluginBabel({
      extensions,
      babelHelpers: 'bundled',
      configFile: path.resolve(__dirname, '.babelrc.js'),
    }),
  ],
};


export default [
  configureBrorser,
  configureESModule,
  configureCommonJS,
];