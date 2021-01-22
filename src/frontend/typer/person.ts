import { kjønnType } from '@navikt/familie-typer';

import { Målform } from './søknad';

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

export type PersonTypeMap = {
    [key in PersonType]: string;
};

export const personTypeMap: PersonTypeMap = {
    SØKER: 'Søker',
    ANNENPART: 'Annen part',
    BARN: 'Barn',
};

export enum FamilieRelasjonRolle {
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
    type: PersonType;
    målform: Målform;
}

export interface IPersonInfo {
    adressebeskyttelseGradering: Adressebeskyttelsegradering;
    harTilgang?: boolean;
    familierelasjoner: IFamilierelasjon[];
    familierelasjonerMaskert: IFamilierelasjonMaskert[];
    fødselsdato: string;
    kjønn: kjønnType;
    navn: string;
    personIdent: string;
    type: PersonType;
}

export interface IFamilierelasjon {
    adressebeskyttelseGradering: Adressebeskyttelsegradering;
    fødselsdato: string;
    navn: string;
    personIdent: string;
    relasjonRolle: FamilieRelasjonRolle;
}

export interface IFamilierelasjonMaskert {
    adressebeskyttelseGradering: Adressebeskyttelsegradering;
    relasjonRolle: FamilieRelasjonRolle;
}

export interface IRestTilgang {
    saksbehandlerHarTilgang: boolean;
    adressebeskyttelsegradering: Adressebeskyttelsegradering;
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
