/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TypeScriptTypeChecker = require('fork-ts-checker-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: {
        'familie-ba-sak-frontend': ['./src/frontend/index.tsx'],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [
                    {
                        options: {
                            eslintPath: require.resolve('eslint'),
                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
            },
            {
                test: /\.(js|ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.(less|css)$/,
                use: [
                    { loader: require.resolve('style-loader') },
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            modules: {
                                compileType: 'icss',
                            },
                        },
                    },
                    { loader: require.resolve('less-loader') },
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        runtimeChunk: true,
        emitOnErrors: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(process.cwd(), 'src/frontend/index.html'),
            inject: 'body',
            alwaysWriteToDisk: true,
        }),
        new TypeScriptTypeChecker({
            typescript: {
                configFile: path.join(process.cwd(), 'src/frontend/tsconfig.json'),
            },
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}',
            },
        }),
        new CssMinimizerPlugin(),
    ],
};
