import { format } from "prettier";
import { fileHeader } from "style-dictionary/utils";
import { FormatFn, FormatFnArguments } from "style-dictionary/types";

/**
 * Generates a CSS block that resets custom properties for the specified Tailwind namespaces.
 *
 * This function creates a CSS `@theme` block where all custom properties
 * (CSS variables) under the provided namespaces are reset to their initial values.
 *
 * @param namespaces - An array of namespace strings. Each namespace represents
 * a prefix for CSS custom properties that should be reset.
 *
 * @returns A string containing the CSS `@theme` block with the reset rules.
 *
 * @example
 * ```typescript
 * const cssReset = disableDefaultNamespaces(['namespace1', 'namespace2']);
 * ```
 *
 * ```css
 * \@theme {
 *   --namespace1-*: initial;
 *   --namespace2-*: initial;
 * }
 * ```
 */
const disableDefaultNamespaces = (namespaces: string[]): string => {
  const resets = namespaces
    .map((namespace) => `  --${namespace}-*: initial;`)
    .join("\n");
  return `@theme {\n${resets}}`;
};

/**
 * Converts a set of tokens into a CSS variables in a Tailwind CSS `@theme` directive.
 *
 * @param tokens - An object where keys are token names (CSS variable names) and
 * values are either numbers or strings representing the token values.
 *
 * @returns A string representing the `@theme` directive with the tokens
 * formatted as CSS variables.
 *
 * @example
 * ```typescript
 * const tokens = {
 *   color-primary: "#ff0000",
 *   spacing-small: 8,
 * };
 * ```
 *
 * ```css
 * \@theme {
 *   --color-primary: "#ff0000";
 *   --spacing-small: 8;
 * }
 * ```
 */
const tokensToThemeDirective = (
  tokens: Record<string, number | string>
): string => {
  const variables = Object.entries(tokens)
    .map(([name, value]) => {
      const formattedValue = isNaN(Number(value)) ? `"${value}"` : value;
      return `  --${name}: ${formattedValue};`;
    })
    .join("\n");
  return `@theme {\n${variables}\n}`;
};

/**
 * Converts a record of composite tokens into a string of Tailwind CSS `@utility` directives.
 *
 * Each key-value pair in the `compositeTokens` object is transformed into a Tailwind CSS
 * `@utility` directive, where the key becomes the utility name and the value is expected
 * to be an object containing CSS properties and their values.
 *
 * @param compositeTokens - A record where each key is a utility name and the value is an object
 * containing CSS properties and their corresponding values.
 * @returns A string containing Tailwind CSS utility directives.
 *
 * @example
 * ```typescript
 * const compositeTokens = {
 *   btnPrimary: {
 *     color: "white",
 *     background-color: "blue",
 *   },
 *   btnSecondary: {
 *     color: "black",
 *     background-color: "gray",
 *   },
 * };
 * ```
 *
 * ```css
 * \@utility btnPrimary {
 *   color: white;
 *   background-color: blue;
 * }
 * \@utility btnSecondary {
 *   color: black;
 *   background-color: gray;
 * }
 * ```
 */
const compositeTokensToUtilityDirectives = (
  compositeTokens: Record<string, unknown>
): string => {
  return Object.entries(compositeTokens)
    .map(([name, value]) => {
      const formattedValue = Object.entries(value as Record<string, unknown>)
        .map(([key, val]) => `  ${key}: ${val};`)
        .join("\n");

      return `@utility ${name} {\n${formattedValue}\n}`;
    })
    .join("\n");
};

/**
 * Generates Tailwind CSS configuration for design tokens
 */
export const cssTailwind: FormatFn = async ({
  dictionary,
  file,
  options,
}: FormatFnArguments) => {
  let values = "";

  if (options.disableDefaultNamespaces?.length)
    values += disableDefaultNamespaces(options.disableDefaultNamespaces);

  const tokens = dictionary.allTokens.reduce(
    (result: Record<string, string | number>, token) => {
      if (typeof token.$value !== "object") {
        result[token.name] = token.$value;
      }
      return result;
    },
    {}
  );
  values += tokensToThemeDirective(tokens);

  const compositeTokens = dictionary.allTokens.reduce(
    (result: Record<string, unknown>, token) => {
      if (typeof token.$value === "object") {
        result[token.name] = token.$value;
      }
      return result;
    },
    {}
  );
  values += compositeTokensToUtilityDirectives(compositeTokens);

  const output = (await fileHeader({ file })) + `${values}\n`;

  // Return prettified
  return format(output, {
    parser: "css",
    printWidth: 500,
    ...options?.prettier,
  });
};
