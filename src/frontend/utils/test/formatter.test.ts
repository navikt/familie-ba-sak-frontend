import { YtelseType } from '../../typer/beregning';
import { lagUtbetalingsperiodeDetalj } from '../../typer/test/utbetalingsperiode.mock';
import familieDayjs from '../familieDayjs';
import {
    datoformat,
    formaterIdent,
    formaterIsoDato,
    formaterTekstStorForbokstav,
    hentAlder,
    kunSiffer,
    sorterUtbetaling,
} from '../formatter';
import { iDag, KalenderEnhet, leggTil, serializeIso8601String, trekkFra } from '../kalender';
import { mockBarn, mockSøker } from './person/person.mock';

describe('utils/formatter', () => {
    test('Skal formatere ident', () => {
        expect(formaterIdent('12345678910')).toBe('123456 78910');
    });

    test('Tester at kunSiffer håndterer negative tall, desimaler og bokstaver riktig', () => {
        expect(kunSiffer('0123')).toBe(true);
        expect(kunSiffer('-123')).toBe(false);
        expect(kunSiffer('123.4')).toBe(false);
        expect(kunSiffer('123,4')).toBe(false);
        expect(kunSiffer('abc')).toBe(false);
        expect(kunSiffer('1a3')).toBe(false);
    });

    test('Skal formatere orgnr', () => {
        expect(formaterIdent('123456789')).toBe('123 456 789');
    });

    test('Skal returnere ukjent ident når identen ikke er numerisk', () => {
        expect(formaterIdent('avsenderid')).toBe('Ukjent id');
    });

    test('Skal returnere ukjent ident når feil lengde på numerisk ident', () => {
        expect(formaterIdent('123456789123')).toBe('Ukjent id');
    });

    test('Skal hente riktig alder fra fødselsdato', () => {
        const toÅrSiden = trekkFra(iDag(), 2, KalenderEnhet.ÅR);
        expect(hentAlder(serializeIso8601String(trekkFra(toÅrSiden, 1, KalenderEnhet.DAG)))).toBe(
            2
        );
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

        test('Skal gi riktig rekkefølge på utbetalinger', () => {
            const utbetalingBarn = lagUtbetalingsperiodeDetalj({
                person: mockBarn,
                ytelseType: YtelseType.ORDINÆR_BARNETRYGD,
            });

            const utbetalingSmåbarnstillegg = lagUtbetalingsperiodeDetalj({
                person: mockSøker(),
                ytelseType: YtelseType.SMÅBARNSTILLEGG,
            });

            const utbetalingUtvidet = lagUtbetalingsperiodeDetalj({
                person: mockSøker(),
                ytelseType: YtelseType.UTVIDET_BARNETRYGD,
            });

            const sorterteUtbetalingsperiodedetaljer = [
                utbetalingBarn,
                utbetalingSmåbarnstillegg,
                utbetalingUtvidet,
            ].sort(sorterUtbetaling);

            expect(sorterteUtbetalingsperiodedetaljer[0]).toEqual(utbetalingUtvidet);
            expect(sorterteUtbetalingsperiodedetaljer[1]).toEqual(utbetalingSmåbarnstillegg);
            expect(sorterteUtbetalingsperiodedetaljer[2]).toEqual(utbetalingBarn);
        });
    });

    test('formaterTekstStorForbokstav', () => {
        //Skal gjøre om tekst til små bokstaver og store forbokstaver
        expect(formaterTekstStorForbokstav('HEI')).toBe('Hei');
        expect(formaterTekstStorForbokstav('hei PÅ deg')).toBe('Hei På Deg');
        expect(formaterTekstStorForbokstav('HEI, Hallo og hei Tilbake.')).toBe(
            'Hei, Hallo Og Hei Tilbake.'
        );
        expect(formaterTekstStorForbokstav('HALLOGATEN 22A')).toBe('Hallogaten 22A');
        expect(formaterTekstStorForbokstav('1234 helsfyr')).toBe('1234 Helsfyr');
        expect(formaterTekstStorForbokstav('hallOGATen, postboks 1234')).toBe(
            'Hallogaten, Postboks 1234'
        );
        expect(formaterTekstStorForbokstav('postboks 1234 sentrum')).toBe('Postboks 1234 Sentrum');
        expect(formaterTekstStorForbokstav('HALLOgaten 22A, 1234 helsfyr')).toBe(
            'Hallogaten 22A, 1234 Helsfyr'
        );
    });
});
