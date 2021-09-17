/* eslint-disable */
const path = require('path');

const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.common.js');
const SentryCliPlugin = require('@sentry/webpack-plugin');

const prodConfig = merge.mergeWithRules({
    module: {
        rules: {
            test: 'match',
            use: 'replace',
        },
    },
})(baseConfig, {
    entry: [path.join(process.cwd(), 'src/frontend/index.tsx')],
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.join(process.cwd(), 'frontend_production'),
        filename: '[name].[contenthash].js',
        publicPath: '/assets/',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()],
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                styles: {
                    name: 'styles',
                    type: 'css/mini-extract',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    performance: {
        maxEntrypointSize: 800000,
        maxAssetSize: 800000,
    },
    plugins: [
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        new SentryCliPlugin({
            include: 'frontend_production',
            org: 'nav',
            project: 'familie-ba-sak-frontend',
            authToken: process.env.SENTRY_AUTH_TOKEN,
            url: 'https://sentry.gc.nav.no/',
            release: process.env.SENTRY_RELEASE,
            urlPrefix: `~/assets`,
        }),
    ],
});

module.exports = prodConfig;
