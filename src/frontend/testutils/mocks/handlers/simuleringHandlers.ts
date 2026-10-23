import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

import { SimuleringTestdata } from '../../testdata/simuleringTestdata';

export const simuleringHandlers = [
    http.get<{ behandlingId: string }>('/familie-ba-sak/api/behandlinger/:behandlingId/simulering', () => {
        return HttpResponse.json(byggSuksessRessurs(SimuleringTestdata.lagSimulering()));
    }),
];
