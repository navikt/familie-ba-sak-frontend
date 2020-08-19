const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TypeScriptTypeChecker = require('fork-ts-checker-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        'familie-ba-sak': ['./src/frontend/index.tsx'],
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
                    { loader: require.resolve('css-loader') },
                    { loader: require.resolve('less-loader') },
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        runtimeChunk: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../../src/frontend/index.html'),
            inject: 'body',
            alwaysWriteToDisk: true,
        }),
        new TypeScriptTypeChecker({
            typescript: {
                configFile: path.join(__dirname, '../../src/frontend/tsconfig.json'),
            },
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}',
            },
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new OptimizeCssAssetsPlugin(),
    ],
};
