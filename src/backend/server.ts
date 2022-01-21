import './konfigurerApp';

import path from 'path';

import bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express';
import expressStaticGzip from 'express-static-gzip';
import { v4 as uuidv4 } from 'uuid';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import backend, { ensureAuthenticated, envVar, IApp } from '@navikt/familie-backend';
import { logInfo } from '@navikt/familie-logging';

import { sessionConfig } from './config';
import { prometheusTellere } from './metrikker';
import { attachToken, doEndringslogProxy, doPdfProxy, doProxy, doRedirectProxy } from './proxy';
import setupRouter from './router';

// eslint-disable-next-line
const webpackDevConfig = require('../webpack/webpack.dev');

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
        app.use('/assets', expressStaticGzip(path.join(process.cwd(), 'frontend_production'), {}));
    }

    app.use((req: Request, _res: Response, next: NextFunction) => {
        req.headers['nav-call-id'] = uuidv4();
        req.headers['nav-consumer-id'] = 'familie-ba-sak-front';
        next();
    });

    app.use(
        '/familie-ba-sak/api',
        ensureAuthenticated(azureAuthClient, true),
        attachToken(azureAuthClient),
        doProxy()
    );

    app.use(
        '/api/pdf-proxy',
        ensureAuthenticated(azureAuthClient, true),
        attachToken(azureAuthClient),
        doPdfProxy()
    );

    app.use(
        '/endringslogg',
        ensureAuthenticated(azureAuthClient, true),
        attachToken(azureAuthClient),
        doEndringslogProxy()
    );

    app.use('/redirect', doRedirectProxy());

    // Sett opp bodyParser og router etter proxy. Spesielt viktig med tanke på større payloads som blir parset av bodyParser
    app.use(bodyParser.json({ limit: '200mb' }));
    app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
    app.use('/', setupRouter(azureAuthClient, router));

    app.listen(port, '0.0.0.0', () => {
        logInfo(`Server startet på port ${port}. Build version: ${envVar('APP_VERSION')}.`);
    });
});
