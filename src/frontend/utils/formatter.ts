import moment from 'moment';

export enum datoformat {
    MÅNED = 'MM.YY',
    DATO = 'DD.MM.YY',
    ISO_MÅNED = 'YYYY-MM',
    DATO_TID = 'DD.MM.YY HH:mm',
    TID = 'HH:mm',
}

export const formaterIsoDato = (dato: string, tilFormat: datoformat) => {
    const momentDato = moment(dato);
    return momentDato.isValid() ? momentDato.format(tilFormat) : dato ? dato : '';
};

export const hentAlder = (dato: string): number => {
    const momentDato = moment(dato);
    return momentDato.isValid() ? momentDato.diff(moment(), 'years') : 0;
};
