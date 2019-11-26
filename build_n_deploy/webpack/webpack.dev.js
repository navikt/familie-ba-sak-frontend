const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const config = merge.strategy({
    'entry.familie-ba-sak': 'prepend',
    'module.rules': 'append',
})(common, {
    mode: 'development',
    entry: {
        'familie-ba-sak': [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?reload=true',
        ],
    },
    output: {
        path: path.join(__dirname, '../../frontend_development'),
        filename: '[name].[hash].js',
        publicPath: '/assets/',
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    },
                    { loader: 'postcss-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            globalVars: {
                                coreModulePath: '"~"',
                                nodeModulesPath: '"~"',
                            },
                        },
                    },
                ],
            },
        ],
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
});

module.exports = config;
