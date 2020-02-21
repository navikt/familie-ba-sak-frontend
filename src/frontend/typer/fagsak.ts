import { IBarnBeregning } from './behandle';
import { IPerson } from './person';
import { IVilkårResultat } from './vilkår';

// Enum
export enum FagsakStatus {
    OPPRETTET = 'OPPRETTET',
    LØPENDE = 'LØPENDE',
}

export enum Behandlingstype {
    FØRSTEGANGSBEHANDLING = 'FØRSTEGANGSBEHANDLING',
    MIGRERING_FRA_INFOTRYGD = 'MIGRERING_FRA_INFOTRYGD',
    REVURDERING = 'REVURDERING',
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
    LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG = 'LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG',
    SENDT_TIL_IVERKSETTING = 'SENDT_TIL_IVERKSETTING',
    IVERKSATT = 'IVERKSATT',
    FERDIGSTILT = 'FERDIGSTILT',
}

export enum VedtakResultat {
    INNVILGET = 'INNVILGET',
    AVSLÅTT = 'AVSLÅTT',
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

export interface IBehandling {
    aktiv: boolean;
    behandlingId: number;
    kategori: BehandlingKategori;
    opprettetTidspunkt: string;
    personer: IPerson[];
    samletVilkårResultat: IVilkårResultat[];
    status: BehandlingStatus;
    type: Behandlingstype;
    underkategori: BehandlingUnderkategori;
    vedtakForBehandling: IVedtakForBehandling[];
}

export interface IVedtakForBehandling {
    aktiv: boolean;
    ansvarligSaksbehandler: string;
    barnasBeregning: IBarnBeregning[];
    resultat: VedtakResultat;
    vedtaksdato: string;
    begrunnelse: string;
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

export const behandlingstyper: INøkkelPar = {
    FØRSTEGANGSBEHANDLING: {
        id: 'FØRSTEGANGSBEHANDLING',
        navn: 'Førstegangsbehandling',
    },
    MIGRERING_FRA_INFOTRYGD: {
        id: 'MIGRERING_FRA_INFOTRYGD',
        navn: 'Migrering fra infotrygd',
    },
    REVURDERING: {
        id: 'REVURDERING',
        navn: 'Revurdering',
    },
};

export const behandlingsstatuser: INøkkelPar = {
    OPPRETTET: { id: 'OPPRETTET', navn: 'Opprettet' },
    UNDER_BEHANDLING: { id: 'UNDER_BEHANDLING', navn: 'Under behandling' },
    LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG: {
        id: 'LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG',
        navn: 'Lagt på kø for sending mot oppdrag',
    },
    SENDT_TIL_IVERKSETTING: { id: 'SENDT_TIL_IVERKSETTING', navn: 'Sendt til iverksetting' },
    IVERKSATT: { id: 'IVERKSATT', navn: 'Iverksatt' },
    FERDIGSTILT: { id: 'FERDIGSTILT', navn: 'Ferdigstilt' },
};

export const kategorier: INøkkelPar = {
    NASJONAL: {
        id: 'NASJONAL',
        navn: 'Nasjonal',
    },
    EØS: {
        id: 'EØS',
        navn: 'EØS',
    },
};

export const underkategorier: INøkkelPar = {
    ORDINÆR: {
        id: 'ORDINÆR',
        navn: 'Ordinær barnetrygd',
    },
    UTVIDET: {
        id: 'UTVIDET',
        navn: 'Utvidet barnetrygd',
    },
};

export const vedtaksresultater: INøkkelPar = {
    INNVILGET: { id: 'INNVILGET', navn: 'Innvilget' },
    AVSLÅTT: { id: 'AVSLÅTT', navn: 'Avslått' },
};
