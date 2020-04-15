import { AxiosError } from 'axios';
import createUseContext from 'constate';
import React from 'react';

import { IOppgave, GjelderFilter, EnhetsmappeFilter, PrioritetFilter } from '../typer/oppgave';
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
        behandlingstema && params.push(`behandlingstema=${behandlingstema}`);
        oppgavetype && params.push(`oppgavetype=${oppgavetype}`);
        enhet && params.push(`enhet=${enhet}`);
        saksbehandler && params.push(`saksbehandler=${saksbehandler}`);

        let query = params.length > 0 ? '?' : '';

        params.forEach((p, i) => {
            query += i == 0 ? '' : '&';
            query += p;
        });

        settOppgaver({
            ...oppgaver,
            status: RessursStatus.HENTER,
        });

        return axiosRequest<IOppgave[], void>({
            method: 'GET',
            url: `/familie-ba-sak/api/oppgaver${query}`,
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
        enhetsmappe?: string,
        frist?: string,
        registertDato?: string
    ) => {
        if (oppgaverRes.status === RessursStatus.SUKSESS) {
            console.log(
                oppgaverRes.data.filter(
                    oppgave =>
                        (!prioritet || oppgave.prioritet === prioritet.toString()) &&
                        (!frist || oppgave.fristFerdigstillelse === frist) &&
                        (!registertDato || oppgave.opprettetTidspunkt === registertDato)
                )
            );
        }
        oppgaverRes.status === RessursStatus.SUKSESS &&
            settOppgaver({
                status: RessursStatus.SUKSESS,
                data: oppgaverRes.data.filter(
                    oppgave =>
                        (!prioritet || oppgave.prioritet === prioritet.toString()) &&
                        (!frist || oppgave.fristFerdigstillelse === frist) &&
                        (!registertDato ||
                            oppgave.opprettetTidspunkt.substring(0, 10) === registertDato)
                ),
            });
    };

    const sortOppgaver = () => {};

    return { oppgaver, hentOppgaver, filterOppgaver, sortOppgaver };
});

export { OppgaverProvider, useOppgaver };
