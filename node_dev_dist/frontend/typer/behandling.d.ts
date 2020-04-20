import { INøkkelPar } from './common';
import { IPerson } from './person';
import { IVedtakForBehandling } from './vedtak';
import { IRestPersonResultat } from './vilkår';
export declare enum BehandlingKategori {
    NASJONAL = "NASJONAL",
    EØS = "E\u00D8S"
}
export declare enum BehandlingUnderkategori {
    ORDINÆR = "ORDIN\u00C6R",
    UTVIDET = "UTVIDET"
}
export declare enum BehandlingSteg {
    REGISTRERE_SØKNAD = 1,
    REGISTRERE_PERSONGRUNNLAG = 1,
    VILKÅRSVURDERING = 2,
    SEND_TIL_BESLUTTER = 3,
    GODKJENNE_VEDTAK = 4,
    FERDIGSTILLE_BEHANDLING = 5,
    BEHANDLING_AVSLUTTET = 6
}
export declare enum BehandlingStatus {
    OPPRETTET = "OPPRETTET",
    UNDER_BEHANDLING = "UNDER_BEHANDLING",
    SENDT_TIL_BESLUTTER = "SENDT_TIL_BESLUTTER",
    GODKJENT = "GODKJENT",
    LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG = "LAGT_PA_KO_FOR_SENDING_MOT_OPPDRAG",
    SENDT_TIL_IVERKSETTING = "SENDT_TIL_IVERKSETTING",
    IVERKSATT = "IVERKSATT",
    FERDIGSTILT = "FERDIGSTILT"
}
export declare enum Behandlingstype {
    FØRSTEGANGSBEHANDLING = "F\u00D8RSTEGANGSBEHANDLING",
    MIGRERING_FRA_INFOTRYGD = "MIGRERING_FRA_INFOTRYGD",
    REVURDERING = "REVURDERING"
}
export declare enum BehandlingResultat {
    AVSLÅTT = "AVSL\u00C5TT",
    IKKE_VURDERT = "IKKE_VURDERT",
    INNVILGET = "INNVILGET",
    OPPHØRT = "OPPH\u00D8RT"
}
export declare enum BehandlerRolle {
    SYSTEM = 0,
    SAKSBEHANDLER = 1,
    BESLUTTER = 2
}
export interface IBehandling {
    aktiv: boolean;
    begrunnelse: string;
    behandlingId: number;
    kategori: BehandlingKategori;
    opprettetTidspunkt: string;
    personer: IPerson[];
    personResultater: IRestPersonResultat[];
    status: BehandlingStatus;
    steg: BehandlingSteg;
    type: Behandlingstype;
    underkategori: BehandlingUnderkategori;
    vedtakForBehandling: IVedtakForBehandling[];
}
export declare const behandlingstyper: INøkkelPar;
export declare const kategorier: INøkkelPar;
export declare const underkategorier: INøkkelPar;
export declare const behandlingsresultater: INøkkelPar;
export declare const behandlingsstatuser: INøkkelPar;
