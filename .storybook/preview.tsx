import * as addonDocsAnnotations from "@storybook/addon-docs/preview";
import { definePreview } from "@storybook/react-vite";
import "@more-retail/fonts/fabriga";
import "@more-retail/fonts/dm-sans/variable";
import "@more-retail/fonts/dm-mono";
import "@more-retail/fonts/fraunces/variable";

import "../src/styles.css";

import theme from "./theme";

export default definePreview({
  addons: [addonDocsAnnotations],
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on.*" },
    docs: { theme, codePanel: true, canvas: { sourceState: "shown" } },
  },
});
