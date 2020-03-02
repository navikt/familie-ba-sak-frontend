import { IBehandling } from './behandling';
import { INøkkelPar } from './common';

// Enum
export enum FagsakStatus {
    OPPRETTET = 'OPPRETTET',
    LØPENDE = 'LØPENDE',
}

export enum BehandlingKategori {
    NASJONAL = 'NASJONAL',
    EØS = 'EØS',
}

export enum BehandlingUnderkategori {
    ORDINÆR = 'ORDINÆR',
    UTVIDET = 'UTVIDET',
}

export enum BehandlingStatus {
    OPPRETTET = 'OPPRETTET',
    UNDER_BEHANDLING = 'UNDER_BEHANDLING',
    SENDT_TIL_BESLUTTER = 'SENDT_TIL_BESLUTTER',
    GODKJENT = 'GODKJENT',
    LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG = 'LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG',
    SENDT_TIL_IVERKSETTING = 'SENDT_TIL_IVERKSETTING',
    IVERKSATT = 'IVERKSATT',
    FERDIGSTILT = 'FERDIGSTILT',
}

// Interface
export interface IFagsak {
    behandlinger: IBehandling[];
    id: number;
    opprettetTidspunkt: string;
    saksnummer: string;
    status: FagsakStatus;
    søkerFødselsnummer: string;
}

export const fagsakStatus: INøkkelPar = {
    OPPRETTET: {
        id: 'OPPRETTET',
        navn: 'Opprettet',
    },
    LØPENDE: {
        id: 'LØPENDE',
        navn: 'Løpende',
    },
};
