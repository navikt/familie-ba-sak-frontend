import { http, HttpResponse } from 'msw';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { alleTogglerAv } from '../../../typer/toggles';

export const featureToggleHandlers = [
    http.post('/familie-ba-sak/api/feature/er-toggler-enabled', () => {
        return HttpResponse.json(byggSuksessRessurs(alleTogglerAv()));
    }),
];
