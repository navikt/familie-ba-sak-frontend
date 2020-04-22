import app from './mock-routes';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import fs from 'fs';
import express, { Request, Response } from 'express';

// eslint-disable-next-line
const config = require('../../build_n_deploy/webpack/webpack.dev');

const port = 8000;
if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(config);
    const middleware = webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    app.get('/*', (_: Request, res: Response) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(
            middleware.fileSystem.readFileSync(
                path.join(__dirname, '/../../frontend_development/index.html')
            )
        );
        res.end();
    });
} else {
    app.use('/assets', express.static(path.join(__dirname, '../../frontend_production')));

    app.get('/*', (_, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(fs.readFileSync(path.join(__dirname, '/../../frontend_production/index.html')));
        res.end();
    });
}

const server = app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('=== mock-server startet på http://localhost:%s/', port);
});

process.on('SIGTERM', function() {
    server.close();
});
