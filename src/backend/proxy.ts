import { ClientRequest } from 'http';

import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { v4 as uuidv4 } from 'uuid';

import { Client, getOnBehalfOfAccessToken, stdoutLogger } from '@navikt/familie-backend';

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
        logProvider: () => stdoutLogger,
    });
};

// eslint-disable-next-line
export const doHentDokumentProxy: any = () => {
    return createProxyMiddleware('/proxy/api/hentDokument', {
        changeOrigin: true,
        logLevel: 'info',
        onProxyReq: restream,
        pathRewrite: (path: string, _req: Request) => {
            const newPath = path.replace('/proxy/api/hentDokument', '/journalpost');
            return `/api${newPath}`;
        },
        secure: true,
        target: `${proxyUrl}`,
        logProvider: () => stdoutLogger,
        onProxyRes: (proxyRes, _, res) => {
            let dokumentData = Buffer.from('Ukjent feil ved vis dokument');
            let visfrontendFeilmelding = true;
            const _end = res.end;
            res.write = () => true;
            proxyRes.on('data', data => {
                try {
                    JSON.parse(Buffer.from(data).toString(), (k, v) => {
                        if ((k === 'data' || k === 'frontendFeilmelding') && v) {
                            dokumentData = Buffer.from(v, 'utf-8');
                        }
                        if (k === 'data' && v) {
                            visfrontendFeilmelding = false;
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            });
            res.end = () => {
                res.setHeader('content-length', Buffer.byteLength(dokumentData));
                if (visfrontendFeilmelding) {
                    res.setHeader('content-encoding', 'utf-8');
                    res.setHeader('Content-Type', 'text/plain');
                    _end.call(res, dokumentData.toString('utf-8'), 'utf-8');
                } else {
                    res.setHeader('content-encoding', 'base64');
                    res.setHeader('Content-Type', 'application/pdf');
                    _end.call(res, dokumentData.toString('utf-8'), 'base64');
                }
            };
        },
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
