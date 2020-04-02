import { BehandlingKategori, BehandlingUnderkategori } from './behandling';
import { INøkkelPar } from './common';

export interface ISøknadDTO {
    kategori: BehandlingKategori;
    underkategori: BehandlingUnderkategori;
    typeSøker: TypeSøker;
    søkerMedOpplysninger: ISøkerMedOpplysninger;
    barnaMedOpplysninger: IBarnMedOpplysninger[];
    annenPartIdent: string;
}

export interface ISøkerMedOpplysninger {
    ident: string;
    oppholderSegINorge: boolean;
    harOppholdtSegINorgeSiste12Måneder: boolean;
    komTilNorge?: string;
    skalOppholdeSegINorgeNeste12Måneder: boolean;
    tilleggsopplysninger?: string;
}

export interface IBarnMedOpplysninger {
    inkludertISøknaden: boolean;
    ident: string;
    oppholderSegINorge: boolean;
    borMedSøker: boolean;
    harOppholdtSegINorgeSiste12Måneder: boolean;
    tilleggsopplysninger?: string;
    navn: string;
    fødselsdato: string;
}

export enum TypeSøker {
    ORDINÆR = 'ORDINÆR',
    INSTITUSJON = 'INSTITUSJON',
    TREDJELANDSBORGER = 'TREDJELANDSBORGER',
    EØS_BORGER = 'EØS_BORGER',
}

export const søknadstyper: INøkkelPar = {
    ORDINÆR: { id: 'ORDINÆR', navn: 'Ordinær' },
    INSTITUSJON: { id: 'INSTITUSJON', navn: 'Institusjon' },
    TREDJELANDSBORGER: { id: 'TREDJELANDSBORGER', navn: 'Tredjelandsborger' },
    EØS_BORGER: { id: 'EØS_BORGER', navn: 'EØS borger' },
};
