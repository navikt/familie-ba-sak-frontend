import type { VisningBehandling } from '../../../komponenter/Fagsak/Saksoversikt/visningBehandling';
import { BehandlingKategori, BehandlingUnderkategori } from '../../../typer/behandlingstema';
import type { IMinimalFagsak } from '../../../typer/fagsak';
import { FagsakType } from '../../../typer/fagsak';
import { FagsakStatus } from '../../../typer/fagsak';
import type { Utbetalingsperiode } from '../../../typer/vedtaksperiode';
import { mockVisningBehandling } from '../behandling/behandling.mock';

interface IMockMinimalFagsak {
    migreringsdato?: string;
    behandlinger?: VisningBehandling[];
    gjeldendeUtbetalingsperioder?: Utbetalingsperiode[];
    id?: number;
    opprettetTidspunkt?: string;
    saksnummer?: string;
    status?: FagsakStatus;
    søkerFødselsnummer?: string;
    underBehandling?: boolean;
    løpendeKategori?: BehandlingKategori;
    løpendeUnderkategori?: BehandlingUnderkategori;
    fagsakType?: FagsakType;
}

export const mockMinimalFagsak = ({
    migreringsdato = '',
    behandlinger = [mockVisningBehandling()],
    gjeldendeUtbetalingsperioder = [],
    id = 1,
    opprettetTidspunkt = '2020-09-19T09:08:56.8',
    saksnummer = '1234',
    status = FagsakStatus.LØPENDE,
    søkerFødselsnummer = '12345678910',
    underBehandling = false,
    løpendeKategori = BehandlingKategori.NASJONAL,
    løpendeUnderkategori = BehandlingUnderkategori.ORDINÆR,
    fagsakType = FagsakType.NORMAL,
}: IMockMinimalFagsak = {}): IMinimalFagsak => ({
    migreringsdato,
    behandlinger,
    id,
    søkerFødselsnummer,
    opprettetTidspunkt,
    saksnummer,
    status,
    underBehandling,
    gjeldendeUtbetalingsperioder,
    tilbakekrevingsbehandlinger: [],
    løpendeKategori,
    løpendeUnderkategori,
    fagsakType,
});
