import { addDays, differenceInCalendarMonths } from 'date-fns';

import type { FamilieIsoDate } from '../../../utils/kalender';

interface PeriodeMedBeløp {
    fom: FamilieIsoDate;
    tom: FamilieIsoDate;
    beløp: number;
}
export const summerBeløpForPerioder = (periodeListe: PeriodeMedBeløp[]): number => {
    return periodeListe.reduce(
        (sum, periode) => sum + periode.beløp * antallMånederIPeriode(periode),
        0
    );
};

export const antallMånederIPeriode = (periode: PeriodeMedBeløp): number => {
    const fomMåned = new Date(periode.fom);
    const førsteDagMånedenEtterTomdato = addDays(new Date(periode.tom), 1);

    return differenceInCalendarMonths(førsteDagMånedenEtterTomdato, fomMåned);
};
