import { erFør, kalenderDato, erEtter } from '../';

describe('Skal teste sammenligningsfunksjonalitet', () => {
    const positivErEtter = erEtter;
    const negativErEtter = erFør;
    describe('Skal teste etter logikk', () => {
        test('Inneværende måned', () => {
            const dagMånedÅr = kalenderDato('2020-07-15');
            const dagMånedÅr2 = kalenderDato('2020-07-10');

            expect(positivErEtter(dagMånedÅr, dagMånedÅr2)).toBe(true);
            expect(negativErEtter(dagMånedÅr, dagMånedÅr2)).toBe(false);
        });

        test('Ulik måned med samme dag', () => {
            const dagMånedÅr = kalenderDato('2020-08-10');
            const dagMånedÅr2 = kalenderDato('2020-07-10');

            expect(positivErEtter(dagMånedÅr, dagMånedÅr2)).toBe(true);
            expect(negativErEtter(dagMånedÅr, dagMånedÅr2)).toBe(false);
        });

        test('Er etter i senere måned med tidligere dag', () => {
            const dagMånedÅr = kalenderDato('2020-08-15');
            const dagMånedÅr2 = kalenderDato('2020-07-10');

            expect(positivErEtter(dagMånedÅr, dagMånedÅr2)).toBe(true);
            expect(negativErEtter(dagMånedÅr, dagMånedÅr2)).toBe(false);
        });

        test('Er etter i senere måned med dag etter', () => {
            const dagMånedÅr = kalenderDato('2020-08-08');
            const dagMånedÅr2 = kalenderDato('2020-07-10');

            expect(positivErEtter(dagMånedÅr, dagMånedÅr2)).toBe(true);
            expect(negativErEtter(dagMånedÅr, dagMånedÅr2)).toBe(false);
        });

        test('Er etter i senere år', () => {
            const dagMånedÅr = kalenderDato('2022-08-08');
            const dagMånedÅr2 = kalenderDato('2020-07-10');

            expect(positivErEtter(dagMånedÅr, dagMånedÅr2)).toBe(true);
            expect(negativErEtter(dagMånedÅr, dagMånedÅr2)).toBe(false);
        });

        test('Er etter i senere år med samme dag', () => {
            const dagMånedÅr = kalenderDato('2022-07-10');
            const dagMånedÅr2 = kalenderDato('2020-07-10');

            expect(positivErEtter(dagMånedÅr, dagMånedÅr2)).toBe(true);
            expect(negativErEtter(dagMånedÅr, dagMånedÅr2)).toBe(false);
        });

        test('Er ikke etter i tidligere år med samme dag', () => {
            const dagMånedÅr = kalenderDato('2022-07-10');
            const dagMånedÅr2 = kalenderDato('2020-07-10');

            expect(positivErEtter(dagMånedÅr, dagMånedÅr2)).toBe(true);
            expect(negativErEtter(dagMånedÅr, dagMånedÅr2)).toBe(false);
        });
    });

    const positivErFør = erFør;
    const negativErFør = erEtter;
    describe('Skal teste er før logikk', () => {
        test('Er før i inneværende måned', () => {
            const dagMånedÅr = kalenderDato('2020-07-10');
            const dagMånedÅr2 = kalenderDato('2020-07-15');

            expect(positivErFør(dagMånedÅr, dagMånedÅr2)).toBe(true);
            expect(negativErFør(dagMånedÅr, dagMånedÅr2)).toBe(false);
        });

        test('Er før i tidligere måned med samme dag', () => {
            const dagMånedÅr = kalenderDato('2020-07-10');
            const dagMånedÅr2 = kalenderDato('2020-08-10');

            expect(positivErFør(dagMånedÅr, dagMånedÅr2)).toBe(true);
            expect(negativErFør(dagMånedÅr, dagMånedÅr2)).toBe(false);
        });

        test('Er før i tidligere måned med tidligere dag', () => {
            const dagMånedÅr = kalenderDato('2020-07-10');
            const dagMånedÅr2 = kalenderDato('2020-08-15');

            expect(positivErFør(dagMånedÅr, dagMånedÅr2)).toBe(true);
            expect(negativErFør(dagMånedÅr, dagMånedÅr2)).toBe(false);
        });

        test('Er før i tidligere måned med dag etter', () => {
            const dagMånedÅr = kalenderDato('2020-07-10');
            const dagMånedÅr2 = kalenderDato('2020-08-08');

            expect(positivErFør(dagMånedÅr, dagMånedÅr2)).toBe(true);
            expect(negativErFør(dagMånedÅr, dagMånedÅr2)).toBe(false);
        });

        test('Er før i tidligere år', () => {
            const dagMånedÅr = kalenderDato('2020-07-10');
            const dagMånedÅr2 = kalenderDato('2022-08-08');

            expect(positivErFør(dagMånedÅr, dagMånedÅr2)).toBe(true);
            expect(negativErFør(dagMånedÅr, dagMånedÅr2)).toBe(false);
        });

        test('Er før i tidligere år med samme dag', () => {
            const dagMånedÅr = kalenderDato('2020-07-10');
            const dagMånedÅr2 = kalenderDato('2022-07-10');

            expect(positivErFør(dagMånedÅr, dagMånedÅr2)).toBe(true);
            expect(negativErFør(dagMånedÅr, dagMånedÅr2)).toBe(false);
        });
    });
});
