import type { kjønnType } from '@navikt/familie-typer';
import type { Målform } from './søknad';
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
export declare const personTypeMap: Record<PersonType, string>;
export declare enum ForelderBarnRelasjonRolle {
    BARN = "BARN",
    FAR = "FAR",
    MEDMOR = "MEDMOR",
    MOR = "MOR",
    EKTE = "EKTE"
}
export declare enum PersonTypeVisningsRangering {
    SØKER = 1,
    ANNENPART = 2,
    BARN = 3
}
export interface IGrunnlagPerson {
    fødselsdato: string;
    kjønn: kjønnType;
    navn: string;
    personIdent: string;
    registerhistorikk?: IRestRegisterhistorikk;
    type: PersonType;
    målform: Målform;
    dødsfallDato?: string;
    erManueltLagtTilISøknad?: boolean;
    harFalskIdentitet: boolean;
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
    bostedsadresse?: IBostedsadresse;
    erEgenAnsatt: boolean;
    harFalskIdentitet: boolean;
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
    oppholdsadresse: IRestRegisteropplysning[];
    dødsboadresse: IRestRegisteropplysning[];
    deltBosted: IRestRegisteropplysning[];
    historiskeIdenter: IRestRegisteropplysning[];
    arbeidsforhold: IRestRegisteropplysning[];
}
export interface IRestRegisteropplysning {
    fom?: string;
    tom?: string;
    verdi: string;
}
export declare enum Adressebeskyttelsegradering {
    STRENGT_FORTROLIG = "STRENGT_FORTROLIG",
    STRENGT_FORTROLIG_UTLAND = "STRENGT_FORTROLIG_UTLAND",
    FORTROLIG = "FORTROLIG",
    UGRADERT = "UGRADERT"
}
export declare const adressebeskyttelsestyper: Record<Adressebeskyttelsegradering, string>;
