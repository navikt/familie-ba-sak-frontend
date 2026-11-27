import { byggSuksessRessurs } from '@navikt/familie-typer';
import type { BrevmottakerBehandling } from '@typer/brevmottaker';
import { HttpResponse, http } from 'msw';

export const brevmottakerHandlers = [
    http.get<{ behandlingId: string }>('/familie-ba-sak/api/brevmottaker/:behandlingId', () => {
        return HttpResponse.json(byggSuksessRessurs<BrevmottakerBehandling[]>([]));
    }),
];
