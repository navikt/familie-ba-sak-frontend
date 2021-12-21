import { ClientRequest } from 'http';

import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { v4 as uuidv4 } from 'uuid';

import { Client, getOnBehalfOfAccessToken } from '@navikt/familie-backend';
import { stdoutLogger, logError } from '@navikt/familie-logging';
import { ApiRessurs, RessursStatus } from '@navikt/familie-typer';

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

const pdfProxyUrlRecord: Record<string, string> = {
    '/api/pdf-proxy/journalpost': '/api/journalpost',
};

// eslint-disable-next-line
export const doPdfProxy: any = () => {
    return createProxyMiddleware('/api/pdf-proxy', {
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
                    let data = 'Ukjent feil ved visning dokument';
                    let visfrontendFeilmelding = true;
                    const ressurs: ApiRessurs<string> = JSON.parse(dokumentData);

                    if (ressurs.status === RessursStatus.SUKSESS) {
                        visfrontendFeilmelding = false;
                        data = ressurs.data;
                    } else if (
                        ressurs.status === RessursStatus.FUNKSJONELL_FEIL ||
                        ressurs.status === RessursStatus.FEILET ||
                        ressurs.status === RessursStatus.IKKE_TILGANG
                    ) {
                        visfrontendFeilmelding = true;
                        data =
                            ressurs.frontendFeilmelding ??
                            ressurs.melding ??
                            'Ukjent feil ved visning dokument';
                    }

                    if (visfrontendFeilmelding) {
                        res.setHeader('content-encoding', 'utf-8');
                        res.setHeader('Content-Type', 'text/plain');
                        _end.call(res, data, 'utf-8');
                    } else {
                        res.setHeader('content-encoding', 'base64');
                        res.setHeader('Content-Type', 'application/pdf');
                        _end.call(res, data, 'base64');
                    }
                } catch (error) {
                    logError(`Proxying av pdf feilet: ${error}`);
                }
            };
        },
    });
};

export const attachToken = (authClient: Client) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        getOnBehalfOfAccessToken(authClient, req, oboConfig).then((accessToken: string) => {
            req.headers['Nav-Call-Id'] = uuidv4();
            req.headers['Nav-Consumer-Id'] = 'familie-ba-sak-front';
            req.headers.Authorization = `Bearer ${accessToken}`;
            return next();
        });
    };
};
