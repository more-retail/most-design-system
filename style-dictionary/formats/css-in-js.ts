import { format } from "oxfmt";
import type { FormatFn, FormatFnArguments } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";

/**
 * Outputs composite tokens in CSS-in-JS syntax format
 */
export const cssInJs: FormatFn = async ({
  file,
  dictionary,
}: FormatFnArguments) => {
  const cssInJsTokens = dictionary.allTokens.reduce(
    (result: Record<string, unknown>, token) => {
      if (typeof token.$value === "object") {
        result["." + token.name] = token.$value;
      }
      return result;
    },
    {},
  );

  const output =
    (await fileHeader({ file })) +
    "export default " +
    JSON.stringify(cssInJsTokens, null, 2);

  // Return prettified
  return (await format("tokens.ts", output, { printWidth: 500 })).code;
};
