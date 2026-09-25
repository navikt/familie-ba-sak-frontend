import { describe, expect, test } from 'vitest';

import type { LoggNivå } from '../shared/logg.js';

import { FrontendLogg } from './frontendLogg.js';
import type { LoggSanitizer } from './loggSanitizer.js';

/**
 * Enkel stubb som prefikser hvert felt, slik at vi kan verifisere at riktig sanitiseringsmetode
 * brukes på riktig felt uten å teste LoggSanitizer på nytt.
 */
const stubSanitizer = {
    saniterMelding: (tekst: string) => `M:${tekst}`,
    saniterNavn: (tekst: string) => `N:${tekst}`,
    saniterStack: (tekst: string) => `S:${tekst}`,
} as unknown as LoggSanitizer;

describe('FrontendLogg', () => {
    describe('fraBody – validering', () => {
        test.each([[undefined], [null], ['streng'], [42], [[]]])('returnerer undefined for ugyldig body: %s', body => {
            expect(FrontendLogg.fraBody(body)).toBeUndefined();
        });

        test('returnerer undefined når message mangler', () => {
            expect(FrontendLogg.fraBody({ loglevel: 'warn' })).toBeUndefined();
        });

        test('returnerer undefined når message er tom', () => {
            expect(FrontendLogg.fraBody({ message: '', loglevel: 'warn' })).toBeUndefined();
        });

        test('returnerer undefined når loglevel er ugyldig', () => {
            expect(FrontendLogg.fraBody({ message: 'hei', loglevel: 'WARN' })).toBeUndefined();
            expect(FrontendLogg.fraBody({ message: 'hei', loglevel: 'fatal' })).toBeUndefined();
            expect(FrontendLogg.fraBody({ message: 'hei' })).toBeUndefined();
        });

        test('returnerer undefined når name ikke er en streng', () => {
            expect(FrontendLogg.fraBody({ message: 'hei', loglevel: 'warn', name: 123 })).toBeUndefined();
        });

        test('returnerer undefined når stack ikke er en streng', () => {
            expect(FrontendLogg.fraBody({ message: 'hei', loglevel: 'warn', stack: {} })).toBeUndefined();
        });

        test.each<LoggNivå>(['error', 'warn', 'info', 'debug', 'trace'])('godtar gyldig nivå: %s', loglevel => {
            expect(FrontendLogg.fraBody({ message: 'hei', loglevel })).toBeInstanceOf(FrontendLogg);
        });
    });

    describe('tilLoggpost – bygging', () => {
        test('bygger sanert loggpost med callId, name og stack', () => {
            const logg = FrontendLogg.fraBody({
                message: 'noe feilet',
                loglevel: 'error',
                name: 'TypeError',
                stack: 'at foo (bar.ts:1)',
            });

            const loggpost = logg?.tilLoggpost(stubSanitizer, 'call-123');

            expect(loggpost).toEqual({
                nivå: 'error',
                melding: 'M:noe feilet',
                meta: {
                    frontend: true,
                    x_callId: 'call-123',
                    name: 'N:TypeError',
                    stack: 'S:at foo (bar.ts:1)',
                },
            });
        });

        test('utelater x_callId når callId mangler', () => {
            const logg = FrontendLogg.fraBody({ message: 'hei', loglevel: 'info' });

            const loggpost = logg?.tilLoggpost(stubSanitizer);

            expect(loggpost?.meta).not.toHaveProperty('x_callId');
        });

        test('utelater name og stack når de ikke er oppgitt', () => {
            const logg = FrontendLogg.fraBody({ message: 'hei', loglevel: 'info' });

            const loggpost = logg?.tilLoggpost(stubSanitizer, 'call-123');

            expect(loggpost?.meta).toEqual({ frontend: true, x_callId: 'call-123' });
        });
    });
});
