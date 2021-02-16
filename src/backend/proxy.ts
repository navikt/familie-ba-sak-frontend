import { ClientRequest } from 'http';

import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { v4 as uuidv4 } from 'uuid';

import { Client, getOnBehalfOfAccessToken } from '@navikt/familie-backend';
import { stdoutLogger } from '@navikt/familie-logging';

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

const pdfProxyUrlRecord: Record<string, string> = {
    '/api/pdf/journalpost': '/api/journalpost',
};

// eslint-disable-next-line
export const doPdfProxy: any = () => {
    return createProxyMiddleware('/api/pdf', {
        changeOrigin: true,
        logLevel: 'info',
        onProxyReq: restream,
        pathRewrite: (path: string, _req: Request) => {
            const urlKey = Object.keys(pdfProxyUrlRecord).find(k => path.includes(k));
            const newPath = urlKey ? path.replace(urlKey, pdfProxyUrlRecord[urlKey]) : path;
            return `${newPath}`;
        },
        secure: true,
        target: `${proxyUrl}`,
        logProvider: () => stdoutLogger,
        onProxyRes: (proxyRes, _, res) => {
            let dokumentData = '';
            const _end = res.end;
            res.write = () => true;
            proxyRes.on('data', chunk => {
                dokumentData += chunk;
            });

            res.end = () => {
                try {
                    let dataVises = 'Ukjent feil ved visning dokument';
                    let visfrontendFeilmelding = true;
                    JSON.parse(dokumentData, (k, v) => {
                        if ((k === 'data' || k === 'frontendFeilmelding') && v) {
                            dataVises = v;
                        }
                        if (k === 'data' && v) {
                            visfrontendFeilmelding = false;
                        }
                    });
                    res.setHeader('content-length', Buffer.byteLength(dataVises));
                    if (visfrontendFeilmelding) {
                        res.setHeader('content-encoding', 'utf-8');
                        res.setHeader('Content-Type', 'text/plain');
                        _end.call(res, dataVises, 'utf-8');
                    } else {
                        res.setHeader('content-encoding', 'base64');
                        res.setHeader('Content-Type', 'application/pdf');
                        _end.call(res, dataVises, 'base64');
                    }
                } catch (error) {
                    console.log(error);
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
