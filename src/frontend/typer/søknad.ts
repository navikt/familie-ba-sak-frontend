import type { BehandlingUnderkategori } from './behandlingstema';
import { type IsoDatoString, isoStringTilDate } from '../utils/dato';

export interface IRestRegistrerSøknad {
    søknad: ISøknadDTO;
    bekreftEndringerViaFrontend: boolean;
}

export interface ISøknadDTO {
    underkategori: BehandlingUnderkategori;
    søkerMedOpplysninger: ISøkerMedOpplysninger;
    barnaMedOpplysninger: IBarnMedOpplysningerBackend[];
    endringAvOpplysningerBegrunnelse: string;
    erAutomatiskRegistrert?: boolean;
}

export interface ISøkerMedOpplysninger {
    ident: string;
    målform: Målform | undefined;
}

export interface IBarnMedOpplysningerBackend {
    fødselsdato?: IsoDatoString;
    ident: string;
    inkludertISøknaden: boolean;
    manueltRegistrert: boolean;
    navn?: string;
    erFolkeregistrert: boolean;
}

export function sorterBarnMedOpplysninger(b1: IBarnMedOpplysningerBackend, b2: IBarnMedOpplysningerBackend) {
    const fødselsdato1 = b1.fødselsdato ? isoStringTilDate(b1.fødselsdato) : new Date();
    const fødselsdato2 = b2.fødselsdato ? isoStringTilDate(b2.fødselsdato) : new Date();
    return fødselsdato2.getTime() - fødselsdato1.getTime();
}

export interface IBarnMedOpplysninger {
    fødselsdato?: IsoDatoString;
    ident: string;
    merket: boolean;
    manueltRegistrert: boolean;
    navn?: string;
    erFolkeregistrert: boolean;
}

export enum Målform {
    NB = 'NB',
    NN = 'NN',
}

export const målform: Record<Målform, string> = {
    NB: 'Bokmål',
    NN: 'Nynorsk',
};
