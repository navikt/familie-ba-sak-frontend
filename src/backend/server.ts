import './konfigurerApp.js';

import path from 'path';

import bodyParser from 'body-parser';
import expressStaticGzip from 'express-static-gzip';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import backend, { IApp, ensureAuthenticated, envVar } from '@navikt/familie-backend';
import { logInfo } from '@navikt/familie-logging';

import webpackDevConfig from '../webpack/webpack.dev.js';
import { sessionConfig } from './config.js';
import { prometheusTellere } from './metrikker.js';
import { attachToken, doPdfProxy, doProxy } from './proxy.js';
import setupRouter from './router.js';

const port = 8000;

backend(sessionConfig, prometheusTellere).then(({ app, azureAuthClient, router }: IApp) => {
    let middleware;

    if (process.env.NODE_ENV === 'development') {
        const compiler = webpack(webpackDevConfig);
        middleware = webpackDevMiddleware(compiler, {
            // eslint-disable-next-line
            // @ts-ignore
            publicPath: webpackDevConfig.output.publicPath,
            writeToDisk: true,
        });

        app.use(middleware);
        app.use(webpackHotMiddleware(compiler));
    } else {
        app.use(
            '/assets',
            expressStaticGzip(path.join(__dirname, '../../frontend_production'), {})
        );
    }

    app.use(
        '/familie-ba-sak/api',
        ensureAuthenticated(azureAuthClient, true),
        attachToken(azureAuthClient),
        doProxy()
    );

    app.use(
        '/api/pdf',
        ensureAuthenticated(azureAuthClient, true),
        attachToken(azureAuthClient),
        doPdfProxy()
    );

    // Sett opp bodyParser og router etter proxy. Spesielt viktig med tanke på større payloads som blir parset av bodyParser
    app.use(bodyParser.json({ limit: '200mb' }));
    app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
    app.use('/', setupRouter(azureAuthClient, router, middleware));

    app.listen(port, '0.0.0.0', () => {
        logInfo(`Server startet på port ${port}. Build version: ${envVar('APP_VERSION')}.`);
    });
});
