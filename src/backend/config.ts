// Konfigurer appen før backend prøver å sette opp konfigurasjon

import type { IApi, ISessionKonfigurasjon } from '@navikt/familie-backend';
import { appConfig } from '@navikt/familie-backend';

const Environment = () => {
    if (process.env.ENV === 'local') {
        return {
            buildPath: 'frontend_development',
            namespace: 'local',
            proxyUrl: 'http://localhost:8089',
            familieTilbakeUrl: 'http://localhost:8000',
            familieKlageUrl: 'http://localhost:8000',
            endringsloggProxyUrl: 'https://familie-endringslogg.dev.intern.nav.no',
        };
    } else if (process.env.ENV === 'lokalt-mot-preprod') {
        return {
            buildPath: 'frontend_development',
            namespace: 'local',
            proxyUrl: 'https://familie-ba-sak.dev.intern.nav.no',
            familieTilbakeUrl: 'https://familie-tilbake.dev.intern.nav.no',
            familieKlageUrl: 'https://familie-klage.dev.intern.nav.no',
            endringsloggProxyUrl: 'https://familie-endringslogg.dev.intern.nav.no',
        };
    } else if (process.env.ENV === 'e2e') {
        return {
            buildPath: 'frontend_production',
            namespace: 'e2e',
            proxyUrl: 'http://familie-ba-sak:8089',
            familieTilbakeUrl: 'http://familie-tilbake-frontend:8000',
            familieKlageUrl: '',
            redisUrl: 'familie-redis',
            endringsloggProxyUrl: 'https://familie-endringslogg.dev.intern.nav.no',
        };
    } else if (process.env.ENV === 'preprod') {
        return {
            buildPath: 'frontend_production',
            namespace: 'preprod',
            proxyUrl: 'http://familie-ba-sak',
            familieTilbakeUrl: 'https://familie-tilbake-frontend.dev.intern.nav.no',
            familieKlageUrl: 'https://familie-klage.dev.intern.nav.no',
            redisUrl: 'familie-ba-sak-frontend-redis',
            endringsloggProxyUrl: 'https://familie-endringslogg.dev.intern.nav.no',
        };
    }

    return {
        buildPath: 'frontend_production',
        namespace: 'production',
        proxyUrl: 'http://familie-ba-sak',
        familieTilbakeUrl: 'https://familietilbakekreving.intern.nav.no',
        familieKlageUrl: 'https://familie-klage.intern.nav.no',
        endringsloggProxyUrl: 'https://familie-endringslogg.intern.nav.no',
        redisUrl: 'familie-ba-sak-frontend-redis',
    };
};
const env = Environment();

export const sessionConfig: ISessionKonfigurasjon = {
    cookieSecret: [`${process.env.COOKIE_KEY1}`, `${process.env.COOKIE_KEY2}`],
    navn: 'familie-ba-sak-v1',
    redisPassord: process.env.REDIS_PASSWORD,
    redisUrl: env.redisUrl,
    secureCookie: !(
        process.env.ENV === 'local' ||
        process.env.ENV === 'lokalt-mot-preprod' ||
        process.env.ENV === 'e2e'
    ),
    sessionMaxAgeSekunder: 12 * 60 * 60,
};

export const saksbehandlerConfig: IApi = {
    clientId: appConfig.clientId,
    scopes: [`${appConfig.clientId}/.default`],
};

if (!process.env.BA_SAK_SCOPE) {
    throw new Error('Scope mot familie-ba-sak er ikke konfigurert');
}

if (!process.env.DREK_URL) {
    throw new Error('URL til Drek er ikke konfigurert');
}

export const oboConfig: IApi = {
    clientId: appConfig.clientId,
    scopes: [process.env.BA_SAK_SCOPE],
};

export const buildPath = env.buildPath;
export const proxyUrl = env.proxyUrl;
export const endringsloggProxyUrl = env.endringsloggProxyUrl;
export const namespace = env.namespace;

export const redirectRecords: Record<string, string> = {
    '/redirect/familie-tilbake': env.familieTilbakeUrl,
    '/redirect/familie-klage': env.familieKlageUrl,
    '/redirect/drek': process.env.DREK_URL,
};
