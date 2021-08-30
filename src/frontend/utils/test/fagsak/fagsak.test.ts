import { IFagsak } from '../../../typer/fagsak';
import { hentSisteBehandlingPåFagsak, hentBehandlingPåFagsak } from '../../fagsak';
import { mockBehandling } from '../behandling/behandling.mock';
import { mockFagsak } from './fagsak.mock';

describe('utils/fagsak', () => {
    describe('hentSisteBehandlingPåFagsak', () => {
        const fagsak: IFagsak = mockFagsak({
            behandlinger: [
                mockBehandling({ behandlingId: 1, opprettetTidspunkt: '2020-03-19T02:01:00.0' }),
                mockBehandling({ behandlingId: 2, opprettetTidspunkt: '2020-03-19T03:00:00.0' }),
                mockBehandling({ behandlingId: 3, opprettetTidspunkt: '2020-03-19T01:00:00.0' }),
            ],
        });

        test('Skal returnere behandling med siste opprettetdato', () => {
            expect(hentSisteBehandlingPåFagsak(fagsak)?.behandlingId).toEqual(2);
        });
    });
    describe('hentBehandlingPåFagsak', () => {
        const behandling1 = mockBehandling({
            behandlingId: 1,
        });
        const behandling2 = mockBehandling({
            behandlingId: 2,
        });
        const behandling3 = mockBehandling({
            behandlingId: 3,
        });
        const fagsak: IFagsak = mockFagsak({
            behandlinger: [behandling1, behandling2, behandling3],
        });

        test('Skal returnere behandling med samme behandlingId', () => {
            expect(hentBehandlingPåFagsak(fagsak, 1)).toMatchObject(behandling1);
        });
    });
});
