import { BehandlerRolle } from './behandling';

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
    BEHANDLING_OPPRETTET,
}
