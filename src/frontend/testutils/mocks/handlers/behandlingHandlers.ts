import { http, HttpResponse } from 'msw';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { BehandlingTestdata } from '../../testdata/behandlingTestdata';

export const behandlingHandlers = [
    http.get<{ fagsakId: string }>('/familie-ba-sak/api/behandlinger/fagsak/:fagsakId', () => {
        return HttpResponse.json(byggSuksessRessurs([BehandlingTestdata.lagVisningBehandling()]));
    }),
];
