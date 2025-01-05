import { isTypography } from "../filters/is-typography";
import type {
  PlatformConfig,
  TransformedToken,
  ValueTransform,
} from "style-dictionary/types";

interface TypographyValue {
  fontFamily: string;
  name: string;
  fontSize: string;
  fontWeight: string;
  letterSpacing: string;
  lineHeight: string;
}

interface TypographyReactNativeValue {
  fontFamily: string;
  fontSize: number | string;
  fontWeight: number | string;
  letterSpacing: number | string;
  lineHeight: number | string;
}

/**
 * Converts a dimension string to a unitless pixel value.
 *
 * @param {string} dimension - The dimension string to convert
 * @param {number} [baseFontSize=16] - The base font size to use for "rem" conversion. Defaults to 16 if not provided.
 * @returns {number} - The converted unitless pixel value.
 * @throws {Error} - Throws an error if the dimension string is invalid.
 */
const dimensionToPixelUnitless = (dimension: string, baseFontSize?: number) => {
  const floatVal = parseFloat(dimension);

  baseFontSize = baseFontSize ? baseFontSize : 16;
  const hasUnit = (value: number | string, unit: string) => {
    if (typeof value === "number") return false;
    return value.includes(unit);
  };

  if (isNaN(floatVal)) {
    throw new Error(`Invalid dimension token value: ${dimension}.' \n`);
  }
  if (floatVal === 0) {
    return 0;
  }
  if (hasUnit(dimension, "rem")) {
    return floatVal * baseFontSize;
  }
  if (hasUnit(dimension, "px")) {
    return floatVal;
  }

  return floatVal;
};

/**
 * Transform the values of a typography token to the value formats React Native expects
 */
export const typographyReactNative: ValueTransform = {
  name: "typography/reactNative",
  type: "value",
  transitive: true,
  filter: isTypography,
  transform: (token: TransformedToken, options?: PlatformConfig) => {
    const value =
      (token.value as TypographyValue) ?? (token.$value as TypographyValue);

    const transformed: TypographyReactNativeValue = {
      fontFamily: value.fontFamily,
      fontSize: dimensionToPixelUnitless(value.fontSize, options?.baseFontSize),
      fontWeight: dimensionToPixelUnitless(
        value.fontWeight,
        options?.baseFontSize
      ),
      letterSpacing: dimensionToPixelUnitless(
        value.letterSpacing,
        options?.baseFontSize
      ),
      lineHeight: dimensionToPixelUnitless(
        value.lineHeight,
        options?.baseFontSize
      ),
    };
    return transformed;
  },
};
