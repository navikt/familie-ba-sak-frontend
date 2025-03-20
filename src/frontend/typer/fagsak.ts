import type { BehandlingÅrsak } from './behandling';
import type { BehandlingKategori, BehandlingUnderkategori } from './behandlingstema';
import type { INøkkelPar } from './common';
import type { IInstitusjon } from './institusjon';
import type { ITilbakekrevingsbehandling } from './tilbakekrevingsbehandling';
import type { Utbetalingsperiode } from './vedtaksperiode';
import type { VisningBehandling } from '../sider/fagsak/Saksoversikt/visningBehandling';

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

export const mapMinimalFagsakTilBaseFagsak = (it: IMinimalFagsak): IBaseFagsak => ({
    id: it.id,
    opprettetTidspunkt: it.opprettetTidspunkt,
    saksnummer: it.saksnummer,
    status: it.status,
    søkerFødselsnummer: it.søkerFødselsnummer,
    underBehandling: it.underBehandling,
    løpendeKategori: it.løpendeKategori,
    løpendeUnderkategori: it.løpendeUnderkategori,
    fagsakType: it.fagsakType,
    institusjon: it.institusjon,
});

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
