module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:type-graphql/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      module: true,
      jsx: true,
    },
    project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import", "prettier", "type-graphql"],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true, argsIgnorePattern: "^(type|of|returns)" },
    ],
    "no-unused-vars": "off",
    "type-graphql/invalid-decorated-type": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: ["./tsconfig.json", "packages/*/tsconfig.json"],
      },
    },
  },
};
