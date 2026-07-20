import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 80,
  experimentalTailwindcss: {
    stylesheet: "./src/styles.css",
    functions: ["cn", "clsx", "tw", "cva"],
  },
  sortImports: {
    customGroups: [
      {
        groupName: "vite",
        elementNamePattern: ["vite", "vite/*", "@vitejs/**"],
      },
      {
        groupName: "react",
        elementNamePattern: ["react", "react/*", "react-dom", "react-dom/*"],
      },
      {
        groupName: "material-symbols",
        elementNamePattern: ["@material-symbols/**"],
      },
    ],
    groups: [
      "builtin",
      "vite",
      "react",
      "external",
      "internal",
      ["sibling", "index", "parent"],
      "style",
      "unknown",
      "material-symbols",
    ],
    newlinesBetween: true,
  },
  ignorePatterns: ["pnpm-lock.json", "dist/**"],
});
