import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

export const journalpostHandlers = [
    http.post('/familie-ba-sak/api/journalpost/for-bruker', () => {
        return HttpResponse.json(byggSuksessRessurs([]));
    }),
];
