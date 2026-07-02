import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    typeAware: true,
    typeCheck: true,
  },
  plugins: [
    "react",
    "typescript",
    "unicorn",
    "eslint",
    "import",
    "react-perf",
    "oxc",
    "jsdoc",
    "jsx-a11y",
  ],
  env: { browser: true },
  ignorePatterns: ["pnpm-lock.json", "dist/**"],
});
