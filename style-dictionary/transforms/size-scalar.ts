import type {
  PlatformConfig,
  TransformedToken,
  ValueTransform,
} from "style-dictionary/types";

import { dimensionToScalar } from "../utils/dimension-to-scalar";

/**
 * Transform a dimension token to the unitless scalar value React Native expects.
 *
 * React Native layout props (padding, margin, gap, width, height, …) are
 * unitless and interpreted as density-independent pixels, so `"4px"` must be
 * emitted as `4` rather than a string or the `size/object` wrapper.
 */
export const sizeScalar: ValueTransform = {
  name: "size/scalar",
  type: "value",
  transitive: true,
  filter: (token: TransformedToken) =>
    (token.$type ?? token.type) === "dimension",
  transform: (token: TransformedToken, options?: PlatformConfig) =>
    dimensionToScalar(token.value ?? token.$value, options?.baseFontSize),
};
