import dayjs from 'dayjs';

import { YearMonth } from '../../typer/tid';
import familieDayjs from '../familieDayjs';
import { datoformat } from '../formatter';
import {
    datoDagenFør,
    erISammeMåned,
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

    describe('Tester at dayjs sin substract-funksjon med day fungerer som forventet', () => {
        test('Ukedag mandag skal gi datoen for søndag uka før.', () => {
            expect(
                datoDagenFør(familieDayjs('2021-01-18', datoformat.ISO_DAG)).format(datoformat.DATO)
            ).toEqual('17.01.2021');
        });
        test('Første dag i året skal gi siste dag i året før', () => {
            expect(
                datoDagenFør(familieDayjs('2021-01-01', datoformat.ISO_DAG)).format(datoformat.DATO)
            ).toEqual('31.12.2020');
        });
        test('Første dag i måneden skal gi siste dag i måneden før', () => {
            expect(
                datoDagenFør(familieDayjs('2021-03-01', datoformat.ISO_DAG)).format(datoformat.DATO)
            ).toEqual('28.02.2021');
        });
        test('Første dag i mars for skuddår skal gi 29. februar', () => {
            expect(
                datoDagenFør(familieDayjs('2020-03-01', datoformat.ISO_DAG)).format(datoformat.DATO)
            ).toEqual('29.02.2020');
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

    describe('År legges til dato', () => {
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

    describe('Returnerer om datoer er innenfor samme måned', () => {
        test('Datoer innenfor samme måned returnerer true', () => {
            expect(
                erISammeMåned(
                    familieDayjs('2018-10-31', datoformat.ISO_DAG),
                    familieDayjs('2018-10-01', datoformat.ISO_DAG)
                )
            ).toEqual(true);
        });
        test('Datoer i forskjellige måneder samme år returnerer false', () => {
            expect(
                erISammeMåned(
                    familieDayjs('2018-10-31', datoformat.ISO_DAG),
                    familieDayjs('2018-11-01', datoformat.ISO_DAG)
                )
            ).toEqual(false);
        });
        test('Datoer i samme måned ulike år returnerer false', () => {
            expect(
                erISammeMåned(
                    familieDayjs('2018-10-31', datoformat.ISO_DAG),
                    familieDayjs('2019-10-31', datoformat.ISO_DAG)
                )
            ).toEqual(false);
        });
    });
});
