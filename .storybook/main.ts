import { defineMain } from "@storybook/react-vite/node";

export default defineMain({
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  features: { interactions: false },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      tsconfigPath: "tsconfig.app.json",
      exclude: [".storybook/**"],
    },
  },
  staticDirs: [
    { from: "../src/tokens/css", to: "/tokens" },
    { from: "../docs/images", to: "/images" },
  ],
  async viteFinal(config) {
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include ?? []),
        "@base-ui/react/select",
        "@base-ui/react/input",
        "@base-ui/react/toggle",
      ],
    };
    return config;
  },
});
