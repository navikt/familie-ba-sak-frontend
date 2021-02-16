import path from 'path';

import { Response, Request, Router } from 'express';
import WebpackDevMiddleware from 'webpack-dev-middleware';

import { Client, ensureAuthenticated, logRequest, envVar } from '@navikt/familie-backend';
import { LOG_LEVEL } from '@navikt/familie-logging';

import { buildPath } from './config';
import { prometheusTellere } from './metrikker';

export default (
    authClient: Client,
    router: Router,
    middleware?: WebpackDevMiddleware.WebpackDevMiddleware
) => {
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

    // APP
    if (process.env.NODE_ENV === 'development' && middleware) {
        router.get('*', ensureAuthenticated(authClient, false), (_: Request, res: Response) => {
            prometheusTellere.appLoad.inc();

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(
                middleware.fileSystem.readFileSync(path.join(__dirname, `${buildPath}/index.html`))
            );
            res.end();
        });
    } else {
        router.get('*', ensureAuthenticated(authClient, false), (_: Request, res: Response) => {
            prometheusTellere.appLoad.inc();

            res.sendFile('index.html', { root: path.join(__dirname, buildPath) });
        });
    }

    return router;
};
