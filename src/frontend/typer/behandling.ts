import { INøkkelPar } from './common';
import { IPerson } from './person';
import { IVedtakForBehandling } from './vedtak';
import { IRestPersonResultat } from './vilkår';
import { ITotrinnskontroll } from './totrinnskontroll';
import { IOppsummeringBeregning } from './beregning';

export enum BehandlingKategori {
    NASJONAL = 'NASJONAL',
    EØS = 'EØS',
}

export enum BehandlingUnderkategori {
    ORDINÆR = 'ORDINÆR',
    UTVIDET = 'UTVIDET',
}

export enum BehandlingSteg {
    REGISTRERE_SØKNAD = 1,
    REGISTRERE_PERSONGRUNNLAG = 1,
    VILKÅRSVURDERING = 2,
    SEND_TIL_BESLUTTER = 3,
    BESLUTTE_VEDTAK = 4,
    IVERKSETT_MOT_OPPDRAG = 5,
    VENTE_PÅ_STATUS_FRA_ØKONOMI = 6,
    JOURNALFØR_VEDTAKSBREV = 7,
    DISTRIBUER_VEDTAKSBREV = 8,
    FERDIGSTILLE_BEHANDLING = 9,
    BEHANDLING_AVSLUTTET = 10,
}

export enum BehandlingStatus {
    OPPRETTET = 'OPPRETTET',
    UNDER_BEHANDLING = 'UNDER_BEHANDLING',
    SENDT_TIL_BESLUTTER = 'SENDT_TIL_BESLUTTER',
    GODKJENT = 'GODKJENT',
    UNDERKJENT_AV_BESLUTTER = 'UNDERKJENT_AV_BESLUTTER',
    LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG = 'LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG',
    SENDT_TIL_IVERKSETTING = 'SENDT_TIL_IVERKSETTING',
    IVERKSATT = 'IVERKSATT',
    FERDIGSTILT = 'FERDIGSTILT',
}

export enum Behandlingstype {
    FØRSTEGANGSBEHANDLING = 'FØRSTEGANGSBEHANDLING',
    MIGRERING_FRA_INFOTRYGD = 'MIGRERING_FRA_INFOTRYGD',
    REVURDERING = 'REVURDERING',
    TEKNISK_OPPHØR = 'TEKNISK_OPPHØR',
}

export enum BehandlingResultat {
    AVSLÅTT = 'AVSLÅTT',
    IKKE_VURDERT = 'IKKE_VURDERT',
    INNVILGET = 'INNVILGET',
    OPPHØRT = 'OPPHØRT',
}

export enum BehandlerRolle {
    SYSTEM = 0,
    VEILEDER = 1,
    SAKSBEHANDLER = 2,
    BESLUTTER = 3,
}

export interface IBehandling {
    aktiv: boolean;
    begrunnelse: string;
    behandlingId: number;
    endretAv: string;
    kategori: BehandlingKategori;
    opprettetTidspunkt: string;
    personResultater: IRestPersonResultat[];
    personer: IPerson[];
    samletResultat: BehandlingResultat;
    status: BehandlingStatus;
    steg: BehandlingSteg;
    totrinnskontroll?: ITotrinnskontroll;
    type: Behandlingstype;
    underkategori: BehandlingUnderkategori;
    vedtakForBehandling: IVedtakForBehandling[];
    beregningOversikt: IOppsummeringBeregning[];
}

export const behandlerRoller: INøkkelPar = {
    SYSTEM: { id: 'SYSTEM', navn: 'System' },
    VEILEDER: { id: 'VEILEDER', navn: 'Veileder' },
    SAKSBEHANDLER: { id: 'SAKSBEHANDLER', navn: 'Saksbehandler' },
    BESLUTTER: { id: 'BESLUTTER', navn: 'Beslutter' },
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
    TEKNISK_OPPHØR: {
        id: 'TEKNISK_OPPHØR',
        navn: 'Teknisk opphør',
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
        navn: 'Ordinær',
    },
    UTVIDET: {
        id: 'UTVIDET',
        navn: 'Utvidet',
    },
};

export const behandlingsresultater: INøkkelPar = {
    INNVILGET: { id: 'INNVILGET', navn: 'Innvilget' },
    IKKE_VURDERT: { id: 'IKKE_VURDERT', navn: 'Ikke vurdert' },
    AVSLÅTT: { id: 'AVSLÅTT', navn: 'Avslått' },
    OPPHØRT: { id: 'OPPHØRT', navn: 'Opphørt' },
};

export const behandlingsstatuser: INøkkelPar = {
    OPPRETTET: { id: 'OPPRETTET', navn: 'Opprettet' },
    UNDER_BEHANDLING: { id: 'UNDER_BEHANDLING', navn: 'Under behandling' },
    SENDT_TIL_BESLUTTER: { id: 'SENDT_TIL_BESLUTTER', navn: 'Sendt til beslutter' },
    UNDERKJENT_AV_BESLUTTER: { id: 'UNDERKJENT_AV_BESLUTTER', navn: 'Underkjent av beslutter' },
    GODKJENT: { id: 'GODKJENT', navn: 'Godkjent' },
    LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG: {
        id: 'LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG',
        navn: 'Lagt på kø for sending mot oppdrag',
    },
    SENDT_TIL_IVERKSETTING: { id: 'SENDT_TIL_IVERKSETTING', navn: 'Sendt til iverksetting' },
    IVERKSATT: { id: 'IVERKSATT', navn: 'Iverksatt' },
    FERDIGSTILT: { id: 'FERDIGSTILT', navn: 'Ferdigstilt' },
};
