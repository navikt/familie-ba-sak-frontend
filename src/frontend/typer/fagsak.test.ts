import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import {
    erFagsakAvTypeEnsligMindreårig,
    erFagsakAvTypeInstitusjon,
    erFagsakAvTypeSkjermetBarn,
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
});
