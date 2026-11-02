import type { Configuration } from '@navikt/familie-backend';
import { getOnBehalfOfAccessToken } from '@navikt/familie-backend';
import type { NextFunction, Request, Response } from 'express';
import type { ClientRequest } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { oboConfig, proxyUrl, redirectRecords } from './config.js';
import { logger } from './logger.js';

const restream = (proxyReq: ClientRequest, req: Request, _res: Response) => {
    if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
};

export const doProxy: any = () => {
    return createProxyMiddleware({
        changeOrigin: true,
        on: { proxyReq: restream },
        secure: true,
        target: `${proxyUrl}`,
        logger,
    });
};

export const doRedirectProxy = () => {
    return (req: Request, res: Response) => {
        const urlKey = Object.keys(redirectRecords).find(k => req.originalUrl.includes(k));
        if (urlKey) {
            const basePath = redirectRecords[urlKey];
            const path = req.originalUrl.replace(urlKey, '');
            logger.info(`Redirect ${urlKey} -> ${redirectRecords[urlKey]}`);
            res.redirect(basePath + path);
        } else {
            logger.warn(`Ustøttet redirect: ${req.originalUrl}`);
            res.sendStatus(404);
        }
    };
};

export const attachToken = (authConfig: Configuration) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = await getOnBehalfOfAccessToken(authConfig, req, oboConfig);
            req.headers.Authorization = `Bearer ${accessToken}`;
            next();
        } catch (feil) {
            // ensureAuthenticated kan allerede ha svart 401 (feilet token-refresh) og likevel kalt next().
            if (res.headersSent) {
                return;
            }
            logger.warn(`Fikk ikke OBO-token for ${req.path}: ${feil instanceof Error ? feil.message : feil}`);
            res.status(401).send('Unauthorized');
        }
    };
};
