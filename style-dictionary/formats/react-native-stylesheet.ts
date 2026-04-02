import { format } from "prettier";
import { fileHeader } from "style-dictionary/utils";
import type { FormatFn, FormatFnArguments } from "style-dictionary/types";

import { isTypography } from "../filters/is-typography";

/**
 * Determines if a string is a valid JS identifier (safe for dot notation).
 */
const isIdentifier = (s: string) => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(s);

/**
 * Generates `src/tokens/reactNative/stylesheet.ts` — the Tier 2 StyleSheet
 * wrapper that pre-registers all design tokens via StyleSheet.create().
 *
 * The format introspects the token tree to discover typography categories
 * (display, head, para, …) and their scales (10, 20, 30, …) so the output
 * stays in sync with the token source automatically.
 */
export const reactNativeStylesheet: FormatFn = async ({
  dictionary,
  file,
  options,
}: FormatFnArguments) => {
  // ── Collect typography groups ──────────────────────────────────────────────
  // path layout: ["typography", "<category>", "<scale>"]
  const typographyGroups = new Map<string, string[]>();

  for (const token of dictionary.allTokens) {
    if (!isTypography(token)) continue;
    if (token.path[0] !== "typography" || token.path.length < 3) continue;

    const category = token.path[1];
    const scale = token.path[2];

    if (!typographyGroups.has(category)) typographyGroups.set(category, []);
    typographyGroups.get(category)!.push(scale);
  }

  // ── Generate typography section ────────────────────────────────────────────
  const typographyEntries = [...typographyGroups.entries()]
    .map(([category, scales]) => {
      // Object key: quoted when category contains spaces or special chars
      const categoryKey = isIdentifier(category) ? category : `"${category}"`;
      // Property accessor on _tokens object
      const categoryAccess = isIdentifier(category) ? `.${category}` : `["${category}"]`;

      const scaleEntries = scales
        .map((scale) => {
          const ref = `_tokens.typography${categoryAccess}[${scale}]`;
          return `    ${scale}: { ...${ref}, fontWeight: asFontWeight(${ref}.fontWeight) },`;
        })
        .join("\n");

      return `  ${categoryKey}: StyleSheet.create({\n${scaleEntries}\n  }),`;
    })
    .join("\n\n");

  // ── Assemble file ──────────────────────────────────────────────────────────
  const header = await fileHeader({ file });

  const output =
    header +
    `/**
 * React Native StyleSheet token layer
 *
 * Tier 2 bridge between raw design tokens (Tier 1) and components (Tier 3).
 *
 * Why this file exists:
 *   StyleSheet.create() registers styles with the native thread once at module
 *   load. Every reference after that is a cheap numeric ID — no JS object is
 *   serialised on each render. This file pre-registers ALL design tokens so
 *   components only ever look up IDs, never construct plain style objects.
 *
 * Rule: components must import from here, never from tokens.js directly.
 *
 * ⚠️  AUTO-GENERATED — do not edit by hand.
 *     Re-run the token build to regenerate.
 */

import { StyleSheet } from "react-native";

import _tokens from "./tokens";

/* -------------------------------------------------------------------------------------------------
 * Helpers
 * -----------------------------------------------------------------------------------------------*/

/**
 * React Native types fontWeight as a string union ("100"…"900" | "bold" | "normal").
 * Our tokens store it as a number. This cast converts at the type level.
 */
function asFontWeight(value: number): "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" {
  return String(value) as "700";
}

/* -------------------------------------------------------------------------------------------------
 * Color tokens
 * Re-exported as plain values — colors are strings, not StyleSheet objects.
 * StyleSheet.create() only benefits layout/text styles, not string primitives.
 * -----------------------------------------------------------------------------------------------*/

export const color = _tokens.color;

/* -------------------------------------------------------------------------------------------------
 * Spacing tokens
 * Re-exported as the \`.number\` value — the pixel number you pass to RN styles.
 * Usage: spacing[60] → 16
 * -----------------------------------------------------------------------------------------------*/

export const spacing = Object.fromEntries(
  Object.entries(_tokens.spacing).map(([key, val]) => [key, (val as { number: number }).number]),
) as Record<keyof typeof _tokens.spacing, number>;

/* -------------------------------------------------------------------------------------------------
 * Typography tokens — pre-registered via StyleSheet.create()
 * Each entry is a numeric ID. Components use it directly in style props.
 * Usage: style={typography.labelThick[30]}
 * -----------------------------------------------------------------------------------------------*/

export const typography = {

${typographyEntries}

};
`;

  return format(output, {
    parser: "typescript",
    printWidth: 120,
    ...options?.prettier,
  });
};
