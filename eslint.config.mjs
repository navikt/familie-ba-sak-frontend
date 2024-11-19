import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import js from "@eslint/js";
import eslintConfigPrittier from "eslint-config-prettier";
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';

export default [
    js.configs.recommended,
    eslintConfigPrittier,
    jsxA11yPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    ...tseslint.configs.recommended,
    {
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            prettier: prettier,
            import: importPlugin,
        },

        languageOptions: {
            globals: {
                ...globals.node,
            },

            parser: tseslint.parser,
            ecmaVersion: 2020,
            sourceType: "module",

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            "no-case-declarations": "off",

            "import/extensions": ["off", "ignorePackages", {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            }],

            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/ban-ts-ignore": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "prettier/prettier": "error",
            "@typescript-eslint/interface-name-prefix": "off",
            "@typescript-eslint/no-var-requires": "warn",
            "@typescript-eslint/explicit-function-return-type": "off",

            "@typescript-eslint/no-unused-vars": ["warn", {
                vars: "all",
                args: "all",
                argsIgnorePattern: "^_",
            }],

            "import/named": "error",
            "import/namespace": "error",
            "import/default": "error",
            "import/export": "error",

            "import/order": ["error", {
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },

                "newlines-between": "always",
                groups: ["builtin", "external", "internal", ["parent", "sibling"], "index"],

                pathGroups: [{
                    pattern: "react",
                    group: "external",
                    position: "before",
                }, {
                    pattern: "@navikt/**",
                    group: "internal",
                    position: "before",
                }],

                pathGroupsExcludedImportTypes: ["builtin"],
            }],
        },
}];