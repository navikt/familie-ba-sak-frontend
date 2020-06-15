import moment, { Moment } from 'moment';

export enum datoformat {
    MÅNED = 'MM.YY',
    DATO = 'DD.MM.YYYY',
    DATO_FORKORTTET = 'DD.MM.YY',
    DATO_FORLENGET = 'LL',
    DATO_FORLENGET_MED_TID = 'LLL',
    ISO_MÅNED = 'YYYY-MM',
    ISO_DAG = 'YYYY-MM-DD',
    DATO_TID = 'DD.MM.YY HH:mm',
    TID = 'HH:mm',
}

export enum datoformatNorsk {
    DATO = 'DD.MM.ÅÅÅÅ',
}

export const formaterIsoDato = (
    dato: string | undefined,
    tilFormat: datoformat,
    defaultString?: string
): string => {
    const momentDato = moment(dato);
    return momentDato.isValid() && dato
        ? momentDato.format(tilFormat)
        : dato || defaultString || '';
};

export const formaterDato = (dato: Moment, tilFormat: datoformat): string => {
    return dato.isValid() ? dato.format(tilFormat) : '';
};

export const hentAlder = (dato: string): number => {
    const momentDato = moment(dato);
    return momentDato.isValid() ? moment().diff(momentDato, 'years') : 0;
};

export const formaterBeløp = (beløp: number): string => {
    return `${beløp.toLocaleString('no-NO')} kr`;
};

export const erPersonId = (personIdent: string) => {
    const id = personIdent.split(' ').join('');
    return /^[+-]?\d+(\.\d+)?$/.test(id) && id.length === 11;
};

export const formaterPersonIdent = (personIdent: string) => {
    return erPersonId(personIdent)
        ? `${personIdent.slice(0, 6)} ${personIdent.slice(6, personIdent.length)}`
        : `${personIdent.slice(0, 3)} ${personIdent.slice(3, 6)} ${personIdent.slice(6, 9)}`;
};
