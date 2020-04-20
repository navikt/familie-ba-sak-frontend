import { kjønnType } from '@navikt/familie-typer';
export declare enum AdresseType {
    BOSTEDSADRESSE = "BOSTEDSADRESSE",
    MIDLERTIDIG_POSTADRESSE_NORGE = "MIDLERTIDIG_POSTADRESSE_NORGE",
    MIDLERTIDIG_POSTADRESSE_UTLAND = "MIDLERTIDIG_POSTADRESSE_UTLAND",
    POSTADRESSE = "POSTADRESSE",
    POSTADRESSE_UTLAND = "POSTADRESSE_UTLAND",
    UKJENT_ADRESSE = "UKJENT_ADRESSE"
}
export declare enum PersonType {
    SØKER = "S\u00D8KER",
    ANNENPART = "ANNENPART",
    BARN = "BARN"
}
export declare enum FamilieRelasjonRolle {
    BARN = "BARN",
    FAR = "FAR",
    MEDMOR = "MEDMOR",
    MOR = "MOR",
    EKTE = "EKTE"
}
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
