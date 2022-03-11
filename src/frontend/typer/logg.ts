import type { BehandlerRolle } from './behandling';

export interface ILogg {
    id: number;
    opprettetAv: string;
    opprettetTidspunkt: string;
    behandlingId: number;
    type: LoggType;
    tittel: string;
    rolle: BehandlerRolle;
    tekst: string;
}

export enum LoggType {
    BEHANDLING_OPPRETTET = 'BEHANDLING_OPPRETTET',
    FØDSELSHENDELSE = 'FØDSELSHENDELSE',
    BEHANDLENDE_ENHET_ENDRET = 'BEHANDLENDE_ENHET_ENDRET',
    DOKUMENT_MOTTATT = 'DOKUMENT_MOTTATT',
    SØKNAD_REGISTRERT = 'SØKNAD_REGISTRERT',
    VILKÅRSVURDERING = 'VILKÅRSVURDERING',
    SEND_TIL_BESLUTTER = 'SEND_TIL_BESLUTTER',
    GODKJENNE_VEDTAK = 'GODKJENNE_VEDTAK',
    DISTRIBUERE_BREV = 'DISTRIBUERE_BREV',
    FERDIGSTILLE_BEHANDLING = 'FERDIGSTILLE_BEHANDLING',
    HENLEGG_BEHANDLING = 'HENLEGG_BEHANDLING',
}
