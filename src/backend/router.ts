import Backend, { logRequest, LOG_LEVEL } from '@navikt/familie-backend';
import { Response, Request } from 'express';
import path from 'path';
import { buildPath, saksbehandlerTokenConfig } from './config';
import { prometheusTellere } from './metrikker';
import { slackNotify } from './slack/slack';

/* tslint:disable */
const packageJson = require('../package.json');
/* tslint:enable */

export default (backend: Backend, middleware: any) => {
    backend.getRouter().get('/version', (_req, res) => {
        res.status(200)
            .send({ version: process.env.APP_VERSION, reduxVersion: packageJson.redux_version })
            .end();
    });
    backend.getRouter().get('/error', (_req, res) => {
        prometheusTellere.error_route.inc();
        res.sendFile('error.html', { root: path.join(`assets/`) });
    });

    // SLACK
    backend.getRouter().post('/slack/notify/:kanal', (req: Request, res: Response) => {
        slackNotify(req, res, req.params.kanal);
    });

    backend.getRouter().post('/logg-feil', (req: Request, res: Response) => {
        logRequest(req, req.body.melding, LOG_LEVEL.ERROR);
        res.status(200).send();
    });

    // APP
    if (process.env.NODE_ENV === 'development') {
        backend
            .getRouter()
            .get(
                '*',
                backend.ensureAuthenticated(false, saksbehandlerTokenConfig),
                (_req: Request, res: Response) => {
                    prometheusTellere.app_load.inc();

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(
                        middleware.fileSystem.readFileSync(
                            path.join(__dirname, `${buildPath}/index.html`)
                        )
                    );
                    res.end();
                }
            );
    } else {
        backend
            .getRouter()
            .get(
                '*',
                backend.ensureAuthenticated(false, saksbehandlerTokenConfig),
                (_req: Request, res: Response) => {
                    prometheusTellere.app_load.inc();

                    res.sendFile('index.html', { root: path.join(__dirname, buildPath) });
                }
            );
    }

    return backend.getRouter();
};
