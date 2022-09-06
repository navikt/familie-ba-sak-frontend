import type { VisningBehandling } from '../komponenter/Fagsak/Saksoversikt/visningBehandling';
import type { BehandlingÅrsak } from './behandling';
import type { BehandlingKategori, BehandlingUnderkategori } from './behandlingstema';
import type { INøkkelPar } from './common';
import type { IInstitusjon } from './institusjon-og-verge';
import type { ITilbakekrevingsbehandling } from './tilbakekrevingsbehandling';
import type { Utbetalingsperiode } from './vedtaksperiode';

// Enum
export enum FagsakStatus {
    OPPRETTET = 'OPPRETTET',
    LØPENDE = 'LØPENDE',
    AVSLUTTET = 'AVSLUTTET',
}

export enum FagsakType {
    NORMAL = 'NORMAL',
    BARN_ENSLIG_MINDREÅRIG = 'BARN_ENSLIG_MINDREÅRIG',
    INSTITUSJON = 'INSTITUSJON',
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
    fagsakType: FagsakType;
    institusjon?: IInstitusjon;
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
