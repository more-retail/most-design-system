import type { ColorInstance } from "color";

export type Swatch =
  | { mode: "solid"; color: string }
  | { mode: "gradient"; colors: [string, string] };

export type InternalSwatch =
  | { mode: "solid"; color: ColorInstance }
  | { mode: "gradient"; colors: [ColorInstance, ColorInstance] };

export type SwatchMode = Swatch["mode"];
