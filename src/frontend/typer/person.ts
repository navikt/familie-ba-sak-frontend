import type { kjønnType } from '@navikt/familie-typer';

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
    erManueltLagtTilISøknad?: boolean;
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
}

/**
 * @Deprecated - Skal slettes når man går over til react-hook-form.
 * TODO : Slett denne når man går over til react-hook-form hvor denne metoden er brukt.
 */
export function erBrukerLike(bruker1: IPersonInfo, bruker2: IPersonInfo) {
    const fbr1 = bruker1.forelderBarnRelasjon.toSorted();
    const fbr2 = bruker2.forelderBarnRelasjon.toSorted();
    if (fbr1.length !== fbr2.length) {
        return false;
    }
    for (let i = 0; i < fbr1.length; i++) {
        if (fbr1[i] !== fbr2[i]) {
            return false;
        }
    }

    const fbrm1 = bruker1.forelderBarnRelasjonMaskert.toSorted();
    const fbrm2 = bruker2.forelderBarnRelasjonMaskert.toSorted();
    if (fbrm1.length !== fbrm2.length) {
        return false;
    }
    for (let i = 0; i < fbrm1.length; i++) {
        if (fbrm1[i] !== fbrm2[i]) {
            return false;
        }
    }

    return (
        bruker1.kommunenummer === bruker2.kommunenummer &&
        bruker1.adressebeskyttelseGradering === bruker2.adressebeskyttelseGradering &&
        bruker1.harTilgang === bruker2.harTilgang &&
        bruker1.fødselsdato === bruker2.fødselsdato &&
        bruker1.kjønn === bruker2.kjønn &&
        bruker1.navn === bruker2.navn &&
        bruker1.personIdent === bruker2.personIdent &&
        bruker1.type === bruker2.type &&
        bruker1.dødsfallDato === bruker2.dødsfallDato &&
        bruker1.bostedsadresse === bruker2.bostedsadresse &&
        bruker1.erEgenAnsatt === bruker2.erEgenAnsatt
    );
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
