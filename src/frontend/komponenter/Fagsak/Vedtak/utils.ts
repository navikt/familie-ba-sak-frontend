import {
    type FamilieIsoDate,
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
