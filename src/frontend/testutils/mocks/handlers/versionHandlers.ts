import { http, HttpResponse } from 'msw';

import { byggSuksessRessurs } from '@navikt/familie-typer';

export const versionHandlers = [
    http.get('/version', () => {
        return HttpResponse.json(byggSuksessRessurs('1'));
    }),
];
