import path from 'path';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack from 'webpack';
import merge from 'webpack-merge';

import baseConfig from './webpack.common.js';

export default merge.mergeWithRules({
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
        publicPath: '/assets/',
    },
    module: {
        rules: [
            {
                test: /\.(jsx|tsx|ts|js)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: ['react-refresh/babel'],
                    cacheCompression: false,
                    cacheDirectory: true,
                },
            },
            {
                test: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                namedExport: false,
                            },
                            importLoaders: 1,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'icss',
                            },
                            importLoaders: 2,
                        },
                    },
                ],
            },
        ],
    },
    cache: {
        type: 'filesystem',
    },
});
