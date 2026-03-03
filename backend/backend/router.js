import { __awaiter } from "tslib";
import path from 'path';
import { ensureAuthenticated, logRequest, envVar } from '@navikt/familie-backend';
import { LOG_LEVEL } from '@navikt/familie-logging';
import { buildPath } from './config';
import { prometheusTellere } from './metrikker';
const redirectHvisInternUrlIPreprod = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (process.env.ENV === 'preprod' && req.headers.host === 'barnetrygd.intern.dev.nav.no') {
            res.redirect(`https://barnetrygd.ansatt.dev.nav.no${req.url}`);
        }
        else {
            next();
        }
    });
};
export default (authClient, router) => {
    router.get('/version', (_, res) => {
        res.status(200)
            .send({ status: 'SUKSESS', data: envVar('APP_VERSION') })
            .end();
    });
    router.get('/error', (_, res) => {
        prometheusTellere.errorRoute.inc();
        res.sendFile('error.html', { root: path.join(`assets/`) });
    });
    // Feilhåndtering
    router.post('/logg-feil', (req, res) => {
        logRequest(req, req.body.melding, LOG_LEVEL.ERROR);
        res.status(200).send();
    });
    // APP
    router.get('*splat', redirectHvisInternUrlIPreprod(), ensureAuthenticated(authClient, false), (_, res) => {
        prometheusTellere.appLoad.inc();
        res.sendFile('index.html', { root: path.join(process.cwd(), buildPath) });
    });
    return router;
};
