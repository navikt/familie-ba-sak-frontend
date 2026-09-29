import { describe, expect, test } from 'vitest';

import { LoggSanitizer } from './loggSanitizer.js';

describe('LoggSanitizer', () => {
    const sanitizer = new LoggSanitizer();

    describe('sanering av kontrolltegn', () => {
        test('fjerner kontrolltegn som ikke er linjeskift eller tab', () => {
            expect(sanitizer.saniterMelding('start\u0007slutt')).toBe('startslutt');
        });

        test('beholder linjeskift og tab', () => {
            expect(sanitizer.saniterMelding('linje1\nlinje2\tslutt')).toBe('linje1\nlinje2\tslutt');
        });

        test('erstatter vognretur med literal \\r', () => {
            expect(sanitizer.saniterMelding('a\rb')).toBe('a\\rb');
        });

        test('lar vanlig tekst stå urørt', () => {
            expect(sanitizer.saniterMelding('En helt vanlig feilmelding')).toBe('En helt vanlig feilmelding');
        });
    });

    describe('avkorting', () => {
        const kort = new LoggSanitizer({ message: 5, name: 3, stack: 4 });

        test('lar tekst innenfor grensen stå urørt', () => {
            expect(kort.saniterMelding('abcde')).toBe('abcde');
        });

        test('avkorter melding og legger på suffiks med antall fjernede tegn', () => {
            expect(kort.saniterMelding('abcdefgh')).toBe('abcde…(avkortet 3 tegn)');
        });

        test('bruker egen grense for navn', () => {
            expect(kort.saniterNavn('abcdef')).toBe('abc…(avkortet 3 tegn)');
        });

        test('bruker egen grense for stack', () => {
            expect(kort.saniterStack('abcdef')).toBe('abcd…(avkortet 2 tegn)');
        });

        test('avkorter etter sanering, ikke før', () => {
            // Vognretur blir til '\\r' (2 tegn) før avkorting, slik at lengden telles på sanert tekst.
            expect(kort.saniterMelding('a\rbcd')).toBe('a\\rbc…(avkortet 1 tegn)');
        });
    });
});
