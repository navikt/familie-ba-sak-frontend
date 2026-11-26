import { type Brand, lagBrandedIdFactory, type NoBrand } from '@typer/brand';
import { describe, expect, expectTypeOf, test } from 'vitest';

const TestId = lagBrandedIdFactory('TestId');
type TestId = Brand<number, 'TestId'>;

const ugyldigeIder = [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER + 1];

describe('Brand', () => {
    describe('lagBrandedIdFactory', () => {
        describe('erGyldig', () => {
            test.each([1, 123, Number.MAX_SAFE_INTEGER])('skal returnere true for %s', id => {
                expect(TestId.erGyldig(id)).toBe(true);
            });

            test.each(ugyldigeIder)('skal returnere false for %s', id => {
                expect(TestId.erGyldig(id)).toBe(false);
            });
        });

        describe('fra', () => {
            test('skal returnere id for et positivt heltall', () => {
                expect(TestId.fra(123)).toBe(123);
            });

            test.each(ugyldigeIder)('skal kaste feil med feltnavn i camelCase for %s', id => {
                expect(() => TestId.fra(id)).toThrow(`Ugyldig testId: ${id}`);
            });
        });
    });

    describe('NoBrand', () => {
        test('skal erstatte branded felter med underliggende type og beholde andre felter', () => {
            type TestTekst = Brand<string, 'TestTekst'>;
            interface Eksempel {
                id: TestId;
                valgfriId?: TestId;
                nullbarId: TestId | null;
                tekst: TestTekst;
                navn: string;
                antall: number;
            }

            expectTypeOf<NoBrand<Eksempel>>().toEqualTypeOf<{
                id: number;
                valgfriId?: number;
                nullbarId: number | null;
                tekst: string;
                navn: string;
                antall: number;
            }>();
        });
    });
});
