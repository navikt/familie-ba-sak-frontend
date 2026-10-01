import { FagsakDeltagerRolle, type IFagsakDeltager } from '@typer/fagsakdeltager';
import { describe, expect, test } from 'vitest';

import { obfuskerFagsakDeltager } from './obfuskerData';

function lagFagsakDeltager(rolle: FagsakDeltagerRolle): IFagsakDeltager {
    return { navn: 'Ekte Navn', ident: '12345678903', rolle, harTilgang: true, erEgenAnsatt: false };
}

describe('obfuskerFagsakDeltager', () => {
    test.each([
        [FagsakDeltagerRolle.Barn, 'Barn'],
        [FagsakDeltagerRolle.Forelder, 'Forelder'],
        [FagsakDeltagerRolle.Ukjent, 'Ukjent rolle'],
    ])('skal erstatte navnet for rolle %s med "%s"', (rolle, forventetNavn) => {
        // Arrange
        const fagsakDeltager = lagFagsakDeltager(rolle);

        // Act
        const obfuskert = obfuskerFagsakDeltager(fagsakDeltager);

        // Assert
        expect(obfuskert).toEqual({ ...fagsakDeltager, navn: forventetNavn });
    });

    test('skal ikke endre det opprinnelige objektet', () => {
        // Arrange
        const fagsakDeltager = lagFagsakDeltager(FagsakDeltagerRolle.Forelder);

        // Act
        obfuskerFagsakDeltager(fagsakDeltager);

        // Assert
        expect(fagsakDeltager.navn).toBe('Ekte Navn');
    });
});
