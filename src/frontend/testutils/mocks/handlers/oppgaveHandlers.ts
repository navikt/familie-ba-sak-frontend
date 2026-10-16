import { byggSuksessRessurs } from '@navikt/familie-typer';
import { HttpResponse, http } from 'msw';

import { OppgaveTestdata } from '../../testdata/oppgaveTestdata';

export const oppgaveHandlers = [
    http.post('/familie-ba-sak/api/oppgave/hent-oppgaver', () => {
        return HttpResponse.json(byggSuksessRessurs(OppgaveTestdata.lagHentOppgaveDto()));
    }),
];
