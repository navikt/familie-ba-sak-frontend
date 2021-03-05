/* eslint-disable */
const path = require('path');

const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.common.js');

const devConfig = merge.mergeWithRules({
    module: {
        rules: {
            test: 'match',
            options: 'replace',
        },
    },
})(baseConfig, {
    mode: 'development',
    entry: ['webpack-hot-middleware/client'],
    plugins: [new ReactRefreshWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
    output: {
        path: path.join(process.cwd(), 'frontend_development'),
        publicPath: '/assets',
    },
    module: {
        rules: [
            {
                test: /\.(jsx|tsx|ts|js)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react-app'],
                    plugins: ['react-refresh/babel'],
                },
            },
        ],
    },
});

module.exports = devConfig;
