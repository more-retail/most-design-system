import StyleDictionary from "style-dictionary";
import prettier from "@prettier/sync";

const { format } = prettier;
const { fileHeader } = StyleDictionary.formatHelpers;

/**
 * typographyReactNative
 * @description Outputs composite tokens in a CSS-in-JS syntax format
 */
const formatter = (dictionary, file, options) => {
  const output =
    fileHeader({ file }) +
    "export default {\n" +
    dictionary.allTokens
      .map((token) => {
        if (typeof token.value === "object")
          return `  ".${token.name}": ${JSON.stringify(token.value, null, 4)}`;
      })
      .filter(Boolean)
      .join(",\n") +
    "\n};\n";

  return format(output, {
    parser: "typescript",
    printWidth: 500,
    ...options?.prettier,
  });
};

export default StyleDictionary.registerFormat({ name: "css/in-js", formatter });
