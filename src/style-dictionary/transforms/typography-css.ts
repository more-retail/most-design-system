import { isTypography } from "../filters/is-typography";
import type { TransformedToken, ValueTransform } from "style-dictionary/types";

interface TypographyValue {
  fontFamily?: string;
  name?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
  fontVariationSettings?: string; // Optional, for variable fonts
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-family
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-size
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings
 */
interface TypographyCssValue {
  "font-family"?: string;
  "font-size"?: number | string;
  "font-weight"?: number | string;
  "letter-spacing"?: number | string;
  "line-height"?: number | string;
  "font-variation-settings"?: string; // Optional, for variable fonts
}

/**
 * Transform the values of a typography token to a CSS class with all the typography properties
 */
export const typographyCss: ValueTransform = {
  name: "typography/css",
  type: "value",
  transitive: true,
  filter: isTypography,
  transform: (token: TransformedToken) => {
    const value =
      (token.value as TypographyValue) ?? (token.$value as TypographyValue);

    const transformed: TypographyCssValue = {};

    const mappings: Record<
      keyof TypographyValue,
      keyof TypographyCssValue | null
    > = {
      name: null, // `name` is not mapped to a CSS property
      fontFamily: "font-family",
      fontSize: "font-size",
      fontWeight: "font-weight",
      letterSpacing: "letter-spacing",
      lineHeight: "line-height",
      fontVariationSettings: "font-variation-settings",
    };

    for (const [key, cssKey] of Object.entries(mappings)) {
      if (cssKey !== null && value[key as keyof TypographyValue]) {
        transformed[cssKey] = value[key as keyof TypographyValue];
      }
    }

    return transformed;
  },
};
