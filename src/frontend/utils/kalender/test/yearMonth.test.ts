import type { YearMonth } from '..';
import { hentFørsteDagIYearMonth, hentSisteDagIYearMonth } from '..';

describe('Year month tester', () => {
    test('Skal hente første dag i YearMonth', () => {
        const januar2020: YearMonth = '2020-01';
        const førstDagIMåned = hentFørsteDagIYearMonth(januar2020);
        expect(førstDagIMåned.dag).toEqual(1);
        expect(førstDagIMåned.måned).toEqual(0);
        expect(førstDagIMåned.år).toEqual(2020);
    });

    test('Skal hente siste dag i YearMonth', () => {
        const januar2020: YearMonth = '2020-01';
        const førstDagIMåned = hentSisteDagIYearMonth(januar2020);
        expect(førstDagIMåned.dag).toEqual(31);
        expect(førstDagIMåned.måned).toEqual(0);
        expect(førstDagIMåned.år).toEqual(2020);
    });
});
