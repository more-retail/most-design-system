import type { Configuration } from "lint-staged";

const config: Configuration = {
  "*": ["oxfmt --no-error-on-unmatched-pattern"],
  "*.{js,jsx,ts,tsx}": ["oxlint --fix"],
};

export default config;
