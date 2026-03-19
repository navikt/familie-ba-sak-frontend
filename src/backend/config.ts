import type { IApi, IAppConfig, ISessionKonfigurasjon } from '@navikt/familie-backend';

import { envVar, erLokal } from './env.js';

export const appConfig: IAppConfig = {
    clientId: envVar('AZURE_APP_CLIENT_ID'),
    clientSecret: envVar('AZURE_APP_CLIENT_SECRET'),
    sessionSecret: envVar('SESSION_SECRET'),
    discoveryUrl: envVar('AZURE_APP_WELL_KNOWN_URL'),
    redirectUri: envVar('AAD_REDIRECT_URL'),
    logoutRedirectUri: envVar('AAD_LOGOUT_REDIRECT_URL'),
};

export const sessionConfig: ISessionKonfigurasjon = {
    cookieSecret: [`${envVar('COOKIE_KEY1')}`, `${envVar('COOKIE_KEY2')}`],
    navn: 'familie-ba-sak-v1',
    redisFullUrl: !erLokal() ? envVar('REDIS_URI_SESSIONS') : undefined,
    redisBrukernavn: !erLokal() ? envVar('REDIS_USERNAME_SESSIONS') : undefined,
    redisPassord: !erLokal() ? envVar('REDIS_PASSWORD_SESSIONS') : undefined,
    secureCookie: !erLokal(),
    sessionMaxAgeSekunder: 12 * 60 * 60,
};

export const oboConfig: IApi = {
    clientId: envVar('AZURE_APP_CLIENT_ID'),
    scopes: [envVar('BA_SAK_SCOPE')],
};

export const redirectRecords: Record<string, string> = {
    '/redirect/familie-tilbake': envVar('FAMILIE_TILBAKE_URL'),
    '/redirect/familie-klage': envVar('FAMILIE_KLAGE_URL'),
    '/redirect/neessi': envVar('NEESSI_URL'),
    '/redirect/drek': envVar('DREK_URL'),
};

export const frontendPath: string = envVar('FRONTEND_PATH');
export const proxyUrl: string = envVar('PROXY_URL');
