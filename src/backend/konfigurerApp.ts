import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '/var/run/secrets/nais.io/vault/.env' });
} else {
    dotenv.config();
}

const konfigurerAzure = () => {
    const host = 'barnetrygd';
    switch (process.env.ENV) {
        case 'local':
            process.env.AAD_LOGOUT_REDIRECT_URL = `https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=http:\\\\localhost:8000`;
            process.env.AAD_REDIRECT_URL = 'http://localhost:8000/auth/openid/callback';
            process.env.AAD_DISCOVERY_URL = `https://login.microsoftonline.com/navq.onmicrosoft.com/v2.0/.well-known/openid-configuration`;
            process.env.GRAPH_API = 'https://graph.microsoft.com/v1.0/me';
            break;
        case 'e2e':
            process.env.AAD_LOGOUT_REDIRECT_URL = `http://mock-oauth2-server:1111/v2.0/logout?post_logout_redirect_uri=http:\\\\localhost:8000`;
            process.env.AAD_REDIRECT_URL =
                'http://familie-ba-sak-frontend:8000/auth/openid/callback';
            process.env.AAD_DISCOVERY_URL = `http://mock-oauth2-server:1111/v2.0/.well-known/openid-configuration`;
            process.env.GRAPH_API = 'http://familie-mock-server:1337/graph/me';
            break;
        case 'preprod':
            process.env.AAD_LOGOUT_REDIRECT_URL = `https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=https:\\\\${host}.dev.adeo.no`;
            process.env.AAD_REDIRECT_URL = `https://${host}.dev.adeo.no/auth/openid/callback`;
            process.env.AAD_DISCOVERY_URL = `https://login.microsoftonline.com/navq.onmicrosoft.com/v2.0/.well-known/openid-configuration`;
            process.env.GRAPH_API = 'https://graph.microsoft.com/v1.0/me';
            break;
        case 'production':
            process.env.AAD_LOGOUT_REDIRECT_URL = `https://login.microsoftonline.com/navno.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=https:\\\\${host}.nais.adeo.no`;
            process.env.AAD_REDIRECT_URL = `https://${host}.nais.adeo.no/auth/openid/callback`;
            process.env.AAD_DISCOVERY_URL = `https://login.microsoftonline.com/navno.onmicrosoft.com/v2.0/.well-known/openid-configuration`;
            process.env.GRAPH_API = 'https://graph.microsoft.com/v1.0/me';
            break;
        default:
            break;
    }
};

konfigurerAzure();
