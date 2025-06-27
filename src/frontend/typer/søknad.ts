import type { BehandlingUnderkategori } from './behandlingstema';
import type { IsoDatoString } from '../utils/dato';

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
