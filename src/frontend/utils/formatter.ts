import { format, isBefore, isValid } from 'date-fns';

import { iDag, kalenderDato, kalenderDatoTilDate, kalenderDiff } from './kalender';
import { YtelseType } from '../typer/beregning';
import type { IGrunnlagPerson } from '../typer/person';
import { PersonType } from '../typer/person';
import type { IBarnMedOpplysninger } from '../typer/søknad';
import type { IUtbetalingsperiodeDetalj } from '../typer/vedtaksperiode';

export enum datoformat {
    DATO = 'dd.MM.yyyy',
    DATO_FORKORTTET = 'dd.MM.yy',
    DATO_FORLENGET = 'PPP',
    DATO_FORLENGET_MED_TID = 'PPPp',
    ISO_MÅNED = 'yyyy-MM',
    DATO_TID = 'dd.MM.yy HH:mm',
    DATO_TID_SEKUNDER = 'dd.MM.yy HH:mm:ss',
    MÅNED_ÅR_NAVN = 'MMMM yyyy',
    MÅNED_ÅR_KORTNAVN = 'MMM yyyy',
    MÅNED_NAVN = 'MMM',
}

export enum datoformatNorsk {
    DATO = 'ddmmåå',
}

export const millisekunderIEttÅr = 3.15576e10;

export const formaterIsoDato = (
    datoString: string | undefined,
    tilFormat: datoformat,
    defaultString?: string
): string => {
    if (!datoString) {
        return defaultString ?? '';
    }
    const dato = new Date(datoString);
    return isValid(dato) ? format(dato, tilFormat) : datoString;
};

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

export const summer = (beløp: number[]): number => beløp.reduce((acc, b) => acc + b, 0);

export const kunSiffer = (value: string) => /^\d+$/.test(value);

const erPersonId = (personIdent: string) => {
    const id = personIdent.split(' ').join('');
    return /^[+-]?\d+(\.\d+)?$/.test(id) && id.length === 11;
};

export const erOrgNr = (orgNr: string) => {
    // Sjekker kun etter ni siffer, validerer ikke kontrollsifferet (det 9. sifferet)
    return kunSiffer(orgNr) && orgNr.length === 9;
};

export const formaterIdent = (personIdent: string, ukjentTekst = 'Ukjent id') => {
    if (personIdent === '') {
        return ukjentTekst;
    }

    return erPersonId(personIdent)
        ? `${personIdent.slice(0, 6)} ${personIdent.slice(6, personIdent.length)}`
        : erOrgNr(personIdent)
        ? `${personIdent.slice(0, 3)} ${personIdent.slice(3, 6)} ${personIdent.slice(6, 9)}`
        : ukjentTekst;
};

export const formaterNavnAlderOgIdent = (person: {
    personIdent: string;
    navn: string;
    fødselsdato: string;
}): string => {
    return `${person.navn} (${hentAlder(person.fødselsdato)} år) ${formaterIdent(
        person.personIdent
    )}`;
};

export const lagPersonLabel = (ident: string, personer: IGrunnlagPerson[]): string => {
    const person = personer.find(person => person.personIdent === ident);
    if (person) {
        return formaterNavnAlderOgIdent({ ...person });
    } else {
        return ident;
    }
};

export const lagBarnLabel = (barn: IBarnMedOpplysninger): string => {
    return `${barn.navn ?? 'Navn ukjent'} (${hentAlderSomString(
        barn.fødselsdato
    )}) | ${formaterIdent(barn.ident)}`;
};

export const sorterFødselsdato = (fødselsDatoA: string, fødselsDatoB: string) => {
    const datoA = new Date(fødselsDatoA);
    const datoB = new Date(fødselsDatoB);

    return isBefore(datoA, datoB) ? 1 : -1;
};

export const sorterPersonTypeOgFødselsdato = (
    personA: IGrunnlagPerson,
    personB: IGrunnlagPerson
) => {
    if (personA.type === PersonType.SØKER) return -1;
    else if (personB.type === PersonType.SØKER) return 1;
    else return sorterFødselsdato(personA.fødselsdato, personB.fødselsdato);
};

export const sorterUtbetaling = (
    utbetalingsperiodeDetaljA: IUtbetalingsperiodeDetalj,
    utbetalingsperiodeDetaljB: IUtbetalingsperiodeDetalj
) => {
    if (utbetalingsperiodeDetaljA.ytelseType === YtelseType.UTVIDET_BARNETRYGD) return -1;
    else if (utbetalingsperiodeDetaljB.ytelseType === YtelseType.UTVIDET_BARNETRYGD) return 1;
    else if (utbetalingsperiodeDetaljA.ytelseType === YtelseType.SMÅBARNSTILLEGG) return -1;
    else if (utbetalingsperiodeDetaljB.ytelseType === YtelseType.SMÅBARNSTILLEGG) return 1;
    else
        return sorterFødselsdato(
            utbetalingsperiodeDetaljA.person.fødselsdato,
            utbetalingsperiodeDetaljB.person.fødselsdato
        );
};

export const slåSammenListeTilStreng = (liste: string[]) => {
    return liste.join(', ').replace(new RegExp('(.*),'), '$1 og');
};

export const formaterTekstStorForbokstav = (tekst: string) => {
    return tekst
        .split(' ')
        .map(it => it.toLowerCase().replace(/[a-zæøå]/, match => match.toUpperCase()))
        .join(' ');
};
