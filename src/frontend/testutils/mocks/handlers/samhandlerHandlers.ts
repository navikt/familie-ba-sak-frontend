import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

import { SamhandlerTestdata } from '../../testdata/samhandlerTestdata';

export const samhandlerHandlers = [
    http.get<{ orgnr: string }>('/familie-ba-sak/api/samhandler/orgnr/:orgnr', ({ params }) => {
        return HttpResponse.json(byggSuksessRessurs(SamhandlerTestdata.lagSamhandler({ orgNummer: params.orgnr })));
    }),
];
