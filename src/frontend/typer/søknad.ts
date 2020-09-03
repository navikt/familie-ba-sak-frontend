import { BehandlingUnderkategori } from './behandling';

export interface IRestRegistrerSøknad {
    søknad: ISøknadDTO;
    bekreftEndringerViaFrontend: boolean;
}

export interface ISøknadDTO {
    underkategori: BehandlingUnderkategori;
    søkerMedOpplysninger: ISøkerMedOpplysninger;
    barnaMedOpplysninger: IBarnMedOpplysninger[];
}

export interface ISøkerMedOpplysninger {
    ident: string;
}

export interface IBarnMedOpplysninger {
    inkludertISøknaden: boolean;
    ident: string;
    oppholderSegINorge: boolean;
    borMedSøker: boolean;
    harOppholdtSegINorgeSiste12Måneder: boolean;
    tilleggsopplysninger?: string;
    navn?: string;
    fødselsdato?: string;
}
