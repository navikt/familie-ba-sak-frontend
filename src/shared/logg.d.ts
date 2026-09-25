export type LoggNivå = 'error' | 'warn' | 'info' | 'debug' | 'trace';

export interface LoggPayload {
    loglevel: LoggNivå;
    message: string;
    name?: string;
    stack?: string;
}
