import pluginTypescript from "@rollup/plugin-typescript";
import { babel as pluginBabel } from "@rollup/plugin-babel";
import * as path from "path";

const extensions = [".ts", ".tsx", ".js", ".jsx"];

export default {
  input: 'demo/src/demo.ts',
  output: [
    {
      file: 'demo/bundle.js',
      sourcemap: true,
      format: 'iife',
    },
  ],
  plugins: [
    pluginTypescript({
      tsconfig: 'tsconfig.demo.json',
    }),
    pluginBabel({
      extensions,
      babelHelpers: 'bundled',
      configFile: path.resolve(__dirname, '.babelrc.js'),
    }),
  ],};


