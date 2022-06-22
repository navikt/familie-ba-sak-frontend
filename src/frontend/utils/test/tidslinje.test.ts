import type { Periode } from '@navikt/familie-tidslinje';

import type { IYtelsePeriode } from '../../typer/beregning';
import { YtelseType } from '../../typer/beregning';
import {
    hentFørsteDagIYearMonth,
    hentSisteDagIYearMonth,
    kalenderDato,
    kalenderDatoFraDate,
    kalenderDatoTilDate,
    serializeIso8601String,
} from '../kalender';
import { splittUtvidetVedEndringerPåSmåbarnstillegg } from '../tidslinje';

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

    const fom = kalenderDatoTilDate(hentFørsteDagIYearMonth(utvidetYtelsePeriode.stønadFom));
    const periode: Periode = {
        fom,
        tom: kalenderDatoTilDate(hentSisteDagIYearMonth(utvidetYtelsePeriode.stønadTom)),
        id: 'test',
        status: 'suksess',
    };

    test('Utvidet periode blir splittet i 3 av fom og tom fra småbarnstilleggperiode', () => {
        const splittaPerioder = splittUtvidetVedEndringerPåSmåbarnstillegg(
            periode,
            utvidetYtelsePeriode,
            [småbarnstilleggPeriodeMidtIÅret]
        );

        expect(splittaPerioder.length).toBe(3);
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[0].fom))).toBe(
            serializeIso8601String(kalenderDato('2020-01-01'))
        );
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[0].tom))).toBe(
            serializeIso8601String(kalenderDato('2020-04-30'))
        );

        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[1].fom))).toBe(
            serializeIso8601String(kalenderDato('2020-05-01'))
        );
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[1].tom))).toBe(
            serializeIso8601String(kalenderDato('2020-07-31'))
        );

        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[2].fom))).toBe(
            serializeIso8601String(kalenderDato('2020-08-01'))
        );
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[2].tom))).toBe(
            serializeIso8601String(kalenderDato('2020-12-31'))
        );
    });

    test('Utvidet periode blir splittet i 2 av fom småbarnstilleggperiode', () => {
        const splittaPerioder = splittUtvidetVedEndringerPåSmåbarnstillegg(
            periode,
            utvidetYtelsePeriode,
            [småbarnstilleggPeriodeOverlapperStartenAvÅret]
        );

        expect(splittaPerioder.length).toBe(2);
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[0].fom))).toBe(
            serializeIso8601String(kalenderDato('2020-01-01'))
        );
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[0].tom))).toBe(
            serializeIso8601String(kalenderDato('2020-03-31'))
        );

        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[1].fom))).toBe(
            serializeIso8601String(kalenderDato('2020-04-01'))
        );
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[1].tom))).toBe(
            serializeIso8601String(kalenderDato('2020-12-31'))
        );
    });

    test('Utvidet periode blir splittet i 2 av tom småbarnstilleggperiode', () => {
        const splittaPerioder = splittUtvidetVedEndringerPåSmåbarnstillegg(
            periode,
            utvidetYtelsePeriode,
            [småbarnstilleggPeriodeOverlapperSluttenAvÅret]
        );

        expect(splittaPerioder.length).toBe(2);
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[0].fom))).toBe(
            serializeIso8601String(kalenderDato('2020-01-01'))
        );
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[0].tom))).toBe(
            serializeIso8601String(kalenderDato('2020-08-31'))
        );

        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[1].fom))).toBe(
            serializeIso8601String(kalenderDato('2020-09-01'))
        );
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[1].tom))).toBe(
            serializeIso8601String(kalenderDato('2020-12-31'))
        );
    });

    test('Utvidet periode blir splittet i 5 av 3 småbarnstilleggperioder', () => {
        const splittaPerioder = splittUtvidetVedEndringerPåSmåbarnstillegg(
            periode,
            utvidetYtelsePeriode,
            [
                småbarnstilleggPeriodeOverlapperStartenAvÅret,
                småbarnstilleggPeriodeMidtIÅret,
                småbarnstilleggPeriodeOverlapperSluttenAvÅret,
            ]
        );

        expect(splittaPerioder.length).toBe(5);
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[0].fom))).toBe(
            serializeIso8601String(kalenderDato('2020-01-01'))
        );
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[0].tom))).toBe(
            serializeIso8601String(kalenderDato('2020-03-31'))
        );

        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[1].fom))).toBe(
            serializeIso8601String(kalenderDato('2020-04-01'))
        );
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[1].tom))).toBe(
            serializeIso8601String(kalenderDato('2020-04-30'))
        );

        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[2].fom))).toBe(
            serializeIso8601String(kalenderDato('2020-05-01'))
        );
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[2].tom))).toBe(
            serializeIso8601String(kalenderDato('2020-07-31'))
        );

        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[3].fom))).toBe(
            serializeIso8601String(kalenderDato('2020-08-01'))
        );
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[3].tom))).toBe(
            serializeIso8601String(kalenderDato('2020-08-31'))
        );

        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[4].fom))).toBe(
            serializeIso8601String(kalenderDato('2020-09-01'))
        );
        expect(serializeIso8601String(kalenderDatoFraDate(splittaPerioder[4].tom))).toBe(
            serializeIso8601String(kalenderDato('2020-12-31'))
        );
    });
});
