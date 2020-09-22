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
    DATO = 'ddmmåå',
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

export const formaterIverksattDato = (dato: string | undefined) =>
    dato ? moment(dato).format(datoformat.DATO) : 'Ikke satt';

export const hentAlder = (dato: string): number => {
    const momentDato = moment(dato);
    return momentDato.isValid() ? moment().diff(momentDato, 'years') : 0;
};

export const hentAlderSomString = (fødselsdato: string | undefined) => {
    return fødselsdato
        ? moment().diff(moment(fødselsdato, 'YYYY-MM-DD'), 'years') + ' år'
        : 'Alder ukjent';
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

export const sisteDatoIMnd = (måned: number, år: number): Date => {
    // Måneden i Date objektet er 0-indeksert
    return new Date(år, måned + 1, 0);
};

export const formaterMånedTilString = (måned: number): string => {
    switch (måned) {
        case 1:
            return 'Januar';
        case 2:
            return 'Februar';
        case 3:
            return 'Mars';
        case 4:
            return 'April';
        case 5:
            return 'Mai';
        case 6:
            return 'Juni';
        case 7:
            return 'Juli';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'Oktober';
        case 11:
            return 'November';
        case 12:
            return 'Desember';
        default:
            return 'Ugyldig måned';
    }
};
