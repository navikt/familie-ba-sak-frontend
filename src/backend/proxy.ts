import { Client, getOnBehalfOfAccessToken, stdoutLogger } from '@navikt/familie-backend';
import { NextFunction, Request, Response } from 'express';
import { ClientRequest } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { v4 as uuidv4 } from 'uuid';
import { oboConfig, proxyUrl } from './config';

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
        logProvider: () => ({
            log: stdoutLogger.log,
            debug: stdoutLogger.debug,
            info: stdoutLogger.info,
            warn: stdoutLogger.warn,
            error: stdoutLogger.error,
        }),
    });
};

export const attachToken = (authClient: Client) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        getOnBehalfOfAccessToken(authClient, req, oboConfig).then((accessToken: string) => {
            req.headers['Nav-Call-Id'] = uuidv4();
            req.headers.Authorization = `Bearer ${accessToken}`;
            return next();
        });
    };
};
