import type { Configuration } from "lint-staged";

const config: Configuration = {
  "!(*.js|*.jsx|*.ts|*.tsx)": "prettier --ignore-unknown --write",
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
};

export default config;
