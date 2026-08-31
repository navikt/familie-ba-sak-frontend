import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

import { KlageTestdata } from '../../testdata/klageTestdata';

export const klageHandlers = [
    http.get<{
        fagsakId: string;
    }>('/familie-ba-sak/api/fagsaker/:fagsakId/hent-klagebehandlinger', () => {
        return HttpResponse.json(byggSuksessRessurs([KlageTestdata.lagKlagebehandling()]));
    }),
];
