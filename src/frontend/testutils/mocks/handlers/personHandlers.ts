import { http, HttpResponse } from 'msw';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { PersonTestdata } from '../../testdata/personTestdata';

export const personHandlers = [
    http.post<never, { ident: string }>('/familie-ba-sak/api/person/enkel', async ({ request }) => {
        const payload = await request.json();
        return HttpResponse.json(byggSuksessRessurs(PersonTestdata.lagPerson({ personIdent: payload.ident })));
    }),
];
