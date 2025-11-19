import { http, HttpResponse } from 'msw';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { BehandlingTestdata } from '../../testdata/behandlingTestdata';

export const behandlingHandlers = [
    http.get<{ fagsakId: string }>('/familie-ba-sak/api/behandlinger/fagsak/:fagsakId', () => {
        return HttpResponse.json(byggSuksessRessurs([BehandlingTestdata.lagVisningBehandling()]));
    }),
    http.get<{ behandlingId: string }>('/familie-ba-sak/api/behandlinger/:behandlingId', ({ request }) => {
        const url = new URL(request.url);
        const behandlingId = Number(url.searchParams.get('behandlingId') ?? '1');
        return HttpResponse.json(byggSuksessRessurs([BehandlingTestdata.lagBehandling({ behandlingId })]));
    }),
];
