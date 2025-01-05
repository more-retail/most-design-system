import { fileHeader } from "style-dictionary/utils";
import type { FormatFn, FormatFnArguments } from "style-dictionary/types";
import prettier from "@prettier/sync";

const { format } = prettier;

/**
 * Outputs composite tokens in CSS-in-JS syntax format
 */
export const cssInJs: FormatFn = async ({
  file,
  dictionary,
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

  const output =
    (await fileHeader({ file })) +
    "export default " +
    JSON.stringify(cssInJsTokens, null, 2);

  // Return prettified
  return format(output, {
    parser: "typescript",
    printWidth: 500,
    ...options?.prettier,
  });
};
