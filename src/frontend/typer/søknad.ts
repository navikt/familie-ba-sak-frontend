import { BehandlingUnderkategori } from './behandling';

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
    fødselsdato?: string;
    ident: string;
    inkludertISøknaden: boolean;
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
