import moment from 'moment';

export enum datoformat {
    DATO = 'DD.MM.YY',
    DATO_TID = 'DD.MM.YY HH:mm',
    TID = 'HH:mm',
}

export const formaterIsoDato = (dato: string, tilFormat: datoformat) => {
    const momentDato = moment(dato);
    return momentDato.isValid() ? momentDato.format(tilFormat) : dato ? dato : '';
};
