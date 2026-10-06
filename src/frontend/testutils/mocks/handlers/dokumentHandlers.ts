import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

import { Distribusjonskanal } from '../../../typer/dokument';

export const dokumentHandlers = [
    http.post('/familie-ba-sak/api/dokument/distribusjonskanal', () => {
        return HttpResponse.json(byggSuksessRessurs(Distribusjonskanal.DITT_NAV));
    }),
];
