import Color, { type ColorInstance } from "color";

import { getRandomInclusive } from "@/utils/math";

import {
  DEFAULT_HUE_OFFSET,
  DEFAULT_MAX_LIGHTNESS,
  DEFAULT_MIN_LIGHTNESS,
  DEFAULT_SATURATION,
  SAVED_SWATCHES_KEY,
} from "./constants";
import { InternalSwatch, Swatch, SwatchMode } from "./types";

export function getRandomColor(): ColorInstance {
  return Color.hsl(
    getRandomInclusive(0, 360),
    DEFAULT_SATURATION,
    getRandomInclusive(DEFAULT_MIN_LIGHTNESS, DEFAULT_MAX_LIGHTNESS),
  );
}

export function getRandomInternalSwatch(
  mode: InternalSwatch["mode"] | null | undefined = "gradient",
): InternalSwatch {
  const normalizedMode = mode ?? "gradient";
  switch (normalizedMode) {
    case "solid": {
      return {
        mode: "solid",
        color: getRandomColor(),
      };
    }
    case "gradient": {
      const primaryColor = getRandomColor();
      const secondaryColor = primaryColor.rotate(DEFAULT_HUE_OFFSET);
      return {
        mode: "gradient",
        colors: [primaryColor, secondaryColor],
      };
    }
    default: {
      const _exhaustiveCheck: never = normalizedMode;
      throw new Error(`Unhandled swatch mode: ${_exhaustiveCheck}`);
    }
  }
}

export function getRandomSwatch(
  mode: InternalSwatch["mode"] | null | undefined = "gradient",
): Swatch {
  return convertInternalSwatchToSwatch(getRandomInternalSwatch(mode));
}

export function convertSwatchToInternalSwatch(swatch: Swatch): InternalSwatch {
  switch (swatch.mode) {
    case "solid": {
      return {
        mode: "solid",
        color: Color(swatch.color),
      };
    }
    case "gradient": {
      return {
        mode: "gradient",
        colors: [Color(swatch.colors[0]), Color(swatch.colors[1])],
      };
    }
    default: {
      // @ts-expect-error: swatch type is narrowed above, this is for exhaustive check
      throw new Error(`Unhandled swatch type: ${swatch.mode}`);
    }
  }
}

export function convertInternalSwatchToSwatch(swatch: InternalSwatch): Swatch {
  switch (swatch.mode) {
    case "solid":
      return {
        mode: "solid",
        color: swatch.color.hex(),
      };
    case "gradient":
      return {
        mode: "gradient",
        colors: [swatch.colors[0].hex(), swatch.colors[1].hex()],
      };
    default: {
      // @ts-expect-error: swatch type is narrowed above, this is for exhaustive check
      throw new Error(`Unhandled swatch type: ${swatch.mode}`);
    }
  }
}

export function clampColor(color: ColorInstance): ColorInstance {
  const l = Math.max(
    DEFAULT_MIN_LIGHTNESS,
    Math.min(DEFAULT_MAX_LIGHTNESS, color.lightness()),
  );
  return color.saturationl(DEFAULT_SATURATION).lightness(l);
}

export function clampInternalSwatch(swatch: InternalSwatch): InternalSwatch {
  switch (swatch.mode) {
    case "solid": {
      return {
        mode: "solid",
        color: clampColor(swatch.color),
      };
    }
    case "gradient": {
      if (swatch.colors[0].hex() === swatch.colors[1].hex())
        return {
          mode: "solid",
          color: clampColor(swatch.colors[0]),
        };

      const clampedPrimaryColor = clampColor(swatch.colors[0]);

      const hueOffset = swatch.colors[0].hue() - swatch.colors[0].hue();
      const clampedHueOffset =
        Math.abs(hueOffset) === DEFAULT_HUE_OFFSET
          ? hueOffset
          : DEFAULT_HUE_OFFSET;

      const clampedSecondaryColor =
        clampedPrimaryColor.rotate(clampedHueOffset);

      return {
        mode: "gradient",
        colors: [clampedPrimaryColor, clampedSecondaryColor],
      };
    }
  }
}

export function getLastSavedMode(): SwatchMode | null {
  if (typeof window === "undefined") return null;

  try {
    const item = window.localStorage.getItem(SAVED_SWATCHES_KEY);
    const parsed: unknown = item ? JSON.parse(item) : [];

    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      typeof parsed[0] === "object" &&
      parsed[0] !== null &&
      "mode" in parsed[0]
    ) {
      return parsed[0].mode;
    }
  } catch (error) {
    console.error("Error reading last mode from saved swatches", error);
  }

  return null;
}
