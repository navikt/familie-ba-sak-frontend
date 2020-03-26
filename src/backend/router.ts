import { Client, ensureAuthenticated, logRequest, LOG_LEVEL } from '@navikt/familie-backend';
import { Response, Request, Router } from 'express';
import path from 'path';
import { buildPath } from './config';
import { prometheusTellere } from './metrikker';
import { slackNotify } from './slack/slack';

/* tslint:disable */
const packageJson = require('../package.json');
/* tslint:enable */

export default (authClient: Client, router: Router, middleware: any) => {
    router.get('/version', (_: Request, res: Response) => {
        res.status(200)
            .send({ version: process.env.APP_VERSION, reduxVersion: packageJson.redux_version })
            .end();
    });
    router.get('/error', (_: Request, res: Response) => {
        prometheusTellere.error_route.inc();
        res.sendFile('error.html', { root: path.join(`assets/`) });
    });

    // SLACK
    router.post('/slack/notify/:kanal', (req: Request, res: Response) => {
        slackNotify(req, res, req.params.kanal);
    });

    router.post('/logg-feil', (req: Request, res: Response) => {
        logRequest(req, req.body.melding, LOG_LEVEL.ERROR);
        res.status(200).send();
    });

    // APP
    if (process.env.NODE_ENV === 'development') {
        router.get('*', ensureAuthenticated(authClient, false), (_: Request, res: Response) => {
            prometheusTellere.app_load.inc();

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(
                middleware.fileSystem.readFileSync(path.join(__dirname, `${buildPath}/index.html`))
            );
            res.end();
        });
    } else {
        router.get('*', ensureAuthenticated(authClient, false), (_: Request, res: Response) => {
            prometheusTellere.app_load.inc();

            res.sendFile('index.html', { root: path.join(__dirname, buildPath) });
        });
    }

    return router;
};
