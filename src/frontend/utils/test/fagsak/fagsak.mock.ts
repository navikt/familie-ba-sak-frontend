import { IBehandling } from '../../../typer/behandling';
import { FagsakStatus, IFagsak } from '../../../typer/fagsak';
import { Utbetalingsperiode } from '../../../typer/vedtaksperiode';
import { mockBehandling } from '../behandling/behandling.mock';

interface IMockFagsak {
    behandlinger?: IBehandling[];
    gjeldendeUtbetalingsperioder?: Utbetalingsperiode[];
    id?: number;
    opprettetTidspunkt?: string;
    saksnummer?: string;
    status?: FagsakStatus;
    søkerFødselsnummer?: string;
    underBehandling?: boolean;
}

export const mockFagsak = ({
    behandlinger = [mockBehandling()],
    gjeldendeUtbetalingsperioder = [],
    id = 1,
    opprettetTidspunkt = '2020-09-19T09:08:56.8',
    saksnummer = '1234',
    status = FagsakStatus.LØPENDE,
    søkerFødselsnummer = '12345678910',
    underBehandling = false,
}: IMockFagsak = {}): IFagsak => ({
    behandlinger,
    id,
    søkerFødselsnummer,
    opprettetTidspunkt,
    saksnummer,
    status,
    underBehandling,
    gjeldendeUtbetalingsperioder,
});
