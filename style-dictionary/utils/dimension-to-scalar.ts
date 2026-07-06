/**
 * Converts a dimension string to a unitless scalar pixel value.
 *
 * @param {string} dimension - The dimension string to convert
 * @param {number} [baseFontSize] - The base font size to use for "rem" conversion. Defaults to 16 if not provided.
 * @returns {number} - The converted unitless scalar pixel value.
 * @throws {Error} - Throws an error if the dimension string is invalid.
 */
export const dimensionToScalar = (dimension: string, baseFontSize?: number) => {
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
