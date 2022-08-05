import type { FeltState } from '@navikt/familie-skjema';
import { Valideringsstatus } from '@navikt/familie-skjema';

import { erEøsPeriodeGyldig, isEmpty, isNumeric, tellAntallDesimaler } from '../eøsValidators';
import type { IYearMonthPeriode } from '../kalender';
import { nyYearMonthPeriode } from '../kalender';

describe('utils/eøsValidators', () => {
    const nyFeltState = <T>(verdi: T): FeltState<T> => ({
        feilmelding: '',
        valider: (feltState, _) => feltState,
        valideringsstatus: Valideringsstatus.IKKE_VALIDERT,
        verdi,
    });

    test('erEøsPeriodeGyldig skal kaste feilmelding hvis fom dato ikke er utfylt', () => {
        const eøsPeriode: FeltState<IYearMonthPeriode> = nyFeltState(
            nyYearMonthPeriode(undefined, '2010-05')
        );

        const valideringsresultat = erEøsPeriodeGyldig(eøsPeriode);

        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual('Fra og med måned må være utfylt');
    });

    test('erEøsPeriodeGyldig skal kaste feilmelding hvis fom dato er mer enn 1mnd senere enn dagens dato', () => {
        const eøsPeriode: FeltState<IYearMonthPeriode> = nyFeltState(
            nyYearMonthPeriode('2099-12', '2100-05')
        );

        const valideringsresultat = erEøsPeriodeGyldig(eøsPeriode);

        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual(
            'Du kan ikke sette fra og med (f.o.m.) til måneden etter neste måned eller senere'
        );
    });

    test('erEøsPeriodeGyldig skal kaste feilmelding hvis tom dato er mer enn 1mnd senere enn dagens dato', () => {
        const eøsPeriode: FeltState<IYearMonthPeriode> = nyFeltState(
            nyYearMonthPeriode('2010-12', '2100-05')
        );

        const valideringsresultat = erEøsPeriodeGyldig(eøsPeriode);

        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual(
            'Du kan ikke sette til og med (t.o.m.) til neste måned eller senere'
        );
    });

    test('erEøsPeriodeGyldig skal kaste feilmelding hvis fom dato er satt før initielFom dato', () => {
        const eøsPeriode: FeltState<IYearMonthPeriode> = nyFeltState(
            nyYearMonthPeriode('2010-12', '2009-05')
        );

        const valideringsresultat = erEøsPeriodeGyldig(eøsPeriode, { initielFom: '2011-10' });

        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.FEIL);
        expect(valideringsresultat.feilmelding).toEqual(
            'Du kan ikke legge inn fra og med måned som er før: 2011-10'
        );
    });

    test('erEøsPeriodeGyldig skal returnere OK dersom alle felter er fylt inn korrekt', () => {
        const eøsPeriode: FeltState<IYearMonthPeriode> = nyFeltState(
            nyYearMonthPeriode('2010-12', '2012-05')
        );

        const valideringsresultat = erEøsPeriodeGyldig(eøsPeriode, { initielFom: '2009-10' });

        expect(valideringsresultat.valideringsstatus).toEqual(Valideringsstatus.OK);
    });

    test('isNumeric skal sjekke at string er numerisk', () => {
        expect(isNumeric('1.42')).toEqual(true);
        expect(isNumeric('1.24')).toEqual(true);
        expect(isNumeric('1b4')).toEqual(false);
    });

    test('isEmpty skal sjekke at text er tom', () => {
        expect(isEmpty('')).toEqual(true);
        expect(isEmpty(undefined)).toEqual(true);
        expect(isEmpty(null)).toEqual(true);
        expect(isEmpty(Date())).toEqual(false);
        expect(isEmpty('text')).toEqual(false);
    });

    test('tellAntallDesimaler skal returnere antall desimaler i string', () => {
        expect(tellAntallDesimaler('1')).toEqual(0);
        expect(tellAntallDesimaler('1.2')).toEqual(1);
        expect(tellAntallDesimaler('1.2345')).toEqual(4);
        expect(tellAntallDesimaler('1,2345')).toEqual(4);
    });
});
