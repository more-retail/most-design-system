import { defineConfig } from "tsup";

export default defineConfig({
  // Native entry — resolves all @/ aliases and bundles src/index.native.ts
  entry: {
    index: "src/index.native.ts",
    stylesheet: "src/tokens/reactNative/stylesheet.ts",
  },

  // Both ESM and CJS:
  //   ESM  → used by modern Metro (RN 0.73+) and the "react-native" export condition
  //   CJS  → used by older Metro versions that read the top-level "main" field
  format: ["esm", "cjs"],

  // Generate .d.ts type declarations
  dts: true,

  // Never bundle react / react-native — they are peer deps installed by the consumer app
  external: ["react", "react-native"],

  // Output alongside the web build without overwriting it
  outDir: "dist/native",

  // Use the native tsconfig so DOM types are excluded and jsx is set correctly
  tsconfig: "./tsconfig.native.json",

  // Keep dist/native/ clean before each native build
  clean: true,

  sourcemap: false,
});
