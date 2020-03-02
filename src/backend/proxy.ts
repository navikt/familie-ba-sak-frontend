import Backend from '@navikt/familie-backend';
import { NextFunction, Request, Response } from 'express';
import { ClientRequest } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { v4 as uuidv4 } from 'uuid';
import { oboTokenConfig, proxyUrl, saksbehandlerTokenConfig } from './config';

const restream = (proxyReq: ClientRequest, req: Request, _res: Response) => {
    if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
};

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
    });
};

export const attachToken = (backend: Backend) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        const accessToken = await backend.validerEllerOppdaterOnBehalfOfToken(
            req,
            saksbehandlerTokenConfig,
            oboTokenConfig
        );
        req.headers['Nav-Call-Id'] = uuidv4();
        req.headers.Authorization = `Bearer ${accessToken}`;
        return next();
    };
};
