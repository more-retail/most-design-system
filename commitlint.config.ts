import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  plugins: [
    "@somehow-digital/commitlint-plugin-spellcheck",
    "commitlint-plugin-tense",
    {
      rules: {
        "subject-no-space-before-comma": (parsed) => {
          const { subject } = parsed;
          return [
            !/\s,/.test(subject ?? ""),
            "subject may not have a space before a comma",
          ];
        },
      },
    },
  ],
  rules: {
    "spellcheck/subject": [2, "always"],
    "spellcheck/body": [2, "always"],
    "spellcheck/footer": [2, "always"],
    "tense/subject-tense": [
      2,
      "always",
      {
        allowedTenses: ["present-imperative"],
        firstOnly: true,
      },
    ],
    "subject-no-space-before-comma": [2, "always"],
  },
};

export default Configuration;
