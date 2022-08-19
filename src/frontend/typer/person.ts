import type { kjønnType } from '@navikt/familie-typer';

import type { FagsakType } from './fagsak';
import type { Målform } from './søknad';

// Enum
export enum AdresseType {
    BOSTEDSADRESSE = 'BOSTEDSADRESSE',
    MIDLERTIDIG_POSTADRESSE_NORGE = 'MIDLERTIDIG_POSTADRESSE_NORGE',
    MIDLERTIDIG_POSTADRESSE_UTLAND = 'MIDLERTIDIG_POSTADRESSE_UTLAND',
    POSTADRESSE = 'POSTADRESSE',
    POSTADRESSE_UTLAND = 'POSTADRESSE_UTLAND',
    UKJENT_ADRESSE = 'UKJENT_ADRESSE',
}

export enum PersonType {
    SØKER = 'SØKER',
    ANNENPART = 'ANNENPART',
    BARN = 'BARN',
}

export const personTypeMap: Record<PersonType, string> = {
    SØKER: 'Søker',
    ANNENPART: 'Annen part',
    BARN: 'Barn',
};

export enum ForelderBarnRelasjonRolle {
    BARN = 'BARN',
    FAR = 'FAR',
    MEDMOR = 'MEDMOR',
    MOR = 'MOR',
    EKTE = 'EKTE',
}

export enum PersonTypeVisningsRangering {
    SØKER = 1,
    ANNENPART = 2,
    BARN = 3,
}

// Interface
export interface IGrunnlagPerson {
    fødselsdato: string;
    kjønn: kjønnType;
    navn: string;
    personIdent: string;
    registerhistorikk?: IRestRegisterhistorikk;
    type: PersonType;
    målform: Målform;
    dødsfallDato?: string;
}

export interface IPersonInfo {
    kommunenummer: string;
    adressebeskyttelseGradering: Adressebeskyttelsegradering;
    harTilgang?: boolean;
    forelderBarnRelasjon: IForelderBarnRelasjon[];
    forelderBarnRelasjonMaskert: IForelderBarnRelasjonMaskert[];
    fødselsdato: string;
    kjønn: kjønnType;
    navn: string;
    personIdent: string;
    type: PersonType;
    dødsfallDato?: string;
    fagsakId?: Map<FagsakType, number>;
    bostedsadresse?: IBostedsadresse;
}

export interface IForelderBarnRelasjon {
    adressebeskyttelseGradering: Adressebeskyttelsegradering;
    fødselsdato: string;
    navn: string;
    personIdent: string;
    relasjonRolle: ForelderBarnRelasjonRolle;
}

export interface IForelderBarnRelasjonMaskert {
    adressebeskyttelseGradering: Adressebeskyttelsegradering;
    relasjonRolle: ForelderBarnRelasjonRolle;
}

export interface IBostedsadresse {
    adresse?: string;
    postnummer: string;
}

export interface IRestTilgang {
    saksbehandlerHarTilgang: boolean;
    adressebeskyttelsegradering: Adressebeskyttelsegradering;
}

export interface IRestRegisterhistorikk {
    hentetTidspunkt: string;
    sivilstand: IRestRegisteropplysning[];
    oppholdstillatelse: IRestRegisteropplysning[];
    statsborgerskap: IRestRegisteropplysning[];
    bostedsadresse: IRestRegisteropplysning[];
    dødsboadresse: IRestRegisteropplysning[];
}

export interface IRestRegisteropplysning {
    fom?: string;
    tom?: string;
    verdi: string;
}

export enum Adressebeskyttelsegradering {
    STRENGT_FORTROLIG = 'STRENGT_FORTROLIG',
    STRENGT_FORTROLIG_UTLAND = 'STRENGT_FORTROLIG_UTLAND',
    FORTROLIG = 'FORTROLIG',
    UGRADERT = 'UGRADERT',
}

export const adressebeskyttelsestyper: Record<Adressebeskyttelsegradering, string> = {
    STRENGT_FORTROLIG: 'strengt fortrolig',
    STRENGT_FORTROLIG_UTLAND: 'strengt fortrolig utland',
    FORTROLIG: 'fortrolig',
    UGRADERT: 'ugradert',
};
