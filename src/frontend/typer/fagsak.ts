import { IPerson } from './person';

// Enum
export enum VilkårType {
    BARN_NORSK_STATSBORGER = 'BARN_NORSK_STATSBORGER',
    BARNEHAGE = 'BARNEHAGE',
    BARN_MELLOM_10_OG_14_MÅNEDER = 'BARN_MELLOM_10_OG_14_MÅNEDER',
    BARN_BOR_MED_FORELDRE = 'BARN_BOR_MED_FORELDRE',
    KUN_ET_BARN = 'KUN_ET_BARN',
    MEDLEMSKAP_BOSTED = 'MEDLEMSKAP_BOSTED',
    MEDLEMSKAP_BOSTED_NÅ = 'MEDLEMSKAP_BOSTED_NÅ',
    MEDLEMSKAP_MEDL = 'MEDLEMSKAP_MEDL',
    MEDLEMSKAP_STATSBORGERSKAP = 'MEDLEMSKAP_STATSBORGERSKAP',
    OPPGITT_TILKNYTNING_TIL_UTLAND = 'OPPGITT_TILKNYTNING_TIL_UTLAND',
}

export enum UtfallType {
    IKKE_OPPFYLT = 'IKKE_OPPFYLT',
    IKKE_VURDERT = 'IKKE_VURDERT',
    MANUELL_BEHANDLING = 'MANUELL_BEHANDLING',
    OPPFYLT = 'OPPFYLT',
    UAVKLART = 'UAVKLART',
}

// Interface
export interface IFagsak {
    behandlinger: IBehandling[];
    id: number;
    opprettetTidspunkt: string;
    saksnummer: string;
    søkerFødselsnummer: string;
}

export interface IBehandling {
    behandlingId: number;
    søker: string;
    barna: string[];
}

export interface IBehandlingsresultat {
    aktiv: boolean;
    vilkårsResultat: IVilkårsResultat[];
}

export interface IVilkårsResultat {
    vilkårType: VilkårType;
    utfall: UtfallType;
}

export interface IPersonopplysninger {
    annenPart: IPerson;
    barna: IPerson[];
    søker: IPerson;
}

export interface INøkkelPar {
    [key: string]: {
        id: string;
        navn: string;
    };
}

export const behandlingstyper: INøkkelPar = {
    FØRSTEGANGSBEHANDLING: {
        id: 'førstegangsbehandling',
        navn: 'Førstegangsbehandling',
    },
    REVURDERING: {
        id: 'revurdering',
        navn: 'Revurdering',
    },
};

export const sakstyper: INøkkelPar = {
    ORDINÆR: {
        id: 'ordinær',
        navn: 'Ordinær barnetrygd',
    },
    UTVIDET: {
        id: 'utvidet',
        navn: 'Utvidet barnetrygd',
    },
};
