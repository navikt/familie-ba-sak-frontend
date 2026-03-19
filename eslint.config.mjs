import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    js.configs.recommended,
    eslintConfigPrettier,
    jsxA11yPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    ...tseslint.configs.recommended,
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            prettier: prettier,
            'react-hooks': reactHooks, // TODO : sett til recommended når custom rules ikke lengre er nødvendig, se https://www.npmjs.com/package/eslint-plugin-react-hooks
        },

        languageOptions: {
            globals: {
                ...globals.node,
            },

            parser: tseslint.parser,
            ecmaVersion: 2020,
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        settings: {
            react: {
                version: 'detect',
            },
        },

        rules: {
            // Core hooks rules
            'react-hooks/rules-of-hooks': 'warn', // TODO : Sett til error når problemene er fikset
            'react-hooks/exhaustive-deps': 'warn',

            // React Compiler rules
            'react-hooks/config': 'error',
            'react-hooks/error-boundaries': 'error',
            'react-hooks/component-hook-factories': 'error',
            'react-hooks/gating': 'error',
            'react-hooks/globals': 'error',
            'react-hooks/immutability': 'warn', // TODO : Sett til error når problemene er fikset
            'react-hooks/preserve-manual-memoization': 'warn', // TODO : Sett til error når problemene er fikset
            'react-hooks/purity': 'error',
            'react-hooks/refs': 'warn', // TODO : Sett til error når problemene er fikset
            'react-hooks/set-state-in-effect': 'warn', // TODO : Sett til error når problemene er fikset
            'react-hooks/set-state-in-render': 'error',
            'react-hooks/static-components': 'error',
            'react-hooks/unsupported-syntax': 'warn',
            'react-hooks/use-memo': 'error',
            'react-hooks/incompatible-library': 'warn',

            'no-case-declarations': 'off',

            'import/extensions': [
                'off',
                'ignorePackages',
                {
                    js: 'never',
                    jsx: 'never',
                    ts: 'never',
                    tsx: 'never',
                },
            ],

            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/ban-ts-ignore': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'prettier/prettier': 'error',
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/no-var-requires': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',

            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    args: 'all',
                    argsIgnorePattern: '^_',
                },
            ],

            'import/named': 'error',
            'import/namespace': 'error',
            'import/default': 'error',
            'import/export': 'error',

            'import/order': [
                'error',
                {
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },

                    'newlines-between': 'always',
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],

                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '@navikt/**',
                            group: 'internal',
                            position: 'before',
                        },
                    ],

                    pathGroupsExcludedImportTypes: ['builtin'],
                },
            ],
        },
    },
];
