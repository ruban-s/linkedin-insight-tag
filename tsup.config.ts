import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  outExtension({ format }) {
    return { js: format === "cjs" ? ".cjs.js" : ".esm.js" };
  },
  dts: true,
  external: ["react"],
  clean: true,
  sourcemap: true,
});
