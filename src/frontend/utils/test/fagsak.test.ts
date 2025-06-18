/**
 * @jest-environment jsdom
 */

import { mockVisningBehandling } from './behandling/behandling.mock';
import { FagsakTestdata } from '../../testdata/fagsakTestdata';
import { BehandlingResultat } from '../../typer/behandling';
import { hentSisteIkkeHenlagteBehandling } from '../fagsak';

describe('fagsak utils tester', () => {
    test('hent siste ikke-henlagte behandling', () => {
        const fagsak = FagsakTestdata.lagFagsak({
            behandlinger: [
                mockVisningBehandling({
                    behandlingId: 1,
                    opprettetTidspunkt: '2023-01-06T16:11:59.065',
                }),
                mockVisningBehandling({
                    behandlingId: 2,
                    opprettetTidspunkt: '2023-01-06T16:21:59.065',
                }),
                mockVisningBehandling({
                    behandlingId: 3,
                    resultat: BehandlingResultat.HENLAGT_FEILAKTIG_OPPRETTET,
                    opprettetTidspunkt: '2023-01-06T16:31:59.065',
                }),
            ],
        });
        expect(hentSisteIkkeHenlagteBehandling(fagsak)?.behandlingId).toBe(2);
    });
});
