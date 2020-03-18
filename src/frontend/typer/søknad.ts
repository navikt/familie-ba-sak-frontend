import { BehandlingKategori, BehandlingUnderkategori } from './behandling';
import { PersonType } from './person';
import { INøkkelPar } from './common';

export interface ISøknadDTO {
    kategori: BehandlingKategori;
    underkategori: BehandlingUnderkategori;
    typeSøker: TypeSøker;
    søkerMedOpplysninger: IPartMedOpplysninger;
    barnaMedOpplysninger: IPartMedOpplysninger[];
    annenPartIdent: string;
}

export interface IPartMedOpplysninger {
    checked: boolean;
    ident: string;
    personType: PersonType;
    opphold: IOpphold;
}

export interface IOpphold {
    oppholderSegINorge: boolean;
    harOppholdtSegINorgeSiste12Måneder: boolean;
    komTilNorge?: string;
    skalOppholdeSegINorgeNeste12Måneder: boolean;
    tilleggsopplysninger?: string;
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
