import { datoformat, formaterIsoDato } from '../formatter';

describe('utils/formatter', () => {
    describe('formaterIsoDato', () => {
        const dato = '2020-12-01T14:02';

        test('Skal returnere dato på format MM.YY', () => {
            expect(formaterIsoDato(dato, datoformat.MÅNED)).toEqual('12.20');
        });
        test('Skal returnere dato på format DD.MM.YYYY', () => {
            expect(formaterIsoDato(dato, datoformat.DATO)).toEqual('01.12.2020');
        });
        test('Skal returnere dato på format DD.MM.YY', () => {
            expect(formaterIsoDato(dato, datoformat.DATO_FORKORTTET)).toEqual('01.12.20');
        });
        test('Skal returnere dato på format LL', () => {
            expect(formaterIsoDato(dato, datoformat.DATO_FORLENGET)).toEqual('1. desember 2020');
        });
        test('Skal returnere dato på format LLL', () => {
            expect(formaterIsoDato(dato, datoformat.DATO_FORLENGET_MED_TID)).toEqual(
                '1. desember 2020 kl. 14:02'
            );
        });
        test('Skal returnere dato på format YYYY-MM', () => {
            expect(formaterIsoDato(dato, datoformat.ISO_MÅNED)).toEqual('2020-12');
        });
        test('Skal returnere dato på format YYYY-MM-DD', () => {
            expect(formaterIsoDato(dato, datoformat.ISO_DAG)).toEqual('2020-12-01');
        });
        test('Skal returnere dato på format DD.MM.YY HH:mm', () => {
            expect(formaterIsoDato(dato, datoformat.DATO_TID)).toEqual('01.12.20 14:02');
        });
        test('Skal returnere dato på format HH:mm', () => {
            expect(formaterIsoDato(dato, datoformat.TID)).toEqual('14:02');
        });
        test('Skal returnere dato på format MMMM YYYY', () => {
            expect(formaterIsoDato(dato, datoformat.MÅNED_NAVN)).toEqual('desember 2020');
        });
    });
});
