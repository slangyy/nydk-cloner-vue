import { defineConfig, globalIgnores } from "eslint/config";
import vue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";

const eslintConfig = defineConfig([
  globalIgnores([
    ".next/**",
    "dist/**",
    "node_modules/**",
    ".worktrees/**",
    "public/assets/**",
  ]),
  ...vue.configs["flat/recommended"],
  ...tseslint.configs.recommended,
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": "off",
      "vue/html-self-closing": "off",
    },
  },
]);

export default eslintConfig;
