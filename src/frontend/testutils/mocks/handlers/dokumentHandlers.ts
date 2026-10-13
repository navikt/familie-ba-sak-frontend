import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

import { Distribusjonskanal } from '../../../typer/dokument';

// Minimal PDF, base64-kodet slik backend returnerer brev.
const TOM_PDF_BASE64 = btoa('%PDF-1.4\n%%EOF\n');

export const dokumentHandlers = [
    http.post('/familie-ba-sak/api/dokument/distribusjonskanal', () => {
        return HttpResponse.json(byggSuksessRessurs(Distribusjonskanal.DITT_NAV));
    }),
    http.all<{ vedtakId: string }>('/familie-ba-sak/api/dokument/vedtaksbrev/:vedtakId', () => {
        return HttpResponse.json(byggSuksessRessurs(TOM_PDF_BASE64));
    }),
];
