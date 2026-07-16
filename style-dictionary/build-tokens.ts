import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import StyleDictionary from "style-dictionary";

import { mostFileHeader } from "./fileHeaders/most-file-header";
import { cssInJs } from "./formats/css-in-js";
import { cssTailwind } from "./formats/css-tailwind";
import { cssVariablesFallback } from "./formats/css-variables-fallback";
import { typescriptCssInJsEsmDeclarations } from "./formats/typescript-css-in-js-esm-declarations";
import { typescriptEsmDeclarations } from "./formats/typescript-esm-declarations";
import { contentString } from "./transforms/content-string";
import { sizeScalar } from "./transforms/size-scalar";
import { typographyCss } from "./transforms/typography-css";
import { typographyReactNative } from "./transforms/typography-react-native";

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
      "size/scalar": sizeScalar,
    },
    formats: {
      "css/variables-fallback": cssVariablesFallback,
      "css/in-js": cssInJs,
      "css/tailwind": cssTailwind,
      "typescript/esm-declarations": typescriptEsmDeclarations,
      "typescript/css-in-js-esm-declarations": typescriptCssInJsEsmDeclarations,
    },
  },
  platforms: {
    css: {
      transformGroup: "css",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables-fallback",
          options: {
            outputReferences: true,
            // Opt-in per-token fallback: tokens carrying a `fallback` under
            // `fallbackExtensionKey` use it when `toggleVariable` is enabled,
            // except on displays matching `mediaQuery` (wide-gamut / high-res).
            fallbackExtensionKey: "in.more.most",
            toggleVariable: "--most-design-system-responsive-colors",
            mediaQuery: "@media (color-gamut: p3), (min-resolution: 2x)",
          },
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
        "size/scalar",
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
            outputReferences: true,
            disableDefaultNamespaces: [
              "color",
              "text",
              "tracking",
              "leading",
              "radius",
              "border-width",
              "ring-width",
              "outline-width",
            ],
            // Opt-in per-token fallback: tokens carrying a `fallback` under
            // `fallbackExtensionKey` use it when `toggleVariable` is enabled,
            // except on displays matching `mediaQuery` (wide-gamut / high-res).
            fallbackExtensionKey: "in.more.most",
            toggleVariable: "--most-design-system-responsive-colors",
            mediaQuery: "@media (color-gamut: p3), (min-resolution: 2x)",
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
  void sd.buildAllPlatforms();
}

buildTokens(srcOut);
buildTokens(distOut);
