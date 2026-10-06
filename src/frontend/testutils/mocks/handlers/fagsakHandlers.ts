import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

import { lagVisningBehandling } from '../../testdata/behandlingTestdata';
import { FagsakDeltagerTestdata } from '../../testdata/fagsakDeltagerTestdata';
import { FagsakTestdata } from '../../testdata/fagsakTestdata';

export const fagsakHandlers = [
    http.get<{ fagsakId: string }>('/familie-ba-sak/api/fagsaker/minimal/:fagsakId', ({ params }) => {
        return HttpResponse.json(byggSuksessRessurs(FagsakTestdata.lagFagsak({ id: Number(params.fagsakId) })));
    }),
    http.post<never, { personIdent: string }>(
        '/familie-ba-sak/api/fagsaker/hent-fagsaker-paa-person',
        async ({ request }) => {
            const payload = await request.json();
            return HttpResponse.json(
                byggSuksessRessurs([
                    FagsakTestdata.lagFagsak({
                        søkerFødselsnummer: payload.personIdent,
                        behandlinger: [lagVisningBehandling()],
                    }),
                ])
            );
        }
    ),
    http.post<never, { personIdent: string }>('/familie-ba-sak/api/fagsaker/sok', async ({ request }) => {
        const payload = await request.json();
        return HttpResponse.json(
            byggSuksessRessurs([FagsakDeltagerTestdata.lagFagsakDeltager({ ident: payload.personIdent })])
        );
    }),
];
