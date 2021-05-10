import familieDayjs from '../familieDayjs';
import { datoformat, formaterIsoDato, formaterPersonIdent, hentAlder } from '../formatter';
import { iDag, KalenderEnhet, leggTil, serializeIso8601String, trekkFra } from '../kalender';

describe('utils/formatter', () => {
    test('Skal formatere ident', () => {
        expect(formaterPersonIdent('12345678910')).toBe('123456 78910');
    });

    test('Skal hente riktig alder fra fødselsdato', () => {
        expect(hentAlder(serializeIso8601String(trekkFra(iDag(), 2, KalenderEnhet.ÅR)))).toBe(2);
    });

    test('Skal hente riktig alder før og etter fødselsdato', () => {
        const toÅrSiden = trekkFra(iDag(), 2, KalenderEnhet.ÅR);
        expect(hentAlder(serializeIso8601String(trekkFra(toÅrSiden, 1, KalenderEnhet.DAG)))).toBe(
            2
        );
        expect(hentAlder(serializeIso8601String(leggTil(toÅrSiden, 1, KalenderEnhet.DAG)))).toBe(1);
    });

    describe('formaterIsoDato', () => {
        const dato = familieDayjs('2020-12-01T14:02');
        const datoString = dato.toISOString();

        test('Skal returnere dato på format MM.YY', () => {
            expect(formaterIsoDato(datoString, datoformat.MÅNED)).toEqual('12.20');
        });
        test('Skal returnere dato på format DD.MM.YYYY', () => {
            expect(formaterIsoDato(datoString, datoformat.DATO)).toEqual('01.12.2020');
        });
        test('Skal returnere dato på format DD.MM.YY', () => {
            expect(formaterIsoDato(datoString, datoformat.DATO_FORKORTTET)).toEqual('01.12.20');
        });
        test('Skal returnere dato på format LL', () => {
            expect(formaterIsoDato(datoString, datoformat.DATO_FORLENGET)).toEqual(
                '1. desember 2020'
            );
        });
        test('Skal returnere dato på format LLL', () => {
            expect(formaterIsoDato(datoString, datoformat.DATO_FORLENGET_MED_TID)).toEqual(
                `1. desember 2020 kl. ${dato.format('HH:mm')}`
            );
        });
        test('Skal returnere dato på format YYYY-MM', () => {
            expect(formaterIsoDato(datoString, datoformat.ISO_MÅNED)).toEqual('2020-12');
        });
        test('Skal returnere dato på format YYYY-MM-DD', () => {
            expect(formaterIsoDato(datoString, datoformat.ISO_DAG)).toEqual('2020-12-01');
        });
        test('Skal returnere dato på format DD.MM.YY HH:mm', () => {
            expect(formaterIsoDato(datoString, datoformat.DATO_TID)).toEqual(
                `01.12.20 ${dato.format('HH:mm')}`
            );
        });
        test('Skal returnere dato på format HH:mm', () => {
            expect(formaterIsoDato(datoString, datoformat.TID)).toEqual(dato.format('HH:mm'));
        });
        test('Skal returnere dato på format MMMM YYYY', () => {
            expect(formaterIsoDato(datoString, datoformat.MÅNED_ÅR_NAVN)).toEqual('desember 2020');
        });
    });
});
