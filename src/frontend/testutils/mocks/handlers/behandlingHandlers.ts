import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

import { BehandlingTestdata } from '../../testdata/behandlingTestdata';

export const behandlingHandlers = [
    http.get<{ fagsakId: string }>('/familie-ba-sak/api/behandlinger/fagsak/:fagsakId', () => {
        return HttpResponse.json(byggSuksessRessurs([BehandlingTestdata.lagVisningBehandling()]));
    }),
    http.get<{ behandlingId: string }>('/familie-ba-sak/api/behandlinger/:behandlingId', ({ params }) => {
        const behandlingId = Number(params.behandlingId);
        return HttpResponse.json(byggSuksessRessurs(BehandlingTestdata.lagBehandling({ behandlingId })));
    }),
];
