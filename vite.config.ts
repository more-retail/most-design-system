import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";
import preserveDirectives from "rollup-preserve-directives";
import dts from "unplugin-dts/vite";
import svgr from "vite-plugin-svgr";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      bundleTypes: true,
      include: ["src"],
    }),
    preserveDirectives(),
    svgr(),
  ],
  resolve: {
    alias: {
      "@/utils": resolve(__dirname, "./src/utils"),
      "@/storybook": resolve(__dirname, "./.storybook"),
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MostDesignSystem",
      formats: ["es"],
      fileName: "most-design-system",
    },
    rolldownOptions: {
      external: ["react", "react-dom", "tailwindcss"],
    },
  },
});
