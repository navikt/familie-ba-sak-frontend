import type { BehandlerRolle } from '../../../typer/behandling';

export enum Tabs {
    Totrinnskontroll,
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
