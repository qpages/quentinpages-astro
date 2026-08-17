import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ["dist/", ".astro/"],
  },
);
