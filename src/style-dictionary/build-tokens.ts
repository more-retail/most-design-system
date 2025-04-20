import * as path from "path";
import StyleDictionary from "style-dictionary";

import { mostFileHeader } from "./fileHeaders/most-file-header";
import { cssInJs } from "./formats/css-in-js";
import { typescriptEsmDeclarations } from "./formats/typescript-esm-declarations";
import { typescriptCssInJsEsmDeclarations } from "./formats/typescript-css-in-js-esm-declarations";
import { cssTailwind } from "./formats/css-tailwind";
import { typographyCss } from "./transforms/typography-css";
import { typographyReactNative } from "./transforms/typography-react-native";
import { contentString } from "./transforms/content-string";

const dirname = import.meta.dirname;
const srcDir = path.join(dirname, "../../tokens");
const distDir = path.join(dirname, "../tokens");

const sd = new StyleDictionary({
  hooks: {
    fileHeaders: {
      "most-file-header": mostFileHeader,
    },
    transforms: {
      "typography/css": typographyCss,
      "typography/reactNative": typographyReactNative,
      "content/string": contentString,
    },
    formats: {
      "css/in-js": cssInJs,
      "typescript/esm-declarations": typescriptEsmDeclarations,
      "typescript/css-in-js-esm-declarations": typescriptCssInJsEsmDeclarations,
      "css/tailwind": cssTailwind,
    },
  },
  source: [`${srcDir}/**/*.tokens.json`],
  platforms: {
    css: {
      buildPath: `${distDir}/css/`,
      transformGroup: "css",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
      options: {
        fileHeader: "most-file-header",
      },
    },
    js: {
      buildPath: `${distDir}/js/`,
      transformGroup: "js",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/esm",
          options: {
            minify: true,
          },
        },
        {
          destination: "tokens.d.ts",
          format: "typescript/esm-declarations",
        },
      ],
      options: {
        fileHeader: "most-file-header",
      },
    },
    reactNative: {
      buildPath: `${distDir}/react-native/`,
      transforms: [
        "name/camel",
        "size/object",
        "color/css",
        "typography/reactNative",
      ],
      files: [
        {
          destination: "tokens.js",
          format: "javascript/esm",
          options: {
            minify: true,
          },
        },
        {
          destination: "tokens.d.ts",
          format: "typescript/esm-declarations",
        },
      ],
      options: {
        fileHeader: "most-file-header",
      },
    },
    cssInJs: {
      buildPath: `${distDir}/css-in-js/`,
      transforms: ["attribute/cti", "name/kebab", "content/string"],
      files: [
        {
          destination: "tokens.js",
          format: "css/in-js",
        },
        {
          destination: "tokens.d.ts",
          format: "typescript/css-in-js-esm-declarations",
        },
      ],
      options: {
        fileHeader: "most-file-header",
      },
    },
    tailwind: {
      buildPath: `${distDir}/tailwind/`,
      transforms: [
        "attribute/cti",
        "name/kebab",
        "color/css",
        "typography/css",
      ],
      files: [
        {
          destination: "tokens.css",
          format: "css/tailwind",
          options: {
            disableDefaultNamespaces: ["color", "text", "tracking", "leading"],
          },
        },
      ],
      options: {
        fileHeader: "most-file-header",
      },
    },
  },
  log: { verbosity: "default" },
});

sd.buildAllPlatforms();
