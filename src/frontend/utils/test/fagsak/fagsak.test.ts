import { IFagsak } from '../../../typer/fagsak';
import { hentSisteBehandlingPåFagsak } from '../../fagsak';
import { mockBehandling } from '../behandling/behandling.mock';
import { mockFagsak } from './fagsak.mock';

describe('utils/fagsak', () => {
    describe('hentSisteBehandlingPåFagsak', () => {
        const fagsak1: IFagsak = mockFagsak({
            behandlinger: [
                mockBehandling({ behandlingId: 1, opprettetTidspunkt: '2020-10-19T02:01:00.0' }),
                mockBehandling({ behandlingId: 2, opprettetTidspunkt: '2020-11-19T03:00:00.0' }),
            ],
        });

        const fagsak2: IFagsak = mockFagsak({
            behandlinger: [
                mockBehandling({ behandlingId: 1, opprettetTidspunkt: '2020-03-19T02:01:00.0' }),
                mockBehandling({ behandlingId: 2, opprettetTidspunkt: '2020-03-19T03:00:00.0' }),
            ],
        });

        test('Skal returnere behandling med siste opprettetdato', () => {
            expect(hentSisteBehandlingPåFagsak(fagsak1)?.behandlingId).toEqual(2);
        });

        test('Skal returnere dato på format MM.YY', () => {
            expect(hentSisteBehandlingPåFagsak(fagsak2)?.behandlingId).toEqual(2);
        });
    });
});
