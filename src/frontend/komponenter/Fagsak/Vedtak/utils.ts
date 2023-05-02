import dayjs from 'dayjs';

import type { IRestRefusjonEøs } from '../../../typer/refusjon-eøs';
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

export const summerRefusjonsbeløpForPerioder = (periodeListe: IRestRefusjonEøs[]): number => {
    return periodeListe.reduce(
        (sum, periode) => sum + periode.refusjonsbeløp * antallMånederIPeriode(periode),
        0
    );
};

export const antallMånederIPeriode = (periode: IRestRefusjonEøs): number => {
    const fomMåned = dayjs(periode.fom);
    const førsteDagMånedenEtterTomdato = dayjs(periode.tom).add(1, 'day');
    return førsteDagMånedenEtterTomdato.diff(fomMåned, 'months');
};
