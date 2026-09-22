/// <reference types="express-session" />
/// <reference types="@navikt/familie-backend" />
import { logger } from '@navikt/pino-logger';
import type { Request } from 'express';

export { logger };

export type LoggNivå = 'debug' | 'info' | 'warn' | 'error';

const prefiks = (req: Request): string => {
    const bruker = req.session?.user?.displayName
        ? `${req.session.user.displayName} -`
        : 'ugyldig sesjon eller mangler brukers data -';
    return `${bruker} ${req.method} - ${req.originalUrl}`;
};

export const logRequest = (req: Request, melding: string, nivå: LoggNivå = 'info', feil?: unknown): void => {
    const fullMelding = `${prefiks(req)}: ${melding}`;
    const callId = req.header('nav-call-id');
    const requestId = req.header('x-request-id');

    const metadata = {
        ...(callId ? { x_callId: callId } : {}),
        ...(requestId ? { x_requestId: requestId } : {}),
        ...(feil ? { err: feil } : {}),
    };

    logger[nivå](metadata, fullMelding);
};
