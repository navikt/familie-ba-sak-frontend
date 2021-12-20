// Konfigurer appen før backend prøver å sette opp konfigurasjon

import { appConfig, ISessionKonfigurasjon, IApi } from '@navikt/familie-backend';

const Environment = () => {
    if (process.env.ENV === 'local') {
        return {
            buildPath: 'frontend_development',
            namespace: 'local',
            proxyUrl: 'http://localhost:8089',
            baSakScope: 'api://dev-fss.teamfamilie.familie-ba-sak/.default',
            familieTilbakeUrl: 'http://localhost:8000',
        };
    } else if (process.env.ENV === 'e2e') {
        return {
            buildPath: 'frontend_production',
            namespace: 'e2e',
            proxyUrl: 'http://familie-ba-sak:8089',
            baSakScope: 'api://dev-fss.teamfamilie.familie-ba-sak/.default',
            familieTilbakeUrl: 'http://familie-tilbake-frontend:8000',
            redisUrl: 'familie-redis',
        };
    } else if (process.env.ENV === 'preprod') {
        return {
            buildPath: 'frontend_production',
            namespace: 'preprod',
            proxyUrl: 'https://familie-ba-sak.dev-fss-pub.nais.io',
            baSakScope: 'api://dev-fss.teamfamilie.familie-ba-sak/.default',
            familieTilbakeUrl: 'https://familie-tilbake-frontend.dev.intern.nav.no',
            redisUrl: 'familie-ba-sak-frontend-redis',
        };
    }

    return {
        buildPath: 'frontend_production',
        namespace: 'production',
        proxyUrl: 'http://familie-ba-sak.prod-fss-pub.nais.io',
        baSakScope: 'api://prod-fss.teamfamilie.familie-ba-sak/.default',
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

export const oboConfig: IApi = {
    clientId: appConfig.clientId,
    scopes: [
        process.env.BA_SAK_SCOPE !== undefined && process.env.BA_SAK_SCOPE !== ''
            ? process.env.BA_SAK_SCOPE
            : env.baSakScope,
    ],
};

export const buildPath = env.buildPath;
export const proxyUrl = env.proxyUrl;
export const namespace = env.namespace;

export const redirectRecords: Record<string, string> = {
    '/redirect/familie-tilbake': env.familieTilbakeUrl,
};
