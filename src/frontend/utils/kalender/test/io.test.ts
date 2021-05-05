import { kalenderDato } from '../kalender';

describe('Skal teste parsing av datoer', () => {
    test('Parse gyldig dato', () => {
        const dagMånedÅr = kalenderDato('2020-03-12');

        expect(dagMånedÅr.år).toBe(2020);
        expect(dagMånedÅr.måned).toBe(2);
        expect(dagMånedÅr.dag).toBe(12);
    });

    test('Parse ugyldig måned på grunn av feil format', () => {
        expect(() => kalenderDato('2020-3-12')).toThrowError("Dato '2020-3-12' er ugyldig");
    });

    test('Parse ugyldig måned på grunn av feil tallverdi', () => {
        expect(() => kalenderDato('2020-13-12')).toThrowError(
            "Måned fra dato '2020-13-12' er '13' og er sannsynligvis feil"
        );
    });

    test('Parse ugyldig dag på grunn av feil format', () => {
        expect(() => kalenderDato('2020-3-12')).toThrowError("Dato '2020-3-12' er ugyldig");
    });

    test('Parse ugyldig dag på grunn av feil tallverdi', () => {
        expect(() => kalenderDato('2020-02-30')).toThrowError(
            "Dag fra dato '2020-02-30' er '30' og er sannsynligvis feil"
        );
    });
});
