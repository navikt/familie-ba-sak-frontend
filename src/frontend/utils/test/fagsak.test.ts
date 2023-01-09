import { BehandlingResultat } from '../../typer/behandling';
import { hentSisteIkkeHenlagteBehandling } from '../fagsak';
import { mockVisningBehandling } from './behandling/behandling.mock';
import { mockMinimalFagsak } from './minimalFagsak/minimalFagsak.mock';

describe('fagsak utils tester', () => {
    test('hent siste ikke-henlagte behandling', () => {
        const minimalFagsak = mockMinimalFagsak({
            behandlinger: [
                mockVisningBehandling({ behandlingId: 1 }),
                mockVisningBehandling({ behandlingId: 2 }),
                mockVisningBehandling({
                    behandlingId: 3,
                    resultat: BehandlingResultat.HENLAGT_FEILAKTIG_OPPRETTET,
                }),
            ],
        });
        expect(hentSisteIkkeHenlagteBehandling(minimalFagsak)?.behandlingId).toBe(2);
    });
});
