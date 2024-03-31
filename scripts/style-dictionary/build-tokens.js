import * as path from "path";
import StyleDictionary from "style-dictionary-utils";

import cssInJs from "./formats/css-in-js.js";
import typographyReactNative from "./transforms/typography-react-native.js";

const __dirname = import.meta.dirname;
const srcDir = path.join(__dirname, "..", "..", "tokens");
const distDir = path.join(__dirname, "..", "..", "tokens", "dist");

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
    reactNative: {
      buildPath: `${distDir}/react-native/`,
      transforms: [
        "name/cti/camel",
        "size/object",
        "color/css",
        "typography/reactNative",
      ],
      files: [
        {
          destination: "tokens.js",
          format: "javascript/esm",
        },
      ],
    },
    cssInJs: {
      buildPath: `${distDir}/css-in-js/`,
      transforms: ["attribute/cti", "name/cti/kebab", "size/rem", "color/hex"],
      files: [
        {
          destination: "tokens.js",
          format: "css/in-js",
        },
      ],
    },
  },
}).buildAllPlatforms();
