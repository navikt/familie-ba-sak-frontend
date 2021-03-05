/* eslint-disable */
const path = require('path');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicUrl = '/assets';

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less'],
        fallback: { crypto: false },
    },
    entry: ['./src/frontend/index.tsx'],
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(process.cwd(), 'src/frontend/public/index.html'),
            inject: 'body',
            alwaysWriteToDisk: true,
        }),
        new CaseSensitivePathsPlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: 'src/frontend/public/favicon.ico', to: '.' + publicUrl }],
        }),
    ],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(jsx|tsx|ts|js)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react-app'],
                },
            },
            {
                test: /\.(less|css)$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                compileType: 'icss',
                            },
                        },
                    },
                    { loader: 'less-loader' },
                ],
            },
        ],
    },
};
