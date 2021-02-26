import { IBehandling } from '../../../typer/behandling';
import { FagsakStatus, IFagsak } from '../../../typer/fagsak';
import { mockBehandling } from '../behandling/behandling.mock';

interface IFagsakMockInput {
    behandlinger?: IBehandling[];
    id?: number;
    opprettetTidspunkt?: string;
    saksnummer?: string;
    status?: FagsakStatus;
    søkerFødselsnummer?: string;
    underBehandling?: boolean;
}

export const mockFagsak = ({
    behandlinger = [
        mockBehandling({ behandlingId: 1, opprettetTidspunkt: '2020-10-19T02:01:00.0' }),
    ],
    søkerFødselsnummer = '12345678910',
    id = 1,
    opprettetTidspunkt = '2020-09-19T09:08:56.8',
    saksnummer = '1234',
    status = FagsakStatus.LØPENDE,
    underBehandling = false,
}: IFagsakMockInput): IFagsak => ({
    behandlinger,
    id,
    søkerFødselsnummer,
    opprettetTidspunkt,
    saksnummer,
    status,
    underBehandling,
});
