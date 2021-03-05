/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const { mergeWithCustomize } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const config = mergeWithCustomize({
    'entry.familie-ba-sak-frontend': 'prepend',
    'module.rules': 'append',
})(common, {
    mode: 'production',
    entry: {
        'familie-ba-sak-frontend': ['babel-polyfill'],
    },
    output: {
        path: path.join(process.cwd(), 'frontend_production'),
        filename: '[name].[contenthash].js',
        publicPath: '/assets/',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new MiniCssExtractPlugin({
            filename: 'familie-ba-sak-frontend.css',
        }),
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
    optimization: {
        minimizer: [new TerserPlugin()],
    },
});

module.exports = config;
