import { INøkkelPar } from './common';
import { IPerson } from './person';
import { IVedtakForBehandling } from './vedtak';
import { IVilkårResultat } from './vilkår';

export enum BehandlingKategori {
    NASJONAL = 'NASJONAL',
    EØS = 'EØS',
}

export enum BehandlingUnderkategori {
    ORDINÆR = 'ORDINÆR',
    UTVIDET = 'UTVIDET',
}

export enum BehandlingSteg {
    REGISTRERE_PERSONGRUNNLAG = 'REGISTRERE_PERSONGRUNNLAG',
    VILKÅRSVURDERING = 'VILKÅRSVURDERING',
    FORESLÅ_VEDTAK = 'FORESLÅ_VEDTAK',
    GODKJENNE_VEDTAK = 'GODKJENNE_VEDTAK',
    FERDIGSTILLE_BEHANDLING = 'FERDIGSTILLE_BEHANDLING',
    BEHANDLING_AVSLUTTET = 'BEHANDLING_AVSLUTTET',
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

export enum Behandlingstype {
    FØRSTEGANGSBEHANDLING = 'FØRSTEGANGSBEHANDLING',
    MIGRERING_FRA_INFOTRYGD = 'MIGRERING_FRA_INFOTRYGD',
    REVURDERING = 'REVURDERING',
}

export enum BehandlingResultat {
    AVSLÅTT = 'AVSLÅTT',
    IKKE_VURDERT = 'IKKE_VURDERT',
    INNVILGET = 'INNVILGET',
    OPPHØRT = 'OPPHØRT',
}

export enum BehandlerRolle {
    SYSTEM,
    SAKSBEHANDLER,
    BESLUTTER,
}

export interface IBehandling {
    aktiv: boolean;
    begrunnelse: string;
    behandlingId: number;
    kategori: BehandlingKategori;
    opprettetTidspunkt: string;
    personer: IPerson[];
    resultat: BehandlingResultat;
    samletVilkårResultat: IVilkårResultat[];
    status: BehandlingStatus;
    steg: BehandlingSteg;
    type: Behandlingstype;
    underkategori: BehandlingUnderkategori;
    vedtakForBehandling: IVedtakForBehandling[];
}

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

export const behandlingsresultater: INøkkelPar = {
    INNVILGET: { id: 'INNVILGET', navn: 'Innvilget' },
    AVSLÅTT: { id: 'AVSLÅTT', navn: 'Avslått' },
    OPPHØRT: { id: 'OPPHØRT', navn: 'Opphørt' },
};

export const behandlingsstatuser: INøkkelPar = {
    OPPRETTET: { id: 'OPPRETTET', navn: 'Opprettet' },
    UNDER_BEHANDLING: { id: 'UNDER_BEHANDLING', navn: 'Under behandling' },
    SENDT_TIL_BESLUTTER: { id: 'SENDT_TIL_BESLUTTER', navn: 'Sendt til beslutter' },
    GODKJENT: { id: 'GODKJENT', navn: 'Godkjent' },
    LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG: {
        id: 'LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG',
        navn: 'Lagt på kø for sending mot oppdrag',
    },
    SENDT_TIL_IVERKSETTING: { id: 'SENDT_TIL_IVERKSETTING', navn: 'Sendt til iverksetting' },
    IVERKSATT: { id: 'IVERKSATT', navn: 'Iverksatt' },
    FERDIGSTILT: { id: 'FERDIGSTILT', navn: 'Ferdigstilt' },
};
