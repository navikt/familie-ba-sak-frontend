import { type Avhengigheter, feil, type FeltState, ok } from '@navikt/familie-skjema';

import {
    type IYearMonthPeriode,
    type MånedÅr,
    type YearMonth,
    yearMonthTilKalenderMåned,
    iDag,
} from './kalender';

const isEmpty = (text?: string | number | boolean | Date | null) =>
    text === null || text === undefined || text.toString().trim().length === 0;

const erFør = (dato1: MånedÅr, dato2: MånedÅr) => {
    if (dato1.måned <= dato2.måned && dato1.år <= dato2.år) {
        return true;
    }

    return dato1.år < dato2.år;
};
const erEtter = (dato1: YearMonth, dato2: YearMonth) =>
    erFør(yearMonthTilKalenderMåned(dato2), yearMonthTilKalenderMåned(dato1));
const valgtÅrMånedErNesteMånedEllerSenere = (valgtDato: MånedÅr, today: MånedÅr) =>
    valgtDato.år > today.år || (valgtDato.år === today.år && valgtDato.måned > today.måned);
const valgtTomErNesteMånedEllerSenere = (valgtDato: YearMonth) =>
    valgtÅrMånedErNesteMånedEllerSenere(yearMonthTilKalenderMåned(valgtDato), iDag());

const erEøsPeriodeGyldig = (
    felt: FeltState<IYearMonthPeriode>,
    avhengigheter?: Avhengigheter
): FeltState<IYearMonthPeriode> => {
    const fom = felt.verdi.fom;
    const tom = felt.verdi.tom;

    const initielFom = avhengigheter?.initielFom?.verdi || avhengigheter?.initielFom;

    if (!fom || isEmpty(fom)) {
        return feil(felt, 'Fra og med måned må være utfylt');
    }
    if (initielFom && !erEtter(fom, initielFom)) {
        return feil(
            felt,
            `Du kan ikke legge inn fra og med måned som er før: ${avhengigheter?.initielFom}`
        );
    }
    if (tom && valgtTomErNesteMånedEllerSenere(tom)) {
        return feil(
            felt,
            'Du kan ikke legge inn til og med måned som er i neste måned eller senere'
        );
    }

    return ok(felt);
};

export { isEmpty, erEøsPeriodeGyldig };
