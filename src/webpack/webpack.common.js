const path = require('path');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less'],
    },
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
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(process.cwd(), 'src/frontend/index.html'),
            inject: 'body',
            alwaysWriteToDisk: true,
        }),
        new CaseSensitivePathsPlugin(),
    ],
};
