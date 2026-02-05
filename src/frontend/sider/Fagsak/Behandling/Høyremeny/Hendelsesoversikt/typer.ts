import type { BehandlerRolle } from '../../../../../typer/behandling';

export enum TabValg {
    Totrinnskontroll = 'Totrinnskontroll',
    Historikk = 'Historikk',
    Meldinger = 'Meldinger',
    Dokumenter = 'Dokumenter',
}

export interface Hendelse {
    id: string;
    dato: string;
    tittel: string;
    utførtAv: string;
    rolle: BehandlerRolle;
    beskrivelse?: string;
}
