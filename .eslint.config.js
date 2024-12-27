export default {
  extends: [
    "plugin:astro/recommended",
    "plugin:astro/jsx-a11y-strict",
    "plugin:astro/jsx-a11y-recommended",
    "plugin:@pandacss/recommended",
  ],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      processor: "astro/client-side-ts",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      plugins: ["prettier"],
      rules: {
        "spaced-comment": "error",
        "no-duplicate-imports": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/prefer-interface": "off",
        "@typescript-eslint/no-angle-bracket-type-assertion": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "@typescript-eslint/no-triple-slash-reference": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "prettier/prettier": "off",
      },
    },
    {
      files: ["**/*.ts", "*.ts"],
      env: {
        browser: true,
        es2020: true,
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@pandacss/recommended",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: null,
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "prefer-rest-params": "off",
        "prettier/prettier": "off",
      },
    },
  ],
};
