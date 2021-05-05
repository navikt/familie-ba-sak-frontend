import { erISammeMåned, kalenderDato } from '../kalender';

describe('Skal teste om datoer er i samme måned', () => {
    test('Positiv test', () => {
        const dagMånedÅr = kalenderDato('2020-03-10');
        const dagMånedÅr2 = kalenderDato('2020-03-19');

        expect(erISammeMåned(dagMånedÅr, dagMånedÅr2)).toBe(true);
    });

    test('Negativ test med ulik måned og samme år', () => {
        const dagMånedÅr = kalenderDato('2020-04-10');
        const dagMånedÅr2 = kalenderDato('2020-03-19');

        expect(erISammeMåned(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });

    test('Negativ test med samme måned og ulikt år', () => {
        const dagMånedÅr = kalenderDato('2020-03-10');
        const dagMånedÅr2 = kalenderDato('2019-03-19');

        expect(erISammeMåned(dagMånedÅr, dagMånedÅr2)).toBe(false);
    });
});
