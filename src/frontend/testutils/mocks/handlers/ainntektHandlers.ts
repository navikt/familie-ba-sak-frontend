import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

export const ainntektHandlers = [
    http.post<never, { ident: string }>('/familie-ba-sak/api/a-inntekt/hent-url', async ({ request }) => {
        const payload = await request.json();
        return HttpResponse.json(byggSuksessRessurs(`url/${payload.ident}`));
    }),
];
