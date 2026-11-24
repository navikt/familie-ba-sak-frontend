import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import {
    erFagsakAvTypeEnsligMindreårig,
    erFagsakAvTypeInstitusjon,
    erFagsakAvTypeSkjermetBarn,
    FagsakId,
    FagsakType,
} from '@typer/fagsak';
import { describe, expect, test } from 'vitest';

describe('Fagsak', () => {
    describe('ErFagsakAvTypeInstitusjon', () => {
        test('Skal returnere true hvis fagsak er av type institusjon', () => {
            // Arrange
            const fagsak = lagFagsak({ fagsakType: FagsakType.INSTITUSJON });

            // Act
            const erInstitusjon = erFagsakAvTypeInstitusjon(fagsak);

            // Expect
            expect(erInstitusjon).toBe(true);
        });

        test('Skal returnere false hvis fagsak ikke er av type institusjon', () => {
            // Arrange
            const fagsak = lagFagsak({ fagsakType: FagsakType.NORMAL });

            // Act
            const erInstitusjon = erFagsakAvTypeInstitusjon(fagsak);

            // Expect
            expect(erInstitusjon).toBe(false);
        });
    });

    describe('ErFagsakAvTypeEnsligMindreårig', () => {
        test('Skal returnere true hvis fagsak er av type enslig mindreårig', () => {
            // Arrange
            const fagsak = lagFagsak({ fagsakType: FagsakType.BARN_ENSLIG_MINDREÅRIG });

            // Act
            const erEnsligMindreårig = erFagsakAvTypeEnsligMindreårig(fagsak);

            // Expect
            expect(erEnsligMindreårig).toBe(true);
        });

        test('Skal returnere false hvis fagsak ikke er av type enslig mindreårig', () => {
            // Arrange
            const fagsak = lagFagsak({ fagsakType: FagsakType.NORMAL });

            // Act
            const erEnsligMindreårig = erFagsakAvTypeEnsligMindreårig(fagsak);

            // Expect
            expect(erEnsligMindreårig).toBe(false);
        });
    });

    describe('ErFagsakAvTypeSkjermetBarn', () => {
        test('Skal returnere true hvis fagsak er av type skjermet barn', () => {
            // Arrange
            const fagsak = lagFagsak({ fagsakType: FagsakType.SKJERMET_BARN });

            // Act
            const erSkjermetBarn = erFagsakAvTypeSkjermetBarn(fagsak);

            // Expect
            expect(erSkjermetBarn).toBe(true);
        });

        test('Skal returnere false hvis fagsak ikke er av type skjermet barn', () => {
            // Arrange
            const fagsak = lagFagsak({ fagsakType: FagsakType.NORMAL });

            // Act
            const erSkjermetBarn = erFagsakAvTypeSkjermetBarn(fagsak);

            // Expect
            expect(erSkjermetBarn).toBe(false);
        });
    });

    describe('FagsakId.erGyldig', () => {
        test.each([1, 123, Number.MAX_SAFE_INTEGER])('skal returnere true for %s', id => {
            expect(FagsakId.erGyldig(id)).toBe(true);
        });

        test.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER + 1])(
            'skal returnere false for %s',
            id => {
                expect(FagsakId.erGyldig(id)).toBe(false);
            }
        );
    });

    describe('FagsakId.fra', () => {
        test('skal returnere fagsakId for et positivt heltall', () => {
            expect(FagsakId.fra(123)).toBe(123);
        });

        test.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER + 1])(
            'skal kaste feil for %s',
            id => {
                expect(() => FagsakId.fra(id)).toThrow(`Ugyldig fagsakId: ${id}`);
            }
        );
    });
});
