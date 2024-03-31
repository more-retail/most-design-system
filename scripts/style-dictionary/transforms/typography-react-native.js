import StyleDictionary from "style-dictionary";
import { isTypography } from "style-dictionary-utils/dist/filter/isTypography.js";
import { dimensionToPixelUnitless } from "style-dictionary-utils/dist/transformer/dimension-to-pixelUnitless.js"
import { fontWeightToNumber } from "style-dictionary-utils/dist/transformer/font-weight-to-number.js";

/**
 * typographyReactNative
 * @description transform the values of a typography token to the value formats React Native expects
 */
const transformer = ({ value }) => {
  let transformed = {};

  transformed.fontFamily = value.fontFamily;

  const token = {};
  token.name = value.name;

  token.value = value.fontSize;
  transformed.fontSize = dimensionToPixelUnitless.transformer(token);

  token.value = value.fontWeight.toString();
  transformed.fontWeight = fontWeightToNumber.transformer(token);

  token.value = value.letterSpacing;
  transformed.letterSpacing = dimensionToPixelUnitless.transformer(token);

  token.value = value.lineHeight;
  transformed.lineHeight = dimensionToPixelUnitless.transformer(token);

  return transformed;
}

export default StyleDictionary.registerTransform({
  name: 'typography/reactNative',
  type: 'value',
  transitive: true,
  matcher: isTypography,
  transformer
});