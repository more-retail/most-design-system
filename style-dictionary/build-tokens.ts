import StyleDictionary from "style-dictionary";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { mostFileHeader } from "./fileHeaders/most-file-header";
import { cssInJs } from "./formats/css-in-js";
import { typescriptEsmDeclarations } from "./formats/typescript-esm-declarations";
import { typescriptCssInJsEsmDeclarations } from "./formats/typescript-css-in-js-esm-declarations";
import { cssTailwind } from "./formats/css-tailwind";
import { typographyCss } from "./transforms/typography-css";
import { typographyReactNative } from "./transforms/typography-react-native";
import { contentString } from "./transforms/content-string";

const __dirname = dirname(fileURLToPath(import.meta.url));

const tokenSrc = resolve(__dirname, "../tokens");
const srcOut = resolve(__dirname, "../src/tokens");
const distOut = resolve(__dirname, "../dist/tokens");

const baseConfig = {
  source: [`${tokenSrc}/**/*.tokens.json`],
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
  platforms: {
    css: {
      transformGroup: "css",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: { outputReferences: true },
        },
      ],
      options: { fileHeader: "most-file-header" },
    },
    js: {
      transformGroup: "js",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/esm",
          options: { minify: true },
        },
        {
          destination: "tokens.d.ts",
          format: "typescript/esm-declarations",
        },
      ],
      options: { fileHeader: "most-file-header" },
    },
    reactNative: {
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
          options: { minify: true },
        },
        { destination: "tokens.d.ts", format: "typescript/esm-declarations" },
      ],
      options: { fileHeader: "most-file-header" },
    },
    cssInJs: {
      transforms: ["attribute/cti", "name/kebab", "content/string"],
      files: [
        { destination: "tokens.js", format: "css/in-js" },
        {
          destination: "tokens.d.ts",
          format: "typescript/css-in-js-esm-declarations",
        },
      ],
      options: { fileHeader: "most-file-header" },
    },
    tailwind: {
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
      options: { fileHeader: "most-file-header" },
    },
  },
  log: { verbosity: "default" as const },
};

function buildTokens(outDir: string) {
  const sd = new StyleDictionary({
    ...baseConfig,
    platforms: Object.fromEntries(
      Object.entries(baseConfig.platforms).map(([name, cfg]) => [
        name,
        { ...cfg, buildPath: `${outDir}/${name}/` },
      ]),
    ),
  });
  sd.buildAllPlatforms();
}

buildTokens(srcOut);
buildTokens(distOut);
