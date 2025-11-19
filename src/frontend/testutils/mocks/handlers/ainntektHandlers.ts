import { http, HttpResponse } from 'msw';

import { byggSuksessRessurs } from '@navikt/familie-typer';

export const ainntektHandlers = [
    http.post<never, { ident: string }>('/familie-ba-sak/api/a-inntekt/hent-url', async ({ request }) => {
        const payload = await request.json();
        return HttpResponse.json(byggSuksessRessurs(`url/${payload.ident}`));
    }),
];
