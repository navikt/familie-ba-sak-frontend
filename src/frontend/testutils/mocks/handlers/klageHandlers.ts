import { http, HttpResponse } from 'msw';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { KlageTestdata } from '../../testdata/klageTestdata';

export const klageHandlers = [
    http.get<{
        fagsakId: string;
    }>('/familie-ba-sak/api/fagsaker/:fagsakId/hent-klagebehandlinger', () => {
        return HttpResponse.json(byggSuksessRessurs([KlageTestdata.lagKlagebehandling()]));
    }),
];
