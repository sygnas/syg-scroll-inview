import pluginNodeResolve from "@rollup/plugin-node-resolve";
import pluginCommonjs from "@rollup/plugin-commonjs";
import pluginTypescript from "@rollup/plugin-typescript";
import { babel as pluginBabel } from "@rollup/plugin-babel";
import * as path from "path";


// ブラウザ用設定
const configure = {
  input: path.resolve(__dirname, 'demo/src/demo.ts'),
  output: [
    // minifyしないで出力
    {
      file: path.resolve(__dirname, 'demo/bundle.js'),
      format: 'iife',
      sourcemap: 'inline',
    },
  ],
  plugins: [
    pluginTypescript({

    }),
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


export default configure;
