import dotenvx from '@dotenvx/dotenvx';

import { logInfo } from '@navikt/familie-logging';

import { envVar } from './env.js';

const konfigurerApp = () => {
    logInfo(`NODE_ENV=${envVar('NODE_ENV')} ENV=${envVar('ENV')}`);

    dotenvx.config({
        path: ['.env', '.secrets.env', `.env.${envVar('ENV')}`],
        ignore: ['MISSING_ENV_FILE'],
    });
};

konfigurerApp();
