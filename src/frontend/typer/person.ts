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

export enum kjønnType {
    'K' = 'K',
    'M' = 'M',
}

// Interface
export interface IPerson {
    fødselsdato: string;
    kjønn?: kjønnType;
    navn?: string;
    personIdent: string;
    type: PersonType;
}

export enum PersonType {
    SØKER = 'SØKER',
    ANNENPART = 'ANNENPART',
    BARN = 'BARN',
}

export interface IPersonhistorikk {
    adresser: IPersonAdresse[];
    statsborgerskap: IPersonStatsborgerskap[];
}

export interface IPersonAdresse {
    adresseType: AdresseType;
    adresselinje1?: string;
    adresselinje2?: string;
    adresselinje3?: string;
    adresselinje4?: string;
    land: string;
    periode: IPeriode;
    postnummer?: string;
    poststed?: string;
}

export interface IPersonStatsborgerskap {
    periode: IPeriode;
    statsborgerskap: string;
}

export interface IPersonRelasjon {
    fraPersonIdent: string;
    harSammeBosted: boolean;
    relasjonsrolle: RelasjonsRolleType;
    tilPersonIdent: string;
}

export interface IPeriode {
    fomDato: string;
    tomDato: string;
}
