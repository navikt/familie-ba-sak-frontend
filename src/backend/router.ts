import Backend from '@navikt/familie-backend';
import { SessionRequest } from '@navikt/familie-backend/lib/typer';
import { Response } from 'express';
import path from 'path';
import { buildPath, saksbehandlerTokenConfig } from './config';
import { prometheusTellere } from './metrikker';
import { slackNotify } from './slack/slack';

/* tslint:disable */
const packageJson = require('../package.json');
/* tslint:enable */

export default (backend: Backend, middleware: any) => {
    backend.getRouter().get('/version', (req, res) => {
        res.status(200)
            .send({ version: process.env.APP_VERSION, reduxVersion: packageJson.redux_version })
            .end();
    });
    backend.getRouter().get('/error', (req, res) => {
        prometheusTellere.error_route.inc();
        res.sendFile('error.html', { root: path.join(`assets/`) });
    });

    // SLACK
    backend.getRouter().post('/slack/notify/:kanal', (req: any, res: Response) => {
        slackNotify(backend, req, res, req.params.kanal);
    });

    // APP
    if (process.env.NODE_ENV === 'development') {
        backend
            .getRouter()
            .get(
                '*',
                backend.ensureAuthenticated(false, saksbehandlerTokenConfig),
                (req: SessionRequest, res: Response) => {
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
                (req: SessionRequest, res: Response) => {
                    prometheusTellere.app_load.inc();

                    res.sendFile('index.html', { root: path.join(__dirname, buildPath) });
                }
            );
    }

    return backend.getRouter();
};
