import { BehandlerRolle } from '../../../typer/behandling';

export enum Tabs {
    Historikk,
    Meldinger,
    Dokumenter,
}

export interface Hendelse {
    id: string;
    dato: string;
    tittel: string;
    utførtAv: string;
    rolle: BehandlerRolle;
    beskrivelse?: string;
}
