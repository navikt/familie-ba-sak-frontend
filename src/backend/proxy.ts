import type { ClientRequest } from 'http';

import type { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import type { Client } from '@navikt/familie-backend';
import { getOnBehalfOfAccessToken } from '@navikt/familie-backend';
import { stdoutLogger } from '@navikt/familie-logging';

import { endringsloggProxyUrl, oboConfig, proxyUrl, redirectRecords } from './config.js';

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

// eslint-disable-next-line
export const doEndringslogProxy: any = () => {
    return createProxyMiddleware('/endringslogg', {
        changeOrigin: true,
        logLevel: 'info',
        onProxyReq: restream,
        pathRewrite: (path: string, _req: Request) => {
            const newPath = path.replace('/endringslogg', '');
            return `${newPath}`;
        },
        secure: true,
        target: `${endringsloggProxyUrl}`,
        logProvider: () => stdoutLogger,
    });
};

export const doRedirectProxy = () => {
    return (req: Request, res: Response) => {
        const urlKey = Object.keys(redirectRecords).find(k => req.originalUrl.includes(k));
        let newUrl;
        if (urlKey) {
            newUrl = req.originalUrl.replace(urlKey, redirectRecords[urlKey]);
            stdoutLogger.info(`Redirect ${urlKey} -> ${redirectRecords[urlKey]}`);
            res.redirect(newUrl);
        } else {
            console.log(`Ustøttet redirect: ${req.originalUrl}`);
            newUrl = req.originalUrl;
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
