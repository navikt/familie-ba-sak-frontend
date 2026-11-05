import { PersonTestdata } from '@testutils/testdata/personTestdata';
import { VedtaksperiodeTestdata } from '@testutils/testdata/vedtaksperiodeTestdata';
import { FagsakDeltagerRolle, type IFagsakDeltager } from '@typer/fagsakdeltager';
import { PersonType } from '@typer/person';
import { describe, expect, test } from 'vitest';

import { obfuskerFagsakDeltager, obfuskerUtbetalingsperioder } from './obfuskerData';

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

describe('obfuskerUtbetalingsperioder', () => {
    function lagDetalj(navn: string, type: PersonType, fødselsdato: string) {
        return VedtaksperiodeTestdata.lagUtbetalingsperiodeDetalj({
            person: PersonTestdata.lagGrunnlagPerson({ navn, type, fødselsdato }),
        });
    }

    test('skal erstatte navn, sortere på fødselsdato og nummerere barna per periode', () => {
        // Arrange
        const utbetalingsperioder = [
            VedtaksperiodeTestdata.lagUtbetalingsperiode({
                utbetalingsperiodeDetaljer: [
                    lagDetalj('Eldste Barn', PersonType.BARN, '2015-01-01'),
                    lagDetalj('Ekte Søker', PersonType.SØKER, '1985-01-01'),
                    lagDetalj('Yngste Barn', PersonType.BARN, '2020-01-01'),
                ],
            }),
            VedtaksperiodeTestdata.lagUtbetalingsperiode({
                utbetalingsperiodeDetaljer: [lagDetalj('Eldste Barn', PersonType.BARN, '2015-01-01')],
            }),
        ];

        // Act
        const obfuskert = obfuskerUtbetalingsperioder(utbetalingsperioder);

        // Assert
        expect(obfuskert[0].utbetalingsperiodeDetaljer.map(detalj => detalj.person.navn)).toEqual([
            '[1] Barn Barnesen',
            '[2] Barn Barnesen',
            'Søker Søkersen',
        ]);
        expect(obfuskert[1].utbetalingsperiodeDetaljer.map(detalj => detalj.person.navn)).toEqual([
            '[1] Barn Barnesen',
        ]);
    });

    test('skal ikke endre de opprinnelige utbetalingsperiodene', () => {
        // Arrange
        const utbetalingsperioder = [
            VedtaksperiodeTestdata.lagUtbetalingsperiode({
                utbetalingsperiodeDetaljer: [
                    lagDetalj('Eldste Barn', PersonType.BARN, '2015-01-01'),
                    lagDetalj('Yngste Barn', PersonType.BARN, '2020-01-01'),
                ],
            }),
        ];
        const kopi = structuredClone(utbetalingsperioder);

        // Act
        obfuskerUtbetalingsperioder(utbetalingsperioder);

        // Assert
        expect(utbetalingsperioder).toEqual(kopi);
    });
});
