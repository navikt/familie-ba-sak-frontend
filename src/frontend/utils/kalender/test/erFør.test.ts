import { erEtter, kalenderDato, erFør } from '../kalender';

const positiv = erFør;
const negativ = erEtter;
describe('Skal teste er før logikk', () => {
    test('Er før i inneværende måned', () => {
        const dagMånedÅr = kalenderDato('2020-07-10');
        const dagMånedÅr2 = kalenderDato('2020-07-15');

        expect(positiv(dagMånedÅr, dagMånedÅr2)).toBe(true);
        expect(negativ(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });

    test('Er før i tidligere måned med samme dag', () => {
        const dagMånedÅr = kalenderDato('2020-07-10');
        const dagMånedÅr2 = kalenderDato('2020-08-10');

        expect(positiv(dagMånedÅr, dagMånedÅr2)).toBe(true);
        expect(negativ(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });

    test('Er før i tidligere måned med tidligere dag', () => {
        const dagMånedÅr = kalenderDato('2020-07-10');
        const dagMånedÅr2 = kalenderDato('2020-08-15');

        expect(positiv(dagMånedÅr, dagMånedÅr2)).toBe(true);
        expect(negativ(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });

    test('Er før i tidligere måned med dag etter', () => {
        const dagMånedÅr = kalenderDato('2020-07-10');
        const dagMånedÅr2 = kalenderDato('2020-08-08');

        expect(positiv(dagMånedÅr, dagMånedÅr2)).toBe(true);
        expect(negativ(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });

    test('Er før i tidligere år', () => {
        const dagMånedÅr = kalenderDato('2020-07-10');
        const dagMånedÅr2 = kalenderDato('2022-08-08');

        expect(positiv(dagMånedÅr, dagMånedÅr2)).toBe(true);
        expect(negativ(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });

    test('Er før i tidligere år med samme dag', () => {
        const dagMånedÅr = kalenderDato('2020-07-10');
        const dagMånedÅr2 = kalenderDato('2022-07-10');

        expect(positiv(dagMånedÅr, dagMånedÅr2)).toBe(true);
        expect(negativ(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });
});
