import { VisningBehandling } from '../komponenter/Fagsak/Saksoversikt/visningBehandling';
import { IBehandling } from './behandling';
import { INøkkelPar } from './common';
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
}

export interface IFagsak extends IBaseFagsak {
    behandlinger: IBehandling[];
    tilbakekrevingsbehandlinger: VisningBehandling[];
    gjeldendeUtbetalingsperioder: Utbetalingsperiode[];
}

export interface IMinimalFagsak extends IBaseFagsak {
    behandlinger: VisningBehandling[];
    tilbakekrevingsbehandlinger: VisningBehandling[];
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
}
