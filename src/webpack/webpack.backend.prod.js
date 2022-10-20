import path from 'path';

import webpack from 'webpack';

const config = {
    entry: './node_dist/backend/server-prod.js',
    mode: 'production',
    target: 'node',
    output: {
        path: path.join(process.cwd(), 'backend_production/backend'),
        filename: 'server.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
        fallback: { crypto: false },
    },
    node: {
        __dirname: false,
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                },
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
};

export default config;
