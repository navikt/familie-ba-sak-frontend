import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

export const versionHandlers = [
    http.get('/version', () => {
        return HttpResponse.json(byggSuksessRessurs({ versjon: '1', branch: 'main' }));
    }),
];
