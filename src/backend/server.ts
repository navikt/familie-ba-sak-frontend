import './konfigurerApp';

import backend, {
    IApp,
    ensureAuthenticated,
    error,
    getLogTimestamp,
    info,
} from '@navikt/familie-backend';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { sessionConfig } from './config';
import { prometheusTellere } from './metrikker';
import { attachToken, doProxy } from './proxy';
import setupRouter from './router';

// eslint-disable-next-line
const config = require('../../build_n_deploy/webpack/webpack.dev');

const port = 8000;

backend(sessionConfig, prometheusTellere).then(({ app, azureAuthClient, router }: IApp) => {
    let middleware;

    if (process.env.NODE_ENV === 'development') {
        const compiler = webpack(config);
        middleware = webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath,
        });

        app.use(middleware);
        app.use(webpackHotMiddleware(compiler));
    } else {
        app.use('/assets', express.static(path.join(__dirname, '..', 'frontend_production')));
    }

    app.use(
        '/familie-ba-sak/api',
        ensureAuthenticated(azureAuthClient, true),
        attachToken(azureAuthClient),
        doProxy()
    );

    // Sett opp bodyParser og router etter proxy. Spesielt viktig med tanke på større payloads som blir parset av bodyParser
    app.use(bodyParser.json({ limit: '200mb' }));
    app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
    app.use('/', setupRouter(azureAuthClient, router, middleware));

    app.listen(port, '0.0.0.0', (err: Error) => {
        if (err) {
            error(`${getLogTimestamp()}: server startup failed - ${err}`);
        }
        info(
            `${getLogTimestamp()}: server startet på port ${port}. Build version: ${
                process.env.APP_VERSION
            }.`
        );
    });
});
