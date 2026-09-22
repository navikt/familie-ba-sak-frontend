import dotenvx from '@dotenvx/dotenvx';

import { envVar } from './env.js';
import { logger } from './logger.js';

const konfigurerApp = () => {
    logger.info(`NODE_ENV=${envVar('NODE_ENV')} ENV=${envVar('ENV')}`);

    dotenvx.config({
        path: ['.env', '.secrets.env', `.env.${envVar('ENV')}`],
        ignore: ['MISSING_ENV_FILE'],
    });
};

konfigurerApp();
