import './konfigurerApp.js';

import path from 'path';

import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import { v4 as uuidv4 } from 'uuid';

import type { IApp } from '@navikt/familie-backend';
import { default as backend, ensureAuthenticated, envVar } from '@navikt/familie-backend';
import { logInfo } from '@navikt/familie-logging';

import { sessionConfig } from './config.js';
import { prometheusTellere } from './metrikker.js';
import { attachToken, doProxy, doRedirectProxy } from './proxy.js';
import setupRouter from './router.js';

const port = 8000;

backend(sessionConfig, prometheusTellere).then(({ app, azureAuthClient, router }: IApp) => {
    if (process.env.NODE_ENV === 'development') {
        app.use('/assets/favicon.svg', express.static('./frontend_development/assets/favicon.svg'));
    } else {
        app.use('/assets', expressStaticGzip(path.join(process.cwd(), 'frontend_production'), {}));
        app.use('/assets/favicon.svg', express.static('./frontend_production/assets/favicon.svg'));
    }

    app.use('/assets', expressStaticGzip(path.join(process.cwd(), 'frontend_production'), {}));
    app.use('/assets/favicon.svg', express.static('./frontend_production/assets/favicon.svg'));

    app.use((req: Request, _res: Response, next: NextFunction) => {
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
