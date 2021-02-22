import dayjs from 'dayjs';

import { YearMonth } from '../../typer/tid';
import {
    hentFørsteDagIYearMonth,
    hentSisteDagIYearMonth,
    leggTilÅr,
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

    describe('År legges til uten av dag i måneden endres for datoen', () => {
        test('Legger til 18 år', () => {
            expect(leggTilÅr('2018-06-12', 18)).toStrictEqual(dayjs(new Date('2036-06-12')));
        });
        test('Legger til 1 år på dato 29. februar i et skuddår', () => {
            expect(leggTilÅr('2020-02-29', 1)).toStrictEqual(dayjs(new Date('2021-02-28')));
        });
        test('Legger til 4 år på dato 29. februar i et skuddår', () => {
            expect(leggTilÅr('2020-02-29', 4)).toStrictEqual(dayjs(new Date('2024-02-29')));
        });
    });
});
