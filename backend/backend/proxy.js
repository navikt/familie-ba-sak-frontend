import { __awaiter } from "tslib";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { getOnBehalfOfAccessToken } from '@navikt/familie-backend';
import { stdoutLogger } from '@navikt/familie-logging';
import { oboConfig, proxyUrl, redirectRecords } from './config.js';
const restream = (proxyReq, req, _res) => {
    if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
};
// eslint-disable-next-line
export const doProxy = () => {
    return createProxyMiddleware({
        changeOrigin: true,
        on: { proxyReq: restream },
        secure: true,
        target: `${proxyUrl}`,
        logger: stdoutLogger,
    });
};
export const doRedirectProxy = () => {
    return (req, res) => {
        const urlKey = Object.keys(redirectRecords).find(k => req.originalUrl.includes(k));
        if (urlKey) {
            const basePath = redirectRecords[urlKey];
            const path = req.originalUrl.replace(urlKey, '');
            stdoutLogger.info(`Redirect ${urlKey} -> ${redirectRecords[urlKey]}`);
            res.redirect(basePath + path);
        }
        else {
            console.log(`Ustøttet redirect: ${req.originalUrl}`);
            res.sendStatus(404);
        }
    };
};
export const attachToken = (authClient) => {
    return (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
        getOnBehalfOfAccessToken(authClient, req, oboConfig).then((accessToken) => {
            req.headers.Authorization = `Bearer ${accessToken}`;
            return next();
        });
    });
};
