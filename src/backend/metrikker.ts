import { Counter } from 'prom-client';

export const prometheusTellere = {
    app_load: new Counter({
        help: 'Counter for times app has been loaded',
        labelNames: ['code'],
        name: 'app_load',
    }),
    error_route: new Counter({
        help: 'Counter for times error page is loaded',
        labelNames: ['code'],
        name: 'error_route',
    }),
    login_route: new Counter({
        help: 'Counter for times login route is requested',
        labelNames: ['code'],
        name: 'login_route',
    }),
};
