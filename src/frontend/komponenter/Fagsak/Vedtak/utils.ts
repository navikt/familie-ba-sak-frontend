import dayjs from 'dayjs';

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
    const fomMåned = dayjs(periode.fom);
    const førsteDagMånedenEtterTomdato = dayjs(periode.tom).add(1, 'day');
    return førsteDagMånedenEtterTomdato.diff(fomMåned, 'months');
};
