import { AxiosError } from 'axios';
import createUseContext from 'constate';
import React from 'react';

import { IOppgave, SaksbehandlerFilter, IDataForManuellJournalføring } from '../typer/oppgave';
import { byggFeiletRessurs, byggTomRessurs, Ressurs, RessursStatus } from '../typer/ressurs';
import { useApp } from './AppContext';

const [OppgaverProvider, useOppgaver] = createUseContext(() => {
    const [dataForManuellJournalføring, settDataForManuellJournalføring] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );
    const [oppgaver, settOppgaver] = React.useState(byggTomRessurs<IOppgave[]>());
    const { axiosRequest } = useApp();

    const hentDataForManuellJournalføring = (oppgaveId: string) => {
        axiosRequest<IDataForManuellJournalføring, void>({
            method: 'GET',
            url: `/familie-ba-sak/api/oppgave/${oppgaveId}`,
        })
            .then((dataForManuellJournalføring: Ressurs<IDataForManuellJournalføring>) => {
                settDataForManuellJournalføring(dataForManuellJournalføring);
            })
            .catch((error: AxiosError) => {
                settOppgaver(byggFeiletRessurs('Ukjent feil ved henting av oppgave', error));
            });
    };

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
        enhetsmappe?: string,
        frist?: string,
        registertDato?: string,
        saksbehandler?: string
    ) => {
        oppgaverRes.status === RessursStatus.SUKSESS &&
            settOppgaver({
                status: RessursStatus.SUKSESS,
                data: oppgaverRes.data.filter(
                    oppgave =>
                        (!prioritet || oppgave.prioritet === prioritet.toString()) &&
                        (!frist || oppgave.fristFerdigstillelse === frist) &&
                        (!registertDato ||
                            oppgave.opprettetTidspunkt.substring(0, 10) === registertDato) &&
                        (!saksbehandler ||
                            saksbehandler === Object.keys(SaksbehandlerFilter)[0] ||
                            (saksbehandler === Object.keys(SaksbehandlerFilter)[1] &&
                                !oppgave.tilordnetRessurs) ||
                            saksbehandler === oppgave.tilordnetRessurs)
                ),
            });
    };

    const sortOppgaver = () => {};

    return {
        dataForManuellJournalføring,
        oppgaver,
        hentDataForManuellJournalføring,
        hentOppgaver,
        filterOppgaver,
        sortOppgaver,
    };
});

export { OppgaverProvider, useOppgaver };
