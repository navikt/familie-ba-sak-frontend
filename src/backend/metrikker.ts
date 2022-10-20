import { promClient } from '@navikt/familie-backend';

export const prometheusTellere = {
    appLoad: new promClient.Counter({
        help: 'Counter for times app has been loaded',
        labelNames: ['code'],
        name: 'app_load',
    }),
    errorRoute: new promClient.Counter({
        help: 'Counter for times error page is loaded',
        labelNames: ['code'],
        name: 'error_route',
    }),
    loginRoute: new promClient.Counter({
        help: 'Counter for times login route is requested',
        labelNames: ['code'],
        name: 'login_route',
    }),
};
