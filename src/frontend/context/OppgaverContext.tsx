import { AxiosError } from 'axios';
import createUseContext from 'constate';
import React from 'react';

import { IOppgave, SaksbehandlerFilter } from '../typer/oppgave';
import { byggFeiletRessurs, byggTomRessurs, Ressurs, RessursStatus } from '../typer/ressurs';
import { useApp } from './AppContext';

const [OppgaverProvider, useOppgaver] = createUseContext(() => {
    const [oppgaver, settOppgaver] = React.useState(byggTomRessurs<IOppgave[]>());
    const { axiosRequest } = useApp();

    const hentOppgaver = (
        behandlingstema?: string,
        oppgavetype?: string,
        enhet?: string,
        saksbehandler?: string
    ) => {
        const params = new Array<string>();
        if (behandlingstema) {
            params.push(`behandlingstema=${behandlingstema}`);
        }
        if (oppgavetype) {
            params.push(`oppgavetype=${oppgavetype}`);
        }
        if (enhet) {
            params.push(`enhet=${enhet}`);
        }
        if (saksbehandler) {
            params.push(`saksbehandler=${saksbehandler}`);
        }

        let query = params.length > 0 ? '?' : '';

        params.forEach((p, i) => {
            query += i === 0 ? '' : '&';
            query += p;
        });

        settOppgaver({
            ...oppgaver,
            status: RessursStatus.HENTER,
        });

        return axiosRequest<IOppgave[], void>({
            method: 'GET',
            url: `/familie-ba-sak/api/oppgave${query}`,
        })
            .then((oppgaverRes: Ressurs<IOppgave[]>) => {
                settOppgaver(oppgaverRes);
                return oppgaverRes;
            })
            .catch((error: AxiosError) => {
                settOppgaver(byggFeiletRessurs('Ukjent ved innhenting av oppgaver', error));
            });
    };

    const filterOppgaver = (
        oppgaverRes: Ressurs<IOppgave[]>,
        prioritet?: string,
        frist?: string,
        registrertDato?: string,
        saksbehandler?: string
    ) => {
        if (oppgaverRes.status === RessursStatus.SUKSESS) {
            settOppgaver({
                status: RessursStatus.SUKSESS,
                data: oppgaverRes.data.filter(
                    oppgave =>
                        (!prioritet || oppgave.prioritet === prioritet.toString()) &&
                        (!frist || oppgave.fristFerdigstillelse === frist) &&
                        (!registrertDato ||
                            oppgave.opprettetTidspunkt.substring(0, 10) === registrertDato) &&
                        (!saksbehandler ||
                            saksbehandler === Object.keys(SaksbehandlerFilter)[0] ||
                            (saksbehandler === Object.keys(SaksbehandlerFilter)[1] &&
                                !oppgave.tilordnetRessurs) ||
                            saksbehandler === oppgave.tilordnetRessurs)
                ),
            });
        }
    };

    return { oppgaver, hentOppgaver, filterOppgaver };
});

export { OppgaverProvider, useOppgaver };
