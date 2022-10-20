import './konfigurerApp.js';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import type { IApp } from '@navikt/familie-backend';
import { default as backend } from '@navikt/familie-backend';

import webpackDevConfig from '../webpack/webpack.dev';
import { sessionConfig } from './config';
import { prometheusTellere } from './metrikker';
import { setupServer } from './server';

backend(sessionConfig, prometheusTellere).then((iApp: IApp) => {
    const { app } = iApp;
    if (process.env.NODE_ENV === 'development') {
        const compiler = webpack(webpackDevConfig);
        const middleware = webpackDevMiddleware(compiler, {
            // eslint-disable-next-line
            // @ts-ignore
            publicPath: webpackDevConfig.output.publicPath,
            writeToDisk: true,
        });

        app.use(middleware);
        app.use(webpackHotMiddleware(compiler));
        setupServer(iApp);
    } else {
        throw new Error(`Cannot start dev with process.env.NODE_ENV=${process.env.NODE_ENV}`);
    }
});
