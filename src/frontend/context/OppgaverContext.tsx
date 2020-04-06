import { AxiosError } from 'axios';
import createUseContext from 'constate';
import React from 'react';

import { IOppgave } from '../typer/oppgave';
import { byggFeiletRessurs, byggTomRessurs, Ressurs } from '../typer/ressurs';
import { useApp } from './AppContext';

const [OppgaverProvider, useOppgaver] = createUseContext(() => {
    const [oppgaver, settOppgaver] = React.useState(byggTomRessurs<IOppgave[]>());
    const [henter, settHenter] = React.useState(false);
    const { axiosRequest } = useApp();

    const hentOppgaver = (
        behandlingstema?: string,
        oppgavetype?: string,
        enhet?: string,
        saksbehandler?: string
    ) => {
        const params = new Array<string>();
        behandlingstema && params.push(`behandlingstema=${behandlingstema}`);
        oppgavetype && params.push(`oppgavetype=${oppgavetype}`);
        enhet && params.push(`enhet=${enhet}`);
        saksbehandler && params.push(`saksbehandler=${saksbehandler}`);

        let query = params.length > 0 ? '?' : '';

        params.forEach((p, i) => {
            query += i == 0 ? '' : '&';
            query += p;
        });

        settHenter(true);
        return axiosRequest<IOppgave[], void>({
            method: 'GET',
            url: `/familie-ba-sak/api/oppgaver${query}`,
        })
            .then((oppgaverRes: Ressurs<IOppgave[]>) => {
                settHenter(false);
                settOppgaver(oppgaverRes);
            })
            .catch((error: AxiosError) => {
                settHenter(false);
                settOppgaver(byggFeiletRessurs('Ukjent ved innhenting av oppgaver', error));
            });
    };

    const filterOppgaver = () => {
        console.log('frontend filtering');
    };

    const sortOppgaver = () => {};

    return { oppgaver, hentOppgaver, filterOppgaver, sortOppgaver, henter };
});

export { OppgaverProvider, useOppgaver };
