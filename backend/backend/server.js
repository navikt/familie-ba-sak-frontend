import './konfigurerApp.js';
import path from 'path';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import { v4 as uuidv4 } from 'uuid';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { default as backend, ensureAuthenticated, envVar } from '@navikt/familie-backend';
import { logInfo } from '@navikt/familie-logging';
import { sessionConfig } from './config';
import { prometheusTellere } from './metrikker';
import { attachToken, doProxy, doRedirectProxy } from './proxy';
import setupRouter from './router';
import webpackDevConfig from '../webpack/webpack.dev';
const port = 8000;
backend(sessionConfig, prometheusTellere).then(({ app, azureAuthClient, router }) => {
    if (process.env.NODE_ENV === 'development') {
        const compiler = webpack(webpackDevConfig);
        if (!compiler) {
            throw new Error('Webpack compileren feilet');
        }
        const middleware = webpackDevMiddleware(compiler, {
            // eslint-disable-next-line
            // @ts-ignore
            publicPath: webpackDevConfig.output.publicPath,
            writeToDisk: true,
        });
        app.use(middleware);
        app.use(webpackHotMiddleware(compiler));
        app.use('/assets/favicon.svg', express.static('./frontend_development/assets/favicon.svg'));
    }
    else {
        app.use('/assets', expressStaticGzip(path.join(process.cwd(), 'frontend_production'), {}));
        app.use('/assets/favicon.svg', express.static('./frontend_production/assets/favicon.svg'));
    }
    app.use('/assets', expressStaticGzip(path.join(process.cwd(), 'frontend_production'), {}));
    app.use('/assets/favicon.svg', express.static('./frontend_production/assets/favicon.svg'));
    app.use((req, _res, next) => {
        req.headers['nav-call-id'] = uuidv4();
        req.headers['nav-consumer-id'] = 'familie-ba-sak-front';
        next();
    });
    app.use('/familie-ba-sak/api', ensureAuthenticated(azureAuthClient, true), attachToken(azureAuthClient), doProxy());
    app.use('/redirect', doRedirectProxy());
    app.use(express.json({ limit: '200mb' }));
    app.use(express.urlencoded({ limit: '200mb', extended: true }));
    app.use('/', setupRouter(azureAuthClient, router));
    app.listen(port, '0.0.0.0', () => {
        logInfo(`Server startet på port ${port}. Build version: ${envVar('APP_VERSION')}.`);
    });
});
