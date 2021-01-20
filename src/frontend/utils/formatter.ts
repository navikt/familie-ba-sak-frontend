import familieDayjs, { Dayjs, familieDayjsDiff } from './familieDayjs';

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

export const isoStringToDayjs = (dato: string | undefined, defaultValue: Dayjs): Dayjs => {
    return dato && dato !== '' ? familieDayjs(dato, datoformat.ISO_DAG) : defaultValue;
};

export const formaterIsoDato = (
    dato: string | undefined,
    tilFormat: datoformat,
    defaultString?: string
): string => {
    if (!dato) {
        return defaultString ?? '';
    }
    const dayjsDato = familieDayjs(dato);
    return dayjsDato.isValid() ? dayjsDato.format(tilFormat) : dato;
};

export const formaterDato = (dato: Dayjs, tilFormat: datoformat): string => {
    return dato.isValid() ? dato.format(tilFormat) : '';
};

export const formaterIverksattDato = (dato: string | undefined) =>
    dato ? familieDayjs(dato).format(datoformat.DATO) : 'Ikke satt';

export const hentAlder = (dato: string): number => {
    const dayjsDato = familieDayjs(dato);
    return dayjsDato.isValid() ? familieDayjsDiff(familieDayjs(), dayjsDato, 'year') : 0;
};

export const hentAlderSomString = (fødselsdato: string | undefined) => {
    return fødselsdato
        ? familieDayjsDiff(familieDayjs(), familieDayjs(fødselsdato, 'YYYY-MM-DD'), 'year') + ' år'
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
    familieDayjs(fødselsDatoA).isBefore(fødselsDatoB) ? 1 : -1;

export const formaterTilKunFørstBokstavStor = (navn: string | undefined): string | undefined => {
    if (!navn) {
        return navn;
    }

    let skalVæreStor = true;
    let formatert = '';
    for (let i = 0; i < navn.length; i++) {
        formatert += skalVæreStor ? navn.charAt(i).toUpperCase() : navn.charAt(i).toLowerCase();
        skalVæreStor = navn.charAt(i) === ' ';
    }
    return formatert;
};
