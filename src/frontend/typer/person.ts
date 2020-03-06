// Enum
export enum AdresseType {
    BOSTEDSADRESSE = 'BOSTEDSADRESSE',
    MIDLERTIDIG_POSTADRESSE_NORGE = 'MIDLERTIDIG_POSTADRESSE_NORGE',
    MIDLERTIDIG_POSTADRESSE_UTLAND = 'MIDLERTIDIG_POSTADRESSE_UTLAND',
    POSTADRESSE = 'POSTADRESSE',
    POSTADRESSE_UTLAND = 'POSTADRESSE_UTLAND',
    UKJENT_ADRESSE = 'UKJENT_ADRESSE',
}

export enum RelasjonsRolleType {
    BARN,
    EKTE,
    FARA,
    MMOR,
    MORA,
    REPA,
    SAMB,
}

export enum KjønnType {
    'KVINNE' = 'KVINNE',
    'MANN' = 'MANN',
    'UKJENT' = 'UKJENT',
}

// Interface
export interface IPerson {
    fødselsdato: string;
    kjønn: KjønnType;
    navn: string;
    personIdent: string;
    type: PersonType;
}

export enum PersonType {
    SØKER = 'SØKER',
    ANNENPART = 'ANNENPART',
    BARN = 'BARN',
}
