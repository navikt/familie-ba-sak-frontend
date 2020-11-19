import dayjs from 'dayjs';

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
    MÅNED_NAVN = 'MMMM YYYY',
}

export enum datoformatNorsk {
    DATO = 'ddmmåå',
}

export const formaterIsoDato = (
    dato: string | undefined,
    tilFormat: datoformat,
    defaultString?: string
): string => {
    const dayjsDato = dayjs(dato);
    return dayjsDato.isValid() && dato ? dayjsDato.format(tilFormat) : dato || defaultString || '';
};

export const formaterDato = (dato: dayjs.Dayjs, tilFormat: datoformat): string => {
    return dato.isValid() ? dato.format(tilFormat) : '';
};

export const formaterIverksattDato = (dato: string | undefined) =>
    dato ? dayjs(dato).format(datoformat.DATO) : 'Ikke satt';

export const hentAlder = (dato: string): number => {
    const dayjsDato = dayjs(dato);
    return dayjsDato.isValid() ? dayjs().diff(dayjsDato, 'year') : 0;
};

export const hentAlderSomString = (fødselsdato: string | undefined) => {
    return fødselsdato
        ? dayjs().diff(dayjs(fødselsdato, 'YYYY-MM-DD'), 'year') + ' år'
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

export const sorterFødselsdato = (fødselsDatoA: string, fødselsDatoB: string) =>
    dayjs(fødselsDatoA).isBefore(fødselsDatoB) ? 1 : -1;
