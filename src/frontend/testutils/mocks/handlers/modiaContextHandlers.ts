import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

export const modiaContextHandlers = [
    http.post('/familie-ba-sak/api/modia-context/sett-aktiv-bruker', () => {
        return HttpResponse.json(byggSuksessRessurs(null));
    }),
];
