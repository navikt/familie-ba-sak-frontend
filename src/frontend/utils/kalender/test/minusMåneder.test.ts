import { kalenderDato, minusMåneder } from '../kalender';

describe('Skal teste minus måneder logikk', () => {
    test('Minus måneder innenfor et år', () => {
        const dagMånedÅr = kalenderDato('2020-07-10');

        const nyDagMånedÅr = minusMåneder(dagMånedÅr, 3);
        expect(nyDagMånedÅr.år).toBe(2020);
        expect(nyDagMånedÅr.måned).toBe(3);
    });

    test('Minus måneder forbi et år', () => {
        const dagMånedÅr = kalenderDato('2020-07-10');

        const nyDagMånedÅr = minusMåneder(dagMånedÅr, 9);
        expect(nyDagMånedÅr.år).toBe(2019);
        expect(nyDagMånedÅr.måned).toBe(9);
    });

    test('Minus måneder forbi flere år', () => {
        const dagMånedÅr = kalenderDato('2020-10-10');

        const nyDagMånedÅr = minusMåneder(dagMånedÅr, 24);
        expect(nyDagMånedÅr.år).toBe(2018);
        expect(nyDagMånedÅr.måned).toBe(9);
    });

    test('Minus måneder forbi flere år', () => {
        const dagMånedÅr = kalenderDato('2020-10-10');

        const nyDagMånedÅr = minusMåneder(dagMånedÅr, 24);
        expect(nyDagMånedÅr.år).toBe(2018);
        expect(nyDagMånedÅr.måned).toBe(9);
    });

    test('Minus måneder 12 måneder ved skuddår', () => {
        const dagMånedÅr = kalenderDato('2020-02-29');

        const nyDagMånedÅr = minusMåneder(dagMånedÅr, 12);
        expect(nyDagMånedÅr.år).toBe(2019);
        expect(nyDagMånedÅr.måned).toBe(1);
        expect(nyDagMånedÅr.dag).toBe(28);
    });
});
