import { IBarnBeregning } from './behandle';
import { IPerson } from './person';

// Enum
export enum Behandlingstype {
    FØRSTEGANGSBEHANDLING = 'FØRSTEGANGSBEHANDLING',
    MIGRERING_FRA_INFOTRYGD = 'MIGRERING_FRA_INFOTRYGD',
    REVURDERING = 'REVURDERING',
}

export enum BehandlingKategori {
    NATIONAL = 'NATIONAL',
    EØS = 'EØS',
}

export enum BehandlingUnderkategori {
    ORDINÆR = 'ORDINÆR',
    UTVIDET = 'UTVIDET',
}

export enum BehandlingStatus {
    OPPRETTET = 'OPPRETTET',
    UNDER_BEHANDLING = 'UNDER_BEHANDLING',
    LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG = 'LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG',
    SENDT_TIL_IVERKSETTING = 'SENDT_TIL_IVERKSETTING',
    IVERKSATT = 'IVERKSATT',
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
    aktiv: boolean;
    personer: IPerson[];
    behandlingId: number;
    kategori: BehandlingKategori;
    status: BehandlingStatus;
    type: Behandlingstype;
    underkategori: BehandlingUnderkategori;
    vedtakForBehandling: IVedtakForBehandling[];
}

export interface IVedtakForBehandling {
    aktiv: boolean;
    ansvarligSaksbehandler: string;
    barnasBeregning: IBarnBeregning[];
    stønadFom: string;
    stønadTom: string;
    vedtaksdato: string;
}

export interface IBehandlingsresultat {
    aktiv: boolean;
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
    MIGRERING_FRA_INFOTRYGD: {
        id: 'migrering_fra_infotrygd',
        navn: 'Migrering fra infotrygd',
    },
    REVURDERING: {
        id: 'revurdering',
        navn: 'Revurdering',
    },
};

export const kategorier: INøkkelPar = {
    NATIONAL: {
        id: 'national',
        navn: 'National',
    },
    EØS: {
        id: 'eøs',
        navn: 'EØS',
    },
};

export const underkategorier: INøkkelPar = {
    ORDINÆR: {
        id: 'ordinær',
        navn: 'Ordinær barnetrygd',
    },
    UTVIDET: {
        id: 'utvidet',
        navn: 'Utvidet barnetrygd',
    },
};
