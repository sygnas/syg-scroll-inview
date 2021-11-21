// https://zenn.dev/yuki0410/articles/74f80c4243919ea2a247-2

import pluginNodeResolve from "@rollup/plugin-node-resolve";
import pluginCommonjs from "@rollup/plugin-commonjs";
import pluginTypescript from "@rollup/plugin-typescript";
import { babel as pluginBabel } from "@rollup/plugin-babel";
import { terser as pluginTerser } from "rollup-plugin-terser";
import * as path from "path";
import pkg from "./package.json";

const paths = {
  root: '/',
  source: {
    root: './src/',
  },
  dist: {
    root: './dist/',
  },
};


// ブラウザ用設定
const configureBrorser = {
  input: 'src/index.ts',
  output: [
    // minifyしないで出力
    {
      name: pkg.moduleName,
      file: pkg.browser,
      format: 'iife',
      sourcemap: 'inline',
    },
    // minifyして出力
    {
      name: pkg.moduleName,
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'iife',
      plugins: [
        // minify用プラグイン
        pluginTerser(),
      ],
    }
  ],
  plugins: [
    pluginTypescript(),
    pluginCommonjs({
      extensions: [".js", ".ts"],
    }),
    pluginBabel({
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
  output: [
    {
      file: pkg.module,
      format: 'es',
      // sourcemap: 'inline',
      exports: "named",
    },
  ],
  // 他モジュールを含めない
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ],
  plugins: [
    pluginTypescript(),
    pluginBabel({
      babelHelpers: "bundled",
      configFile: path.resolve(__dirname, ".babelrc.js"),
    }),
  ],
};



// CommonJS用設定
const configureCommonJS = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      // sourcemap: 'inline',
      exports: "default",
    },
  ],
  // 他モジュールを含めない
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ],
  plugins: [
    pluginTypescript(),
    pluginBabel({
      babelHelpers: "bundled",
      configFile: path.resolve(__dirname, ".babelrc.js"),
    }),
  ],
};


export default [
  configureBrorser,
  configureESModule,
  configureCommonJS,
];