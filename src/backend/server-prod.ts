import './konfigurerApp.js';

import path from 'path';

import expressStaticGzip from 'express-static-gzip';

import type { IApp } from '@navikt/familie-backend';
import { default as backend } from '@navikt/familie-backend';

import { sessionConfig } from './config';
import { prometheusTellere } from './metrikker';
import { setupServer } from './server';

backend(sessionConfig, prometheusTellere).then((iApp: IApp) => {
    const { app } = iApp;

    if (process.env.NODE_ENV === 'development') {
        throw new Error(`Cannot start prod with process.env.NODE_ENV=${process.env.NODE_ENV}`);
    } else {
        app.use('/assets', expressStaticGzip(path.join(process.cwd(), 'frontend_production'), {}));
        setupServer(iApp);
    }
});
