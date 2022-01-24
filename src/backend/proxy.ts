import { ClientRequest } from 'http';

import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { Client, getOnBehalfOfAccessToken } from '@navikt/familie-backend';
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
    return createProxyMiddleware('/familie-ba-sak/api', {
        changeOrigin: true,
        logLevel: 'info',
        onProxyReq: restream,
        pathRewrite: (path: string, _req: Request) => {
            const newPath = path.replace('/familie-ba-sak/api', '');
            return `/api${newPath}`;
        },
        secure: true,
        target: `${proxyUrl}`,
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
