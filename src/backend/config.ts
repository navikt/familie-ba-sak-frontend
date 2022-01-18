// Konfigurer appen før backend prøver å sette opp konfigurasjon

import { appConfig, ISessionKonfigurasjon, IApi } from '@navikt/familie-backend';

const Environment = () => {
    if (process.env.ENV === 'local') {
        return {
            buildPath: 'frontend_development',
            namespace: 'local',
            proxyUrl: 'http://localhost:8089',
            familieTilbakeUrl: 'http://localhost:8000',
        };
    } else if (process.env.ENV === 'e2e') {
        return {
            buildPath: 'frontend_production',
            namespace: 'e2e',
            proxyUrl: 'http://familie-ba-sak:8089',
            familieTilbakeUrl: 'http://familie-tilbake-frontend:8000',
            redisUrl: 'familie-redis',
        };
    } else if (process.env.ENV === 'preprod') {
        return {
            buildPath: 'frontend_production',
            namespace: 'preprod',
            proxyUrl: 'http://familie-ba-sak',
            familieTilbakeUrl: 'https://familie-tilbake-frontend.dev.intern.nav.no',
            redisUrl: 'familie-ba-sak-frontend-redis',
        };
    }

    return {
        buildPath: 'frontend_production',
        namespace: 'production',
        proxyUrl:
            process.env.CLUSTER === 'gcp'
                ? 'https://familie-ba-sak.prod-fss-pub.nais.io'
                : 'http://familie-ba-sak',
        familieTilbakeUrl: 'https://familietilbakekreving.intern.nav.no',
        redisUrl: 'familie-ba-sak-frontend-redis',
    };
};
const env = Environment();

export const sessionConfig: ISessionKonfigurasjon = {
    cookieSecret: [`${process.env.COOKIE_KEY1}`, `${process.env.COOKIE_KEY2}`],
    navn: 'familie-ba-sak-v1',
    redisPassord: process.env.REDIS_PASSWORD,
    redisUrl: env.redisUrl,
    secureCookie: !(process.env.ENV === 'local' || process.env.ENV === 'e2e'),
    sessionMaxAgeSekunder: 12 * 60 * 60,
};

export const saksbehandlerConfig: IApi = {
    clientId: appConfig.clientId,
    scopes: [`${appConfig.clientId}/.default`],
};

if (!process.env.BA_SAK_SCOPE) {
    throw new Error('Scope mot familie-ba-sak er ikke konfigurert');
}

export const oboConfig: IApi = {
    clientId: appConfig.clientId,
    scopes: [process.env.BA_SAK_SCOPE],
};

export const buildPath = env.buildPath;
export const proxyUrl = env.proxyUrl;
export const namespace = env.namespace;

export const redirectRecords: Record<string, string> = {
    '/redirect/familie-tilbake': env.familieTilbakeUrl,
};
