module.exports = {
  root: true,
  plugins: ["prettier"],
  extends: [
    "eslint:recommended",
  ],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "arrow-body-style": "off",
  },
  overrides: [
    {
      files: ["*.js"],
      env: {
        node: true,
      },
      rules: {
        "no-unused-vars": "off",
      },
    },
    {
      files: ["pages/*", "src/app/**"],
      extends: ["next/core-web-vitals"],
    },
  ],
}
