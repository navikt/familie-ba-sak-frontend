import type { BehandlingÅrsak } from './behandling';
import type { BehandlingKategori, BehandlingUnderkategori } from './behandlingstema';
import type { INøkkelPar } from './common';
import type { IInstitusjon } from './institusjon';
import type { Utbetalingsperiode } from './vedtaksperiode';
import type { VisningBehandling } from '../sider/Fagsak/Saksoversikt/visningBehandling';

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
    SKJERMET_BARN = 'SKJERMET_BARN',
}

// Interface
export interface IBaseFagsak {
    id: number;
    fagsakeier: string;
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

export function sjekkHarNormalFagsak(fagsaker: IBaseFagsak[] | undefined): boolean {
    return (fagsaker ?? []).some(fagsak => fagsak.fagsakType === FagsakType.NORMAL);
}

export function sjekkHarBarnEnsligMindreårigFagsak(fagsaker: IBaseFagsak[] | undefined): boolean {
    return (fagsaker ?? []).some(fagsak => fagsak.fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG);
}

export interface IMinimalFagsak extends IBaseFagsak {
    migreringsdato?: string;
    behandlinger: VisningBehandling[];
    gjeldendeUtbetalingsperioder: Utbetalingsperiode[];
}

export function sjekkGjelderInstitusjon(fagsak: IMinimalFagsak) {
    return fagsak.fagsakType === FagsakType.INSTITUSJON;
}

export function sjekkGjelderEnsligMindreårig(fagsak: IMinimalFagsak) {
    return fagsak.fagsakType === FagsakType.BARN_ENSLIG_MINDREÅRIG;
}

export function sjekkGjelderSkjermetBarn(fagsak: IMinimalFagsak) {
    return fagsak.fagsakType === FagsakType.SKJERMET_BARN;
}

export const mapMinimalFagsakTilBaseFagsak = (it: IMinimalFagsak): IBaseFagsak => ({
    id: it.id,
    fagsakeier: it.fagsakeier,
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
