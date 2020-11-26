import { YearMonth } from '../../typer/tid';
import {
    hentFørsteDagIYearMonth,
    hentSisteDagIYearMonth,
    periodeOverlapperMedValgtDato,
} from '../tid';

describe('utils/tid', () => {
    test('Skal hente første dag i YearMonth', () => {
        const januar2020: YearMonth = '2020-01';
        const førstDagIMåned = hentFørsteDagIYearMonth(januar2020);
        expect(førstDagIMåned.get('date')).toEqual(1);
        expect(førstDagIMåned.get('month')).toEqual(0);
        expect(førstDagIMåned.get('year')).toEqual(2020);
    });

    test('Skal hente siste dag i YearMonth', () => {
        const januar2020: YearMonth = '2020-01';
        const førstDagIMåned = hentSisteDagIYearMonth(januar2020);
        expect(førstDagIMåned.get('date')).toEqual(31);
        expect(førstDagIMåned.get('month')).toEqual(0);
        expect(førstDagIMåned.get('year')).toEqual(2020);
    });

    describe('Periode overlapper med valgt dato', () => {
        test('Returner true hvis periode overlapper med valgt dato', () => {
            expect(
                periodeOverlapperMedValgtDato('2020-08-13', '2020-10-13', new Date('2020-09-01'))
            ).toBe(true);
            expect(
                periodeOverlapperMedValgtDato('2020-08-13', '2020-10-13', new Date('2020-10-13'))
            ).toBe(true);
            expect(
                periodeOverlapperMedValgtDato('2020-08-13', '2020-10-13', new Date('2020-08-13'))
            ).toBe(true);
        });

        test('Returner false hvis periode ikke overlapper med valgt dato', () => {
            expect(
                periodeOverlapperMedValgtDato('2020-08-13', '2020-10-13', new Date('2020-08-12'))
            ).toBe(false);
            expect(
                periodeOverlapperMedValgtDato('2020-08-13', '2020-10-13', new Date('2020-10-14'))
            ).toBe(false);
        });
    });
});
