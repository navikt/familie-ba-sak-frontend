import { VisningBehandling } from '../komponenter/Fagsak/Saksoversikt/visningBehandling';
import { BehandlingÅrsak } from './behandling';
import { BehandlingKategori, BehandlingUnderkategori } from './behandlingstema';
import { INøkkelPar } from './common';
import { ITilbakekrevingsbehandling } from './tilbakekrevingsbehandling';
import { Utbetalingsperiode } from './vedtaksperiode';

// Enum
export enum FagsakStatus {
    OPPRETTET = 'OPPRETTET',
    LØPENDE = 'LØPENDE',
    AVSLUTTET = 'AVSLUTTET',
}

// Interface
export interface IBaseFagsak {
    id: number;
    opprettetTidspunkt: string;
    saksnummer: string;
    status: FagsakStatus;
    søkerFødselsnummer: string;
    underBehandling: boolean;
    løpendeKategori?: BehandlingKategori;
    løpendeUnderkategori?: BehandlingUnderkategori;
}

export interface IMinimalFagsak extends IBaseFagsak {
    migreringsdato?: string;
    behandlinger: VisningBehandling[];
    tilbakekrevingsbehandlinger: ITilbakekrevingsbehandling[];
    gjeldendeUtbetalingsperioder: Utbetalingsperiode[];
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
    AVSLUTTET: {
        id: 'AVSLUTTET',
        navn: 'Avsluttet',
    },
};

export interface IInternstatistikk {
    antallFagsakerTotalt: number;
    antallFagsakerLøpende: number;
    antallBehandlingerIkkeFerdigstilt: number;
    antallBehandlingerPerÅrsak: Record<BehandlingÅrsak, number>;
}
