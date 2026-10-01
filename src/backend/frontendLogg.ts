import type { LoggNivå, LoggPayload } from '../shared/logg.js';

import type { LoggSanitizer } from './loggSanitizer.js';

export interface Loggpost {
    nivå: LoggNivå;
    melding: string;
    meta: Record<string, unknown>;
}

const GYLDIGE_NIVÅER = ['error', 'warn', 'info', 'debug', 'trace'] as const satisfies readonly LoggNivå[];

const erGyldigNivå = (verdi: unknown): verdi is LoggNivå =>
    typeof verdi === 'string' && (GYLDIGE_NIVÅER as readonly string[]).includes(verdi);

/**
 * Validering og rendring av loggutsagn fra frontend. `fraBody` validerer råpayloaden til en
 * `LoggPayload`, og `tilLoggpost` rendrer den til en sanert loggpost.
 */
export class FrontendLogg {
    static fraBody(body: unknown): LoggPayload | undefined {
        if (typeof body !== 'object' || body === null) {
            return undefined;
        }

        const { message, name, stack, loglevel } = body as Record<string, unknown>;

        if (typeof message !== 'string' || message.length === 0) {
            return undefined;
        }
        if (!erGyldigNivå(loglevel)) {
            return undefined;
        }
        if (name !== undefined && typeof name !== 'string') {
            return undefined;
        }
        if (stack !== undefined && typeof stack !== 'string') {
            return undefined;
        }

        return { message, loglevel, name, stack };
    }

    static tilLoggpost(payload: LoggPayload, sanitizer: LoggSanitizer, callId?: string): Loggpost {
        return {
            nivå: payload.loglevel,
            melding: sanitizer.saniterMelding(payload.message),
            meta: {
                frontend: true,
                ...(callId ? { x_callId: callId } : {}),
                ...(payload.name ? { name: sanitizer.saniterNavn(payload.name) } : {}),
                ...(payload.stack ? { stack: sanitizer.saniterStack(payload.stack) } : {}),
            },
        };
    }
}
