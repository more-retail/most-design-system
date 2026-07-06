import type {
  PlatformConfig,
  TransformedToken,
  ValueTransform,
} from "style-dictionary/types";

import { isTypography } from "../filters/is-typography";
import { dimensionToScalar } from "../utils/dimension-to-scalar";

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
      fontSize: dimensionToScalar(value.fontSize, options?.baseFontSize),
      fontWeight: dimensionToScalar(value.fontWeight, options?.baseFontSize),
      letterSpacing: dimensionToScalar(
        value.letterSpacing,
        options?.baseFontSize,
      ),
      lineHeight: dimensionToScalar(value.lineHeight, options?.baseFontSize),
    };
    return transformed;
  },
};
