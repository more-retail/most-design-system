import type { TransformedToken, ValueTransform } from "style-dictionary/types";

function convertNestedObjectToStrings(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertNestedObjectToStrings(item));
  } else if (typeof obj === "object" && obj !== null) {
    const result: Record<string, unknown> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = convertNestedObjectToStrings(
          (obj as Record<string, unknown>)[key]
        );
      }
    }
    return result;
  } else {
    return String(obj);
  }
}

/**
 * Transform the values of a typography token to the value formats React Native expects
 */
export const contentString: ValueTransform = {
  name: "content/string",
  type: "value",
  transitive: true,
  transform: (token: TransformedToken) => {
    const value = token.value ?? token.$value;

    return convertNestedObjectToStrings(value);
  },
};
