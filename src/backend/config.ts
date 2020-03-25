import {
    IOIDCStrategyOptionWithRequest,
    ISessionKonfigurasjon,
    ITokenRequest,
} from '@navikt/familie-backend/dist/typer';

interface IConfig {
    allowHttpForRedirectUrl: boolean;
    cookieDomain: string;
    logoutUri: string;
    redirectUrl: string;
    tenant: string;
}

const hentPassportConfig = () => {
    let config: IConfig = {
        allowHttpForRedirectUrl: false,
        cookieDomain: '',
        logoutUri: '',
        redirectUrl: '',
        tenant: '',
    };

    const host = 'barnetrygd';
    console.log('ENV: ', process.env.ENV);
    switch (process.env.ENV) {
        case 'local':
            config = {
                allowHttpForRedirectUrl: true,
                cookieDomain: 'localhost',
                logoutUri: `https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=http:\\\\localhost:8000`,
                redirectUrl: 'http://localhost:8000/auth/openid/callback',
                tenant: 'navq.onmicrosoft.com',
            };
            break;
        case 'e2e':
            config = {
                allowHttpForRedirectUrl: true,
                cookieDomain: 'e2e',
                logoutUri: `https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=http:\\\\localhost:8000`,
                redirectUrl: 'http://localhost:8000/auth/openid/callback',
                tenant: 'navq.onmicrosoft.com',
            };
            break;
        case 'preprod':
            config = {
                allowHttpForRedirectUrl: false,
                cookieDomain: `${host}.nais.preprod.local`,
                logoutUri: `https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=https:\\\\${host}.nais.preprod.local`,
                redirectUrl: `https://${host}.nais.preprod.local/auth/openid/callback`,
                tenant: 'navq.onmicrosoft.com',
            };
            break;
        case 'production':
            config = {
                allowHttpForRedirectUrl: false,
                cookieDomain: `${host}.nais.adeo.no`,
                logoutUri: `https://login.microsoftonline.com/navno.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=https:\\\\${host}.nais.adeo.no`,
                redirectUrl: `https://${host}.nais.adeo.no/auth/openid/callback`,
                tenant: 'navno.onmicrosoft.com',
            };
            break;
        default:
            break;
    }

    const key1 = process.env.PASSPORTCOOKIE_KEY1 ? process.env.PASSPORTCOOKIE_KEY1 : '';
    const key2 = process.env.PASSPORTCOOKIE_KEY2 ? process.env.PASSPORTCOOKIE_KEY2 : '';
    const key3 = process.env.PASSPORTCOOKIE_KEY3 ? process.env.PASSPORTCOOKIE_KEY3 : '';
    const key4 = process.env.PASSPORTCOOKIE_KEY4 ? process.env.PASSPORTCOOKIE_KEY4 : '';

    return {
        ...config,
        clientID: process.env.CLIENT_ID ? process.env.CLIENT_ID : 'invalid',
        clientSecret: process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : '',
        cookieEncryptionKeys: [
            { key: key1, iv: key3 },
            { key: key2, iv: key4 },
        ],
        identityMetadata: `https://login.microsoftonline.com/${config.tenant}/v2.0/.well-known/openid-configuration`,
        tokenURI: `https://login.microsoftonline.com/${config.tenant}/oauth2/v2.0/token`,
    };
};
const Environment = () => {
    if (process.env.ENV === 'local') {
        return {
            buildPath: '../frontend_development',
            namespace: 'local',
            proxyUrl: 'http://localhost:8089',
        };
    } else if (process.env.ENV === 'e2e') {
        return {
            buildPath: '../frontend_production',
            namespace: 'e2e',
            proxyUrl: 'http://familie-ba-sak:8089',
            redisUrl: 'familie-redis',
        };
    } else if (process.env.ENV === 'preprod') {
        return {
            buildPath: '../frontend_production',
            namespace: 'preprod',
            proxyUrl: 'http://familie-ba-sak',
            redisUrl: 'familie-ba-sak-frontend-redis.default.svc.nais.local',
        };
    }

    return {
        buildPath: '../frontend_production',
        namespace: 'production',
        proxyUrl: 'http://familie-ba-sak',
        redisUrl: 'familie-ba-sak-frontend-redis.default.svc.nais.local',
    };
};
const env = Environment();

// Sett opp config mot felles backend skall
export const nodeConfig = hentPassportConfig();
if (!process.env.SESSION_SECRET) {
    throw new Error('Session secret er ikke konfigurert');
}

export const sessionConfig: ISessionKonfigurasjon = {
    cookieSecret: [`${process.env.COOKIE_KEY1}`, `${process.env.COOKIE_KEY2}`],
    navn: 'familie-ba-sak-v1',
    redisPassord: process.env.REDIS_PASSWORD,
    redisUrl: env.redisUrl,
    secureCookie: process.env.ENV === 'local' || process.env.ENV === 'e2e' ? false : true,
    sessionMaxAgeSekunder: 12 * 60 * 60,
    sessionSecret: process.env.SESSION_SECRET,
};

export const saksbehandlerTokenConfig: ITokenRequest = {
    clientId: nodeConfig.clientID,
    clientSecret: nodeConfig.clientSecret,
    redirectUrl: nodeConfig.redirectUrl,
    scope: `${nodeConfig.clientID}/.default`,
    tokenUri: nodeConfig.tokenURI,
};

if (!process.env.BA_SAK_SCOPE) {
    throw new Error('Scope mot familie-ba-sak er ikke konfigurert');
}

export const oboTokenConfig: ITokenRequest = {
    clientId: nodeConfig.clientID,
    clientSecret: nodeConfig.clientSecret,
    redirectUrl: nodeConfig.redirectUrl,
    scope: process.env.BA_SAK_SCOPE,
    tokenUri: nodeConfig.tokenURI,
};

export const passportConfig: IOIDCStrategyOptionWithRequest = {
    allowHttpForRedirectUrl: nodeConfig.allowHttpForRedirectUrl,
    clientID: nodeConfig.clientID,
    clientSecret: nodeConfig.clientSecret,
    cookieEncryptionKeys: nodeConfig.cookieEncryptionKeys,
    identityMetadata: nodeConfig.identityMetadata,
    loggingLevel: 'info',
    passReqToCallback: true,
    redirectUrl: nodeConfig.redirectUrl,
    responseMode: 'query',
    responseType: 'code',
    scope: 'profile offline_access',
    useCookieInsteadOfSession: false,
    validateIssuer: true,
};

export const buildPath = env.buildPath;
export const proxyUrl = env.proxyUrl;
export const namespace = env.namespace;
