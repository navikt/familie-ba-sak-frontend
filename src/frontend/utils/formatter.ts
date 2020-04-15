import moment, { Moment } from 'moment';

export enum datoformat {
    MÅNED = 'MM.YY',
    DATO = 'DD.MM.YYYY',
    DATO_FORKORTTET = 'DD.MM.YY',
    ISO_MÅNED = 'YYYY-MM',
    ISO_DAG = 'YYYY-MM-DD',
    DATO_TID = 'DD.MM.YY HH:mm',
    TID = 'HH:mm',
}

export enum datoformatNorsk {
    DATO = 'DD.MM.ÅÅÅÅ',
}

export const formaterIsoDato = (dato: string | undefined, tilFormat: datoformat) => {
    const momentDato = moment(dato);
    return momentDato.isValid() ? momentDato.format(tilFormat) : dato ? dato : '';
};

export const formaterDato = (dato: Moment, tilFormat: datoformat) => {
    return dato.isValid() ? dato.format(tilFormat) : '';
};

export const hentAlder = (dato: string): number => {
    const momentDato = moment(dato);
    return momentDato.isValid() ? momentDato.diff(moment(), 'years') : 0;
};

export const formaterBeløp = (beløp: number): string => {
    return `${beløp.toLocaleString('no-NO')} kr`;
};
