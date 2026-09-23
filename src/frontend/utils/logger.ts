type LoggNivå = 'error' | 'warn' | 'info' | 'debug' | 'trace';

interface LoggFeil {
    name?: string;
    stack?: string;
}

const LOGG_ENDEPUNKT = '/logg';

const sendLogg = (loglevel: LoggNivå, message: string, feil?: LoggFeil): void => {
    // Fire-and-forget: logging skal aldri kaste eller blokkere applikasjonen.
    void fetch(LOGG_ENDEPUNKT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loglevel, message, name: feil?.name, stack: feil?.stack }),
        keepalive: true,
    }).catch(() => undefined);
};

/**
 * Isomorf-ish frontend-logger som sender strukturerte logglinjer til BFF-ens `/logg`-endepunkt,
 * som igjen logger dem via pino. Send aldri fødselsnummer eller andre personopplysninger.
 */
export const logger = {
    error: (message: string, feil?: LoggFeil): void => sendLogg('error', message, feil),
    warn: (message: string, feil?: LoggFeil): void => sendLogg('warn', message, feil),
    info: (message: string, feil?: LoggFeil): void => sendLogg('info', message, feil),
    debug: (message: string, feil?: LoggFeil): void => sendLogg('debug', message, feil),
    trace: (message: string, feil?: LoggFeil): void => sendLogg('trace', message, feil),
};
