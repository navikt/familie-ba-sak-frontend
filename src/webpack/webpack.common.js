/* eslint-disable */
import path from 'path';

import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TypeScriptTypeChecker from 'fork-ts-checker-webpack-plugin';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const publicUrl = '/assets';

const baseConfig = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less'],
        fallback: { crypto: false },
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(process.cwd(), 'node_dist/'),
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
        new TypeScriptTypeChecker({
            typescript: {
                configFile: path.join(process.cwd(), 'src/frontend/tsconfig.json'),
            },
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}',
            },
        }),
    ],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                resolve: {
                    fullySpecified: false, // Fikser at man ikke kan gjøre import uten filextension fra moduler med type: module i package.json
                },
            },
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
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                use: [`file-loader`],
            },
            {
                test: /\.(jsx|tsx|ts|js)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react-app'],
                },
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
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
                            importLoaders: 2,
                        },
                    },
                    { loader: 'less-loader' },
                ],
            },
        ],
    },
};

export default baseConfig;
