import * as path from "path";
import StyleDictionary from "style-dictionary-utils";

const __dirname = import.meta.dirname;
const srcDir = path.join(__dirname, "..", "tokens");
const distDir = path.join(__dirname, "..", "tokens", "dist");

StyleDictionary.extend({
  source: [`${srcDir}/**/*.tokens.json`],
  platforms: {
    css: {
      buildPath: `${distDir}/css/`,
      transformGroup: "css/extended",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    js: {
      buildPath: `${distDir}/js/`,
      transformGroup: "js",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/esm",
        },
      ],
    },
  },
}).buildAllPlatforms();
