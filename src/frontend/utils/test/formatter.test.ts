import { addDays, setDefaultOptions, subDays, subYears } from 'date-fns';
import { nb } from 'date-fns/locale';

import { dagensDato, dateTilIsoDatoString } from '../dato';
import { formaterIdent, formaterTekstStorForbokstav, hentAlder, kunSiffer } from '../formatter';

describe('formaterIdent', () => {
    beforeAll(() => {
        // Setter default locale til norsk bokmål for date-fns
        setDefaultOptions({ locale: nb });
    });
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
});

describe('hentAlder', () => {
    test('Skal hente riktig alder før og etter fødselsdato', () => {
        const toÅrSiden = subYears(dagensDato, 2);
        expect(hentAlder(dateTilIsoDatoString(subDays(toÅrSiden, 1)))).toBe(2);
        expect(hentAlder(dateTilIsoDatoString(addDays(toÅrSiden, 1)))).toBe(1);
    });
});

describe('formaterTekstStorForbokstav', () => {
    test('Skal gjøre om tekst til små bokstaver og store forbokstaver', () => {
        expect(formaterTekstStorForbokstav('HEI')).toBe('Hei');
        expect(formaterTekstStorForbokstav('hei PÅ deg')).toBe('Hei På Deg');
        expect(formaterTekstStorForbokstav('HEI, Hallo og hei Tilbake.')).toBe('Hei, Hallo Og Hei Tilbake.');
    });
    test('Skal håndtere postadresser, husbokstaver og poststeder', () => {
        expect(formaterTekstStorForbokstav('HALLOGATEN 22A')).toBe('Hallogaten 22A');
        expect(formaterTekstStorForbokstav('1234 helsfyr')).toBe('1234 Helsfyr');
        expect(formaterTekstStorForbokstav('hallOGATen, postboks 1234')).toBe('Hallogaten, Postboks 1234');
        expect(formaterTekstStorForbokstav('postboks 1234 åsnes')).toBe('Postboks 1234 Åsnes');
        expect(formaterTekstStorForbokstav('HALLOgaten 22A, 1234 helsfyr')).toBe('Hallogaten 22A, 1234 Helsfyr');
    });
});
