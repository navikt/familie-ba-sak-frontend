import { addDays, differenceInCalendarMonths } from 'date-fns';

import type { FamilieIsoDate } from '../../../utils/kalender';
import {
    erIsoStringGyldig,
    FamilieIsoTilFørsteDagIMåneden,
    FamilieIsoTilSisteDagIMåneden,
} from '../../../utils/kalender';

const gjørOmDatoHvisGyldigInput = (
    dato: string | undefined,
    omgjøringsfunksjon: (dato: FamilieIsoDate) => FamilieIsoDate
): string => {
    if (dato === undefined) return '';
    if (erIsoStringGyldig(dato)) return omgjøringsfunksjon(dato);
    else return dato;
};

export const tilFørsteDagIMånedenHvisGyldigInput = (dato: string | undefined): string => {
    return gjørOmDatoHvisGyldigInput(dato, FamilieIsoTilFørsteDagIMåneden);
};

export const tilSisteDagIMånedenHvisGyldigInput = (dato: string | undefined): string => {
    return gjørOmDatoHvisGyldigInput(dato, FamilieIsoTilSisteDagIMåneden);
};

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
