import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import { babel } from "@rollup/plugin-babel";

export default [
  {
    input: "./lib/index.ts",
    plugins: [typescript(), nodeResolve(), commonjs(), babel()],
    output: {
      file: "./package/bundle.js",
      format: "cjs",
    },
  },
  {
    input: "./lib/index.ts",
    output: {
      file: "./package/bundle.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
  {
    input: "./lib/index.ts",
    plugins: [typescript(), babel()],
    output: {
      file: "./package/bundle.mjs",
      format: "es",
    },
  },
];
