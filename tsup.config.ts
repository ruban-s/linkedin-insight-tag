import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/next.tsx"],
  format: ["cjs", "esm"],
  outExtension({ format }) {
    return { js: format === "cjs" ? ".cjs.js" : ".esm.js" };
  },
  dts: true,
  external: ["react", "next", "next/script"],
  clean: true,
  sourcemap: false,
});
