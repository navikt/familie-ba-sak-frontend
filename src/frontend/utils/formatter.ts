import familieDayjs from './familieDayjs';
import { iDag, kalenderDato, kalenderDatoTilDate, kalenderDiff } from './kalender';

export enum datoformat {
    MÅNED = 'MM.YY',
    DATO = 'DD.MM.YYYY',
    DATO_FORKORTTET = 'DD.MM.YY',
    DATO_FORLENGET = 'LL',
    DATO_FORLENGET_MED_TID = 'LLL',
    ISO_MÅNED = 'YYYY-MM',
    ISO_DAG = 'YYYY-MM-DD',
    DATO_TID = 'DD.MM.YY HH:mm',
    DATO_TID_SEKUNDER = 'DD.MM.YY HH:mm:ss',
    TID = 'HH:mm',
    MÅNED_ÅR_NAVN = 'MMMM YYYY',
    MÅNED_NAVN = 'MMM',
}

export enum datoformatNorsk {
    DATO = 'ddmmåå',
}

export const millisekunderIEttÅr = 3.15576e10;

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

export const formaterIverksattDato = (dato: string | undefined) =>
    dato ? familieDayjs(dato).format(datoformat.DATO) : 'Ikke satt';

export const hentAlder = (fødselsdato: string): number => {
    return fødselsdato !== ''
        ? Math.floor(
              kalenderDiff(
                  kalenderDatoTilDate(iDag()),
                  kalenderDatoTilDate(kalenderDato(fødselsdato))
              ) / millisekunderIEttÅr
          )
        : 0;
};

export const hentAlderSomString = (fødselsdato: string | undefined) => {
    return fødselsdato ? hentAlder(fødselsdato) + ' år' : 'Alder ukjent';
};

export const formaterBeløp = (beløp: number): string => {
    return `${beløp.toLocaleString('no-NO')} kr`;
};

const erNumerisk = (value: string) => /^-?\d+$/.test(value);

const erPersonId = (personIdent: string) => {
    const id = personIdent.split(' ').join('');
    return /^[+-]?\d+(\.\d+)?$/.test(id) && id.length === 11;
};

const erOrgNr = (orgNr: string) => {
    return erNumerisk(orgNr) && orgNr.length === 9;
};

export const formaterPersonIdent = (personIdent: string) => {
    if (personIdent === '') return 'Ukjent id';

    return erPersonId(personIdent)
        ? `${personIdent.slice(0, 6)} ${personIdent.slice(6, personIdent.length)}`
        : erOrgNr(personIdent)
        ? `${personIdent.slice(0, 3)} ${personIdent.slice(3, 6)} ${personIdent.slice(6, 9)}`
        : 'Ukjent id';
};

export const sorterFødselsdato = (fødselsDatoA: string, fødselsDatoB: string) =>
    familieDayjs(fødselsDatoA).isBefore(fødselsDatoB) ? 1 : -1;
