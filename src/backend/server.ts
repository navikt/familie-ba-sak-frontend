import './konfigurerApp.js';

import bodyParser from 'body-parser';
import type { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import type { IApp } from '@navikt/familie-backend';
import { ensureAuthenticated, envVar } from '@navikt/familie-backend';
import { logInfo } from '@navikt/familie-logging';

import { attachToken, doEndringslogProxy, doProxy, doRedirectProxy } from './proxy';
import setupRouter from './router';

const port = 8000;

export const setupServer = ({ app, azureAuthClient, router }: IApp): void => {
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
};
