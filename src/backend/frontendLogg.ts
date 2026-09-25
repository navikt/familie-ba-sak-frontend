import type { LoggNivå } from '../shared/logg.js';

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
 * Et validert loggutsagn fra frontend. Bygges kun via `fraBody`, som validerer råpayloaden,
 * og rendres til en sanert loggpost via `tilLoggpost`.
 */
export class FrontendLogg {
    private constructor(
        private readonly message: string,
        private readonly loglevel: LoggNivå,
        private readonly name?: string,
        private readonly stack?: string
    ) {}

    static fraBody(body: unknown): FrontendLogg | undefined {
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

        return new FrontendLogg(message, loglevel, name, stack);
    }

    tilLoggpost(sanitizer: LoggSanitizer, callId?: string): Loggpost {
        return {
            nivå: this.loglevel,
            melding: sanitizer.saniterMelding(this.message),
            meta: {
                frontend: true,
                ...(callId ? { x_callId: callId } : {}),
                ...(this.name ? { name: sanitizer.saniterNavn(this.name) } : {}),
                ...(this.stack ? { stack: sanitizer.saniterStack(this.stack) } : {}),
            },
        };
    }
}
