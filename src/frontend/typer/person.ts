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

export enum FamilieRelasjonRolle {
    BARN,
    FAR,
    MEDMOR,
    MOR,
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
    relasjonsrolle: FamilieRelasjonRolle;
}
