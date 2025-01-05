import { format } from "prettier";
import { fileHeader } from "style-dictionary/utils";
import { FormatFn, FormatFnArguments } from "style-dictionary/types";

/**
 * jsonToTypes
 * @description creates a typescript type definition from a json object
 * @param json json object
 * @param indent indentation string
 * @param rootName name of the root type
 * @param isRoot is the root type
 * @returns typescript type definition
 */
const jsonToTypes = (
  json: object,
  indent = "  ",
  rootName = "DesignToken",
  isRoot = true
) => {
  // is non-object value
  if (!json || typeof json !== "object") return json;

  let result = isRoot ? `type ${rootName} = {\n` : "{\n";

  Object.entries(json).forEach(([key, value]) => {
    result += `${indent}'${key}': `;
    if (typeof value === "object" && value !== null) {
      result += jsonToTypes(value, `${indent}  `, rootName, false);
    } else {
      result += `${typeof value};\n`;
    }
  });

  result += `${indent.slice(0, -2)}};\n`;
  return result;
};

/**
 * Generates TypeScript ESM declarations for composite design tokens in CSS-in-JS syntax format
 */
export const typescriptCssInJsEsmDeclarations: FormatFn = async ({
  dictionary,
  file,
  options,
}: FormatFnArguments) => {
  const cssInJsTokens = dictionary.allTokens.reduce(
    (result: Record<string, unknown>, token) => {
      if (typeof token.$value === "object") {
        result["." + token.name] = token.$value;
      }
      return result;
    },
    {}
  );

  // Get root name from file options or use default
  const rootName = file.options?.rootName || "DesignToken";

  // Convert to typescript type definition
  const values = jsonToTypes(cssInJsTokens, "  ", rootName, true);

  const output =
    (await fileHeader({ file })) +
    `${values}\n` +
    `declare const tokens: ${rootName};\n` +
    "export default tokens;\n";

  // Return prettified
  return format(output, {
    parser: "typescript",
    printWidth: 500,
    ...options?.prettier,
  });
};
