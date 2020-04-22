module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react-app/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react-app', 'prettier'],
    rules: {
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
        '@typescript-eslint/ban-ts-ignore': ['warn'],
        'prettier/prettier': 'error',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react-app/react-hooks/exhaustive-deps': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
