/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const { mergeWithCustomize } = require('webpack-merge');
const common = require('./webpack.common');

const config = mergeWithCustomize({
    'entry.familie-ba-sak-frontend': 'prepend',
    'module.rules': 'append',
})(common, {
    mode: 'development',
    entry: {
        'familie-ba-sak-frontend': [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?reload=true',
        ],
    },
    output: {
        path: path.join(process.cwd(), 'frontend_development'),
        filename: '[name].[contenthash].js',
        publicPath: '/assets/',
        globalObject: 'this',
    },
    devtool: 'inline-source-map',
    resolve: {
        alias: { react: require.resolve('react') },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
});

module.exports = config;
