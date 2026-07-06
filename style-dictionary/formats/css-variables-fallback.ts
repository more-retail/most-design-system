import type {
  FormatFn,
  FormatFnArguments,
  FormattingOptions,
  TransformedToken,
} from "style-dictionary/types";
import { fileHeader, formattedVariables } from "style-dictionary/utils";

/**
 * Shape of the `$extensions` entry that carries a token's fallback value, e.g.
 * `"$extensions": { "<key>": { "fallback": "{color.base.neutral.20}" } }`.
 * Style Dictionary resolves the reference to the referenced token's transformed
 * value (e.g. lowercased hex) before a format runs.
 */
type FallbackExtension = { fallback?: string };

/**
 * Returns a token's resolved fallback value, or `undefined` if the token has no
 * fallback under `extensionKey`.
 */
export const getFallbackValue = (
  token: TransformedToken,
  extensionKey: string,
): string | undefined =>
  (token.$extensions?.[extensionKey] as FallbackExtension | undefined)
    ?.fallback;

/**
 * Private per-token intermediate variable used by the toggle switch, derived
 * from the public toggle variable so the relationship is obvious.
 */
const switchVariable = (tokenName: string, toggleVariable: string): string =>
  `--_${toggleVariable.replace(/^--/, "")}-${tokenName}`;

/**
 * Value expression for a fallback-aware token's public custom property: the
 * intermediate switch, with the token's true value as the `var()` fallback.
 */
export const fallbackTokenValue = (
  token: TransformedToken,
  toggleVariable: string,
): string =>
  `var(${switchVariable(token.name, toggleVariable)}, ${String(token.$value)})`;

/**
 * Toggle + per-token intermediate declarations implementing the opt-in switch.
 *
 * The toggle defaults to `initial` (off), so each intermediate resolves to the
 * guaranteed-invalid value and the public token falls back to its true value.
 * Setting the toggle to an *empty* value makes each intermediate resolve to the
 * token's fallback value, enabling the fallback. Only an empty value enables it.
 */
export const fallbackToggleDeclarations = (
  tokens: TransformedToken[],
  toggleVariable: string,
  extensionKey: string,
  indentation: string,
): string => {
  const toggle = `${indentation}${toggleVariable}: initial;`;
  const intermediates = tokens
    .map(
      (token) =>
        `${indentation}${switchVariable(token.name, toggleVariable)}: var(${toggleVariable}) ${String(getFallbackValue(token, extensionKey))};`,
    )
    .join("\n");
  return `${toggle}\n${intermediates}`;
};

/**
 * Media query block that restores the true value of each fallback-aware token
 * on displays matching `mediaQuery`.
 */
export const fallbackMediaBlock = (
  tokens: TransformedToken[],
  mediaQuery: string,
  indentation: string,
): string => {
  const variables = tokens
    .map(
      (token) =>
        `${indentation}${indentation}--${token.name}: ${String(token.$value)};`,
    )
    .join("\n");
  return `${mediaQuery} {\n${indentation}:root {\n${variables}\n${indentation}}\n}`;
};

/**
 * The `prefix` formatting option means something different for the header
 * comment than for `createPropertyFormatter`, so the built-in `css/variables`
 * format strips it before passing formatting on to the header. Mirror that.
 */
export const formattingWithoutPrefix = (
  formatting: FormattingOptions | undefined,
): FormattingOptions => {
  const clone = structuredClone(formatting) ?? {};
  delete clone.prefix;
  return clone;
};

/**
 * `css/variables` variant that adds an opt-in, per-token fallback value.
 *
 * Tokens annotated with a `fallback` under `options.fallbackExtensionKey` read
 * their fallback value when the toggle (`options.toggleVariable`) is enabled,
 * except on displays matching `options.mediaQuery`, where the true value is
 * restored. When the toggle is off (the default) tokens always resolve to their
 * true value. Because `outputReferences` keeps aliases as `var(--…)`,
 * overriding a base token cascades to every token that references it.
 *
 * Without the fallback options this behaves like the built-in `css/variables`.
 */
export const cssVariablesFallback: FormatFn = async ({
  dictionary,
  options,
  file,
}: FormatFnArguments) => {
  const selector = Array.isArray(options.selector)
    ? options.selector
    : options.selector
      ? [options.selector]
      : [":root"];
  const {
    outputReferences,
    outputReferenceFallbacks,
    usesDtcg,
    formatting,
    sort,
  } = options;
  const extensionKey: string | undefined = options.fallbackExtensionKey;
  const toggleVariable: string | undefined = options.toggleVariable;
  const mediaQuery: string | undefined = options.mediaQuery;

  const header = await fileHeader({
    file,
    formatting: formattingWithoutPrefix(formatting),
    options,
  });
  const indentation: string = formatting?.indentation || "  ";

  const fallbackTokens =
    extensionKey && toggleVariable && mediaQuery
      ? dictionary.allTokens.filter((token) =>
          getFallbackValue(token, extensionKey),
        )
      : [];
  const isFallback = Boolean(
    extensionKey && toggleVariable && mediaQuery && fallbackTokens.length,
  );

  // Fallback-aware tokens read their intermediate switch (true value as the
  // `var()` fallback); every other token is emitted unchanged.
  const tokens =
    isFallback && extensionKey && toggleVariable
      ? dictionary.allTokens.map((token) => {
          if (!getFallbackValue(token, extensionKey)) return token;
          const value = fallbackTokenValue(token, toggleVariable);
          return {
            ...token,
            $value: value,
            original: { ...token.original, $value: value },
          };
        })
      : dictionary.allTokens;

  const variables = formattedVariables({
    format: "css",
    dictionary: { ...dictionary, allTokens: tokens },
    outputReferences,
    outputReferenceFallbacks,
    formatting: {
      ...formatting,
      indentation: indentation.repeat(selector.length),
    },
    usesDtcg,
    sort,
  });

  // Prepend the opt-in switch declarations inside the innermost selector.
  const content =
    isFallback && extensionKey && toggleVariable
      ? `${fallbackToggleDeclarations(fallbackTokens, toggleVariable, extensionKey, indentation.repeat(selector.length))}\n${variables}`
      : variables;

  const nestInSelector = (
    inner: string,
    currentSelector: string,
    selectorIndentation: string,
  ): string =>
    `${selectorIndentation}${currentSelector} {\n${inner}\n${selectorIndentation}}`;

  const nested = selector
    .reverse()
    .reduce(
      (inner, currentSelector, index) =>
        nestInSelector(
          inner,
          currentSelector,
          indentation.repeat(selector.length - 1 - index),
        ),
      content,
    );

  const media =
    isFallback && mediaQuery
      ? `\n\n${fallbackMediaBlock(fallbackTokens, mediaQuery, indentation)}`
      : "";

  return `${header}${nested}${media}\n`;
};
