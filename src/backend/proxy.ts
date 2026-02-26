import type { ClientRequest } from 'http';

import type { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import type { Client } from '@navikt/familie-backend';
import { getOnBehalfOfAccessToken } from '@navikt/familie-backend';
import { stdoutLogger } from '@navikt/familie-logging';

import { oboConfig, proxyUrl, redirectRecords } from './config.js';

const restream = (proxyReq: ClientRequest, req: Request, _res: Response) => {
    if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
};

// eslint-disable-next-line
export const doProxy: any = () => {
    return createProxyMiddleware({
        changeOrigin: true,
        on: { proxyReq: restream },
        secure: true,
        target: `${proxyUrl}`,
        logger: stdoutLogger,
    });
};

export const doRedirectProxy = () => {
    return (req: Request, res: Response) => {
        const urlKey = Object.keys(redirectRecords).find(k => req.originalUrl.includes(k));
        if (urlKey) {
            const basePath = redirectRecords[urlKey];
            const path = req.originalUrl.replace(urlKey, '');
            stdoutLogger.info(`Redirect ${urlKey} -> ${redirectRecords[urlKey]}`);
            res.redirect(basePath + path);
        } else {
            console.log(`Ustøttet redirect: ${req.originalUrl}`);
            res.sendStatus(404);
        }
    };
};

export const attachToken = (authClient: Client) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        getOnBehalfOfAccessToken(authClient, req, oboConfig).then((accessToken: string) => {
            req.headers.Authorization = `Bearer ${accessToken}`;
            return next();
        });
    };
};
