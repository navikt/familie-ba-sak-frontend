import { BehandlingUnderkategori } from './behandling';
import { INøkkelPar } from './common';

export interface IRestRegistrerSøknad {
    søknad: ISøknadDTO;
    bekreftEndringerViaFrontend: boolean;
}

export interface ISøknadDTO {
    underkategori: BehandlingUnderkategori;
    søkerMedOpplysninger: ISøkerMedOpplysninger;
    barnaMedOpplysninger: IBarnMedOpplysninger[];
    endringAvOpplysningerBegrunnelse: string;
}

export interface ISøkerMedOpplysninger {
    ident: string;
    målform: Målform | undefined;
}

export interface IBarnMedOpplysninger {
    inkludertISøknaden: boolean;
    ident: string;
    navn?: string;
    fødselsdato?: string;
    manueltRegistrert: boolean;
}

export enum Målform {
    NB = 'NB',
    NN = 'NN',
}

export const målform: INøkkelPar = {
    NB: {
        id: 'NB',
        navn: 'Bokmål',
    },
    NN: {
        id: 'NN',
        navn: 'Nynorsk',
    },
};
