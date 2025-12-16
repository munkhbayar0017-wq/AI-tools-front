import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "unused-imports": unusedImports,
    },
    rules: {
      /* 1️⃣ No unused imports */
      "unused-imports/no-unused-imports": "error",

      /* 2️⃣ No unused variables */
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-unused-vars": "off",

      /* 3️⃣ Enforce type-only imports */
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],

      /* 4️⃣ Enforce type instead of interface */
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],

      /* 5️⃣ Disallow any */
      "@typescript-eslint/no-explicit-any": "error",

      /* 7️⃣ Type-aware async safety */
      "@typescript-eslint/no-floating-promises": "error",

      /* 8️⃣ Strict equality */
      eqeqeq: ["error", "always"],

      /* 9️⃣ Prefer const */
      "prefer-const": "error",

      /* 🔟 No shadowing */
      "@typescript-eslint/no-shadow": "error",
      "no-shadow": "off",

      /* 🔟 Max line length */
      "max-lines": ["error", { max: 180 }],
    },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
