import { renderNaisMetaTags } from '@nais/apm';
import type { Client } from '@navikt/familie-backend';
import { ensureAuthenticated, envVar, logRequest } from '@navikt/familie-backend';
import { LOG_LEVEL } from '@navikt/familie-logging';
import type { NextFunction, Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';
import type { ViteDevServer } from 'vite';

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
            .send({
                status: 'SUKSESS',
                data: {
                    versjon: envVar('APP_VERSION'),
                    branch: envVar('APP_BRANCH', false, 'ukjent'),
                },
            })
            .end();
    });

    // Brukes av familie-felles-frontend
    router.get('/error', (_: Request, res: Response) => {
        prometheusTellere.errorRoute.inc();
        res.sendFile('error.html', { root: path.join(`assets/`) });
    });

    // Feilhåndtering
    router.post('/logg-feil', (req: Request, res: Response) => {
        logRequest(req, req.body.melding, LOG_LEVEL.ERROR);
        res.status(200).send();
    });

    let viteDevServer: ViteDevServer | undefined;
    if (erLokal()) {
        const { createServer } = await import('vite');
        viteDevServer = await createServer({
            root: path.join(process.cwd(), frontendPath),
            mode: process.env.ENV,
            server: { middlewareMode: true },
            appType: 'custom',
        });

        router.use(viteDevServer.middlewares);
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
                if (!viteDevServer) {
                    throw new Error('ViteDevServer er ikke initialisert.');
                }
                const htmlInnhold = (await fs.promises.readFile(htmlPath, 'utf-8')).replace(
                    '{{{NAIS_META_TAGS}}}',
                    renderNaisMetaTags()
                );
                const transformed = await viteDevServer.transformIndexHtml(req.url, htmlInnhold);
                res.status(200).type('html').send(transformed);
            } else {
                const htmlInnhold = await fs.promises.readFile(htmlPath, 'utf-8');
                res.status(200).type('html').send(htmlInnhold.replace('{{{NAIS_META_TAGS}}}', renderNaisMetaTags()));
            }
        }
    );

    return router;
};
