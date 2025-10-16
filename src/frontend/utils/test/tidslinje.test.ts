import { endOfMonth, startOfMonth } from 'date-fns';

import type { Periode } from '@navikt/familie-tidslinje';

import type { IYtelsePeriode } from '../../typer/beregning';
import { YtelseType } from '../../typer/beregning';
import { dateTilIsoDatoString, isoStringTilDate } from '../dato';
import { splittYtelseVedEndringerPåAnnenYtelse } from '../tidslinje';

describe('utils/tidslinje', () => {
    const utvidetYtelsePeriode: IYtelsePeriode = {
        beløp: 1054,
        stønadFom: '2020-01',
        stønadTom: '2020-12',
        ytelseType: YtelseType.UTVIDET_BARNETRYGD,
        skalUtbetales: true,
    };

    const småbarnstilleggPeriodeOverlapperStartenAvÅret: IYtelsePeriode = {
        beløp: 660,
        stønadFom: '2019-05',
        stønadTom: '2020-03',
        ytelseType: YtelseType.SMÅBARNSTILLEGG,
        skalUtbetales: true,
    };
    const småbarnstilleggPeriodeMidtIÅret: IYtelsePeriode = {
        beløp: 660,
        stønadFom: '2020-05',
        stønadTom: '2020-07',
        ytelseType: YtelseType.SMÅBARNSTILLEGG,
        skalUtbetales: true,
    };
    const småbarnstilleggPeriodeOverlapperSluttenAvÅret: IYtelsePeriode = {
        beløp: 660,
        stønadFom: '2020-09',
        stønadTom: '2021-05',
        ytelseType: YtelseType.SMÅBARNSTILLEGG,
        skalUtbetales: true,
    };

    const fom = startOfMonth(isoStringTilDate(utvidetYtelsePeriode.stønadFom));
    const periode: Periode = {
        fom,
        tom: endOfMonth(isoStringTilDate(utvidetYtelsePeriode.stønadTom)),
        id: 'test',
        status: 'suksess',
    };

    test('Utvidet periode blir splittet i 3 av fom og tom fra småbarnstilleggperiode', () => {
        const splittaPerioder = splittYtelseVedEndringerPåAnnenYtelse(periode, utvidetYtelsePeriode, [
            småbarnstilleggPeriodeMidtIÅret,
        ]);

        expect(splittaPerioder.length).toBe(3);
        expect(dateTilIsoDatoString(splittaPerioder[0].fom)).toBe('2020-01-01');
        expect(dateTilIsoDatoString(splittaPerioder[0].tom)).toBe('2020-04-30');

        expect(dateTilIsoDatoString(splittaPerioder[1].fom)).toBe('2020-05-01');
        expect(dateTilIsoDatoString(splittaPerioder[1].tom)).toBe('2020-07-31');

        expect(dateTilIsoDatoString(splittaPerioder[2].fom)).toBe('2020-08-01');
        expect(dateTilIsoDatoString(splittaPerioder[2].tom)).toBe('2020-12-31');
    });

    test('Utvidet periode blir splittet i 2 av fom småbarnstilleggperiode', () => {
        const splittaPerioder = splittYtelseVedEndringerPåAnnenYtelse(periode, utvidetYtelsePeriode, [
            småbarnstilleggPeriodeOverlapperStartenAvÅret,
        ]);

        expect(splittaPerioder.length).toBe(2);
        expect(dateTilIsoDatoString(splittaPerioder[0].fom)).toBe('2020-01-01');
        expect(dateTilIsoDatoString(splittaPerioder[0].tom)).toBe('2020-03-31');

        expect(dateTilIsoDatoString(splittaPerioder[1].fom)).toBe('2020-04-01');
        expect(dateTilIsoDatoString(splittaPerioder[1].tom)).toBe('2020-12-31');
    });

    test('Utvidet periode blir splittet i 2 av tom småbarnstilleggperiode', () => {
        const splittaPerioder = splittYtelseVedEndringerPåAnnenYtelse(periode, utvidetYtelsePeriode, [
            småbarnstilleggPeriodeOverlapperSluttenAvÅret,
        ]);

        expect(splittaPerioder.length).toBe(2);
        expect(dateTilIsoDatoString(splittaPerioder[0].fom)).toBe('2020-01-01');
        expect(dateTilIsoDatoString(splittaPerioder[0].tom)).toBe('2020-08-31');

        expect(dateTilIsoDatoString(splittaPerioder[1].fom)).toBe('2020-09-01');
        expect(dateTilIsoDatoString(splittaPerioder[1].tom)).toBe('2020-12-31');
    });

    test('Utvidet periode blir splittet i 5 av 3 småbarnstilleggperioder', () => {
        const splittaPerioder = splittYtelseVedEndringerPåAnnenYtelse(periode, utvidetYtelsePeriode, [
            småbarnstilleggPeriodeOverlapperStartenAvÅret,
            småbarnstilleggPeriodeMidtIÅret,
            småbarnstilleggPeriodeOverlapperSluttenAvÅret,
        ]);

        expect(splittaPerioder.length).toBe(5);
        expect(dateTilIsoDatoString(splittaPerioder[0].fom)).toBe('2020-01-01');
        expect(dateTilIsoDatoString(splittaPerioder[0].tom)).toBe('2020-03-31');

        expect(dateTilIsoDatoString(splittaPerioder[1].fom)).toBe('2020-04-01');
        expect(dateTilIsoDatoString(splittaPerioder[1].tom)).toBe('2020-04-30');

        expect(dateTilIsoDatoString(splittaPerioder[2].fom)).toBe('2020-05-01');
        expect(dateTilIsoDatoString(splittaPerioder[2].tom)).toBe('2020-07-31');

        expect(dateTilIsoDatoString(splittaPerioder[3].fom)).toBe('2020-08-01');
        expect(dateTilIsoDatoString(splittaPerioder[3].tom)).toBe('2020-08-31');

        expect(dateTilIsoDatoString(splittaPerioder[4].fom)).toBe('2020-09-01');
        expect(dateTilIsoDatoString(splittaPerioder[4].tom)).toBe('2020-12-31');
    });
});
