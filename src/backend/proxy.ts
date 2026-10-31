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

const erInvalidGrant = (feil: unknown): boolean =>
    typeof feil === 'object' &&
    feil !== null &&
    (('error' in feil && feil.error === 'invalid_grant') ||
        ('message' in feil && typeof feil.message === 'string' && feil.message.includes('invalid_grant')));

const hentErrorDescription = (feil: unknown): string | undefined =>
    typeof feil === 'object' &&
    feil !== null &&
    'error_description' in feil &&
    typeof feil.error_description === 'string'
        ? feil.error_description
        : undefined;

const håndterFeilVedHentingAvOboToken = (feil: unknown, req: Request, res: Response) => {
    // ensureAuthenticated kan allerede ha svart 401 (feilet token-refresh) og likevel kalt next().
    if (res.headersSent) {
        return;
    }
    const callId = req.headers['nav-call-id'];
    if (erInvalidGrant(feil)) {
        logger.info(
            `Fikk ikke OBO-token for ${req.path} (invalid_grant): ${hentErrorDescription(feil) ?? 'ukjent årsak'}`
        );
        res.status(403).json({
            status: 'IKKE_TILGANG',
            frontendFeilmelding:
                'Fikk ikke tilgang til familie-ba-sak. Det er mulig at du ikke har tilgang, eller at du må logge inn på nytt.',
            callId,
        });
    } else {
        logger.error({ err: feil, callId }, `Uventet feil ved henting av OBO-token for ${req.path}`);
        res.status(500).json({
            status: 'FEILET',
            frontendFeilmelding: 'Uventet feil ved henting av tilgangstoken. Vennligst prøv på nytt.',
            callId,
        });
    }
};

export const attachToken = (authConfig: Configuration) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        let accessToken: string;
        try {
            accessToken = await getOnBehalfOfAccessToken(authConfig, req, oboConfig);
        } catch (feil) {
            return håndterFeilVedHentingAvOboToken(feil, req, res);
        }
        req.headers.Authorization = `Bearer ${accessToken}`;
        return next();
    };
};
