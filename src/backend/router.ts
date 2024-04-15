import path from 'path';

import type { Request, Response, Router } from 'express';

import type { Client } from '@navikt/familie-backend';
import { ensureAuthenticated, envVar, logRequest } from '@navikt/familie-backend';
import { LOG_LEVEL } from '@navikt/familie-logging';

import { buildPath } from './config';
import { prometheusTellere } from './metrikker';

export default (authClient: Client, router: Router) => {
    router.get('/version', (req: Request, res: Response) => {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        logRequest(req, `ip: ${ip}`, LOG_LEVEL.INFO);
        res.status(200)
            .send({ status: 'SUKSESS', data: envVar('APP_VERSION') })
            .end();
    });

    router.get('/error', (_: Request, res: Response) => {
        prometheusTellere.errorRoute.inc();
        res.sendFile('error.html', { root: path.join(`assets/`) });
    });

    // Feilhåndtering
    router.post('/logg-feil', (req: Request, res: Response) => {
        logRequest(req, req.body.melding, LOG_LEVEL.ERROR);
        res.status(200).send();
    });

    // APP
    router.get('*', ensureAuthenticated(authClient, false), (_: Request, res: Response) => {
        prometheusTellere.appLoad.inc();

        res.sendFile('index.html', { root: path.join(process.cwd(), buildPath) });
    });

    return router;
};
