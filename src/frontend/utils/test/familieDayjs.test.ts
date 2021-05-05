import familieDayjs, {
    familieDayjsDiff,
    hentFørsteDagIYearMonth,
    hentSisteDagIYearMonth,
    periodeOverlapperMedValgtDato,
} from '../familieDayjs';
import { datoformat } from '../formatter';
import { YearMonth } from '../kalender';

describe('utils/familieDayjs', () => {
    test('familieDayjs initialiserer YYYY-MM-DD når format ikke er spesifisert', () => {
        const dato = familieDayjs('1990-02-28');
        expect(dato.get('date')).toEqual(28);
        expect(dato.get('month')).toEqual(1);
        expect(dato.get('year')).toEqual(1990);
    });

    test('familieDayjs initialiserer på format spesifisert', () => {
        const dato = familieDayjs('02.90', datoformat.MÅNED);
        expect(dato.get('date')).toEqual(1);
        expect(dato.get('month')).toEqual(1);
        expect(dato.get('year')).toEqual(1990);
    });

    test('familieDayjsDiff returnerer korrekt differanse', () => {
        const dato = familieDayjs('2001-02-28');
        const differanseDato = familieDayjs('2000-02-28');

        expect(familieDayjsDiff(dato, differanseDato, 'year')).toEqual(1);
        expect(familieDayjsDiff(dato, differanseDato, 'month')).toEqual(12);
        expect(familieDayjsDiff(dato, differanseDato, 'day')).toEqual(366);
    });

    test('familieDayjsDiff returnerer 0 måneders differanse hvis 30 dager eller mindre diff, tross ulike måneder', () => {
        const dato = familieDayjs('2018-06-29');
        const differanseDato = familieDayjs('2018-05-31');

        expect(familieDayjsDiff(dato, differanseDato, 'year')).toEqual(0);
    });

    test('familieDayjsDiff returnerer 0 års differanse hvis 365 dager eller mindre diff, tross ulike årstall', () => {
        const dato = familieDayjs('2019-06-30');
        const differanseDato = familieDayjs('2020-05-17');

        expect(familieDayjsDiff(dato, differanseDato, 'year')).toEqual(0);
    });

    describe('Year month tester', () => {
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
