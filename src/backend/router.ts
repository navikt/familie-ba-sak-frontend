import fs from 'fs';
import path from 'path';

import type { Response, Request, Router, NextFunction } from 'express';
import { createServer, type ViteDevServer } from 'vite';

import type { Client } from '@navikt/familie-backend';
import { ensureAuthenticated, logRequest, envVar } from '@navikt/familie-backend';
import { LOG_LEVEL } from '@navikt/familie-logging';

import { frontendPath } from './config.js';
import { erLokal, erPreprod } from './env.js';
import { prometheusTellere } from './metrikker.js';

const redirectHvisInternUrlIPreprod = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (erPreprod() && req.headers.host === 'barnetrygd.intern.dev.nav.no') {
            res.redirect(`https://barnetrygd.ansatt.dev.nav.no${req.url}`);
        } else {
            next();
        }
    };
};

export default async (authClient: Client, router: Router) => {
    router.get('/version', (_: Request, res: Response) => {
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

    let vite: ViteDevServer;
    if (erLokal()) {
        vite = await createServer({
            root: path.join(process.cwd(), frontendPath),
            server: { middlewareMode: true },
            appType: 'custom',
        });
        router.use(vite.middlewares);
    }

    const htmlPath = path.join(process.cwd(), frontendPath, 'index.html');

    // APP
    router.get(
        '*splat',
        redirectHvisInternUrlIPreprod(),
        ensureAuthenticated(authClient, false),
        async (req: Request, res: Response) => {
            prometheusTellere.appLoad.inc();

            if (erLokal()) {
                const htmlInnhold = await fs.promises.readFile(htmlPath, 'utf-8');
                const transformed = await vite.transformIndexHtml(req.url, htmlInnhold);
                res.status(200).type('html').send(transformed);
            } else {
                res.sendFile(htmlPath);
            }
        }
    );

    return router;
};
