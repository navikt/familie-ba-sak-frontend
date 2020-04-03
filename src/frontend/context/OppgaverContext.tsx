import { AxiosError } from 'axios';
import createUseContext from 'constate';
import React from 'react';

import { IOppgave } from '../typer/oppgave';
import { byggFeiletRessurs, byggTomRessurs, Ressurs } from '../typer/ressurs';
import { useApp } from './AppContext';

const [OppgaverProvider, useOppgaver] = createUseContext(() => {
    const [hentetOppgaver, settHentetOppgaver] = React.useState(byggTomRessurs<IOppgave[]>());
    const [henter, settHenter] = React.useState(false);
    const { axiosRequest } = useApp();

    const hentOppgaver = (
        behandlingstema?: string,
        oppgavetype?: string,
        enhet?: string,
        saksbehandler?: string
    ) => {
        settHenter(true);
        axiosRequest<IOppgave[], void>({
            method: 'GET',
            url: `/familie-ba-sak/api/oppgaver?behandlingstema=${behandlingstema ||
                ''}&oppgavetype=${oppgavetype || ''}&enhet=${enhet ||
                ''}&saksbehandler=${saksbehandler || ''}`,
        })
            .then((oppgaverRes: Ressurs<IOppgave[]>) => {
                settHenter(false);
                settHentetOppgaver(oppgaverRes);
            })
            .catch((error: AxiosError) => {
                settHenter(false);
                settHentetOppgaver(byggFeiletRessurs('Ukjent ved innhenting av oppgaver', error));
            });
    };
    return { hentetOppgaver, hentOppgaver, henter };
});

export { OppgaverProvider, useOppgaver };
