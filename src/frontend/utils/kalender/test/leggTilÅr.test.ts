import { kalenderDato, leggTilÅr } from '../kalender';

describe('Skal teste legg til år logikk', () => {
    test('Legg til 0 år', () => {
        const dagMånedÅr = kalenderDato('2020-07-10');

        const nyDagMånedÅr = leggTilÅr(dagMånedÅr, 0);
        expect(nyDagMånedÅr.år).toBe(2020);
    });

    test('Legg til 2 år', () => {
        const dagMånedÅr = kalenderDato('2020-07-10');

        const nyDagMånedÅr = leggTilÅr(dagMånedÅr, 2);
        expect(nyDagMånedÅr.år).toBe(2022);
    });

    test('Legg til 1 år ved skuddår', () => {
        const dagMånedÅr = kalenderDato('2020-02-29');

        const nyDagMånedÅr = leggTilÅr(dagMånedÅr, 1);
        expect(nyDagMånedÅr.år).toBe(2021);
        expect(nyDagMånedÅr.måned).toBe(1);
        expect(nyDagMånedÅr.dag).toBe(28);
    });
});
