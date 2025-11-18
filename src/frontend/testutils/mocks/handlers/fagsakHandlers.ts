import { http, HttpResponse } from 'msw';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { lagVisningBehandling } from '../../testdata/behandlingTestdata';
import { FagsakTestdata } from '../../testdata/fagsakTestdata';

export const fagsakHandlers = [
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
];
