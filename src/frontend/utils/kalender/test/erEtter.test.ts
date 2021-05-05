import { erFør, kalenderDato, erEtter } from '../kalender';

const positiv = erEtter;
const negativ = erFør;
describe('Skal teste før og etter logikk', () => {
    test('Inneværende måned', () => {
        const dagMånedÅr = kalenderDato('2020-07-15');
        const dagMånedÅr2 = kalenderDato('2020-07-10');

        expect(positiv(dagMånedÅr, dagMånedÅr2)).toBe(true);
        expect(negativ(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });

    test('Ulik måned med samme dag', () => {
        const dagMånedÅr = kalenderDato('2020-08-10');
        const dagMånedÅr2 = kalenderDato('2020-07-10');

        expect(positiv(dagMånedÅr, dagMånedÅr2)).toBe(true);
        expect(negativ(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });

    test('Er etter i senere måned med tidligere dag', () => {
        const dagMånedÅr = kalenderDato('2020-08-15');
        const dagMånedÅr2 = kalenderDato('2020-07-10');

        expect(positiv(dagMånedÅr, dagMånedÅr2)).toBe(true);
        expect(negativ(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });

    test('Er etter i senere måned med dag etter', () => {
        const dagMånedÅr = kalenderDato('2020-08-08');
        const dagMånedÅr2 = kalenderDato('2020-07-10');

        expect(positiv(dagMånedÅr, dagMånedÅr2)).toBe(true);
        expect(negativ(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });

    test('Er etter i senere år', () => {
        const dagMånedÅr = kalenderDato('2022-08-08');
        const dagMånedÅr2 = kalenderDato('2020-07-10');

        expect(positiv(dagMånedÅr, dagMånedÅr2)).toBe(true);
        expect(negativ(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });

    test('Er etter i senere år med samme dag', () => {
        const dagMånedÅr = kalenderDato('2022-07-10');
        const dagMånedÅr2 = kalenderDato('2020-07-10');

        expect(positiv(dagMånedÅr, dagMånedÅr2)).toBe(true);
        expect(negativ(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });

    test('Er ikke etter i tidligere år med samme dag', () => {
        const dagMånedÅr = kalenderDato('2022-07-10');
        const dagMånedÅr2 = kalenderDato('2020-07-10');

        expect(positiv(dagMånedÅr, dagMånedÅr2)).toBe(true);
        expect(negativ(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });
});
