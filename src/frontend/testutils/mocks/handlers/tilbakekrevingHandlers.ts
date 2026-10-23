import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

import { TilbakekrevingTestdata } from '../../testdata/tilbakekrevingTestdata';

export const tilbakekrevingHandlers = [
    http.get<{
        fagsakId: string;
    }>('/familie-ba-sak/api/tilbakekreving/fagsak/:fagsakId', () => {
        return HttpResponse.json(byggSuksessRessurs([TilbakekrevingTestdata.lagTilbakekrevingbehandling()]));
    }),
    http.get<{ fagsakId: string }>('/familie-ba-sak/api/fagsaker/:fagsakId/har-apen-tilbakekreving', () => {
        return HttpResponse.json(byggSuksessRessurs(false));
    }),
];
