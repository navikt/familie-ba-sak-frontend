import { BehandlingKategori, BehandlingStatus, BehandlingUnderkategori } from './fagsak';
import { IPerson } from './person';
import { IVilkårResultat } from './vilkår';
import { IVedtakForBehandling } from './vedtak';
import { INøkkelPar } from './common';

export enum Behandlingstype {
    FØRSTEGANGSBEHANDLING = 'FØRSTEGANGSBEHANDLING',
    MIGRERING_FRA_INFOTRYGD = 'MIGRERING_FRA_INFOTRYGD',
    REVURDERING = 'REVURDERING',
}

export enum BehandlingResultat {
    IKKE_VURDERT = 'IKKE_VURDERT',
    INNVILGET = 'INNVILGET',
    AVSLÅTT = 'AVSLÅTT',
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

export const vedtaksresultater: INøkkelPar = {
    INNVILGET: { id: 'INNVILGET', navn: 'Innvilget' },
    AVSLÅTT: { id: 'AVSLÅTT', navn: 'Avslått' },
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
