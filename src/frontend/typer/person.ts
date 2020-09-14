import { kjønnType } from '@navikt/familie-typer';

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
export interface IPerson {
    fødselsdato: string;
    kjønn: kjønnType;
    navn: string;
    personIdent: string;
    familierelasjoner: IFamilieRelasjon[];
    type: PersonType;
}

export interface IFamilieRelasjon {
    personIdent: string;
    relasjonRolle: FamilieRelasjonRolle;
    navn: string;
    fødselsdato: string;
}
