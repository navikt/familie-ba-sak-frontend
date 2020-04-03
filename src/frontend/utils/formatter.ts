import moment, { Moment } from 'moment';
import { TIDENES_MORGEN_MOMENT, TIDENES_ENDE_MOMENT } from '../typer/periode';

export enum datoformat {
    MÅNED = 'MM.YY',
    DATO = 'DD.MM.YYYY',
    ISO_MÅNED = 'YYYY-MM',
    ISO_DAG = 'YYYY-MM-DD',
    DATO_TID = 'DD.MM.YY HH:mm',
    TID = 'HH:mm',
}

export const formaterIsoDato = (dato: string, tilFormat: datoformat) => {
    const momentDato = moment(dato);
    return momentDato.isValid() ? momentDato.format(tilFormat) : dato ? dato : '';
};

export const formaterDato = (dato: Moment, tilFormat: datoformat) => {
    if (dato === TIDENES_MORGEN_MOMENT || dato === TIDENES_ENDE_MOMENT) {
        return '';
    }

    return dato.isValid() ? dato.format(tilFormat) : '';
};

export const hentAlder = (dato: string): number => {
    const momentDato = moment(dato);
    return momentDato.isValid() ? momentDato.diff(moment(), 'years') : 0;
};
