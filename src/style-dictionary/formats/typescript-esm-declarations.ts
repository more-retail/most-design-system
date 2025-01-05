import { format } from "prettier";
import { fileHeader } from "style-dictionary/utils";
import {
  FormatFn,
  FormatFnArguments,
  DesignToken,
} from "style-dictionary/types";

/**
 * jsonToNestedValue
 * @description creates a nested json three where every final value is the `.value` prop
 * @param token StyleDictionary.DesignToken
 * @returns nested json three
 */
const jsonToNestedValue = (token: DesignToken | Record<string, unknown>) => {
  // is non-object value
  if (!token || typeof token !== "object") return token;
  // is design token
  if ("value" in token) return token.value;
  if ("$value" in token) return token.$value;
  // is obj
  const nextObj = {};
  for (const [prop, value] of Object.entries(token)) {
    // @ts-expect-error: can't predict type
    nextObj[prop] = jsonToNestedValue(value);
  }
  return nextObj;
};

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

  let result = isRoot ? `export type ${rootName} = {\n` : "{\n";

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
 * Generates TypeScript ESM declarations for design tokens
 * @author Lukas Oppermann
 * @see https://github.com/lukasoppermann/style-dictionary-utils/blob/main/src/format/typescript-esm-declarations.ts
 */
export const typescriptEsmDeclarations: FormatFn = async ({
  dictionary,
  file,
  options,
}: FormatFnArguments) => {
  const tokens = dictionary.tokens;

  // Get root name from file options or use default
  const rootName = file.options?.rootName || "DesignToken";

  // Convert to typescript type definition
  const values = jsonToTypes(jsonToNestedValue(tokens), "  ", rootName, true);

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
