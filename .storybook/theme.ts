import { create } from "storybook/theming";

import tokens from "../src/tokens/js/tokens.js";

const { semantic } = tokens.color;

export default create({
  base: "light",

  brandTitle: "most",
  brandUrl: "/",
  brandImage: "/images/most-design-system-logo.png",
  brandTarget: "_self",

  colorPrimary: semantic.content.brand,
  colorSecondary: semantic.content.tertiary,

  appBg: semantic.surface.secondary,
  appContentBg: semantic.surface.primary,
  appPreviewBg: semantic.surface.primary,
  appBorderColor: "transparent",
  appBorderRadius: 16, // hand-picked, not token-sourced (no radius tokens yet)

  textColor: semantic.content.primary,
  textInverseColor: semantic.content.primary,
  textMutedColor: semantic.content.secondary,

  barTextColor: semantic.content.secondary,
  barSelectedColor: semantic.content.brand,
  barHoverColor: "red",
  barBg: semantic.surface.primary,

  inputBg: semantic.surface.secondary,
  inputBorder: "transparent",
  inputTextColor: semantic.content.primary,
  inputBorderRadius: 12,

  fontBase: "DM Sans, sans-serif",
  fontCode: "DM Mono, monospace",
});
