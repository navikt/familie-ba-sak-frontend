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
    const [oppgaver, settOppgaver] = React.useState<Ressurs<IOppgave[]>>(
        byggTomRessurs<IOppgave[]>()
    );

    const [sideindeks, settSideindeks] = React.useState(-1);

    const sideLimit = 15;

    const { axiosRequest } = useApp();

    const hentDataForManuellJournalføring = (oppgaveId: string) => {
        axiosRequest<IDataForManuellJournalføring, void>({
            method: 'GET',
            url: `/familie-ba-sak/api/oppgave/${oppgaveId}`,
        })
            .then((hentetDataForManuellJournalføring: Ressurs<IDataForManuellJournalføring>) => {
                settDataForManuellJournalføring(hentetDataForManuellJournalføring);
            })
            .catch((error: AxiosError) => {
                settOppgaver(byggFeiletRessurs('Ukjent feil ved henting av oppgave', error));
            });
    };

    const hentSidetall = () =>
        oppgaver.status === RessursStatus.SUKSESS
            ? Math.floor((oppgaver.data.length - 1) / sideLimit) + 1
            : 0;

    const nesteSide = () => sideindeks < hentSidetall() - 1 && settSideindeks(sideindeks + 1);

    const forrigeSide = () => sideindeks > 0 && settSideindeks(sideindeks - 1);

    const hentOppgaveSide = () =>
        oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.length > 0
            ? oppgaver.data.slice(
                  sideindeks * sideLimit,
                  Math.min((sideindeks + 1) * sideLimit, oppgaver.data.length)
              )
            : [];

    const hentOppgaver = (
        limit?: number,
        behandlingstema?: string,
        oppgavetype?: string,
        enhet?: string,
        prioritet?: string,
        frist?: string,
        registrertDato?: string,
        saksbehandler?: string
    ) => {
        const saksbehandlerForBackend =
            saksbehandler !== Object.keys(SaksbehandlerFilter)[0] &&
            saksbehandler !== Object.keys(SaksbehandlerFilter)[1]
                ? saksbehandler
                : undefined;
        hentOppgaverFraBackend(
            limit,
            behandlingstema,
            oppgavetype,
            enhet,
            prioritet,
            frist,
            registrertDato,
            saksbehandlerForBackend
        ).then((oppgaverRessurs: Ressurs<IOppgave[]>) => {
            settOppgaver(oppgaverRessurs);
            if (oppgaverRessurs.status === RessursStatus.SUKSESS) {
                settSideindeks(oppgaverRessurs.data.length > 0 ? 0 : -1);
            }
            return oppgaverRessurs;
        });
    };

    const hentOppgaverFraBackend = (
        limit?: number,
        behandlingstema?: string,
        oppgavetype?: string,
        enhet?: string,
        prioritet?: string,
        frist?: string,
        registrertDato?: string,
        saksbehandler?: string
    ): Promise<Ressurs<IOppgave[]>> => {
        interface LooseObject {
            [key: string]: string;
        }
        const searchParams: LooseObject = {};

        if (limit !== undefined) {
            searchParams['limit'] = limit.toString();
        }

        if (behandlingstema !== undefined) {
            searchParams['behandlingstema'] = behandlingstema;
        }

        if (oppgavetype !== undefined) {
            searchParams['oppgavetype'] = oppgavetype;
        }

        if (enhet !== undefined) {
            searchParams['enhet'] = enhet;
        }

        if (prioritet !== undefined) {
            searchParams['prioritet'] = prioritet;
        }

        if (registrertDato !== undefined) {
            searchParams['registrertDato'] = registrertDato;
        }

        if (frist !== undefined) {
            searchParams['frist'] = frist;
        }

        if (saksbehandler !== undefined) {
            searchParams['saksbehandler'] = saksbehandler;
        }

        let query = new URLSearchParams(searchParams).toString();
        query = query === '' ? query : '?' + query;

        settOppgaver({
            ...oppgaver,
            status: RessursStatus.HENTER,
        });

        return axiosRequest<IOppgave[], void>({
            method: 'GET',
            url: `/familie-ba-sak/api/oppgave${query}`,
        })
            .then((oppgaverRes: Ressurs<IOppgave[]>) => {
                console.log(oppgaverRes);
                return oppgaverRes;
            })
            .catch((error: AxiosError) => {
                return byggFeiletRessurs('Ukjent ved innhenting av oppgaver', error);
            });
    };

    return {
        dataForManuellJournalføring,
        oppgaver,
        hentDataForManuellJournalføring,
        hentOppgaver,
        sideLimit,
        sideindeks,
        nesteSide,
        forrigeSide,
        hentSidetall,
        hentOppgaveSide,
    };
});

export { OppgaverProvider, useOppgaver };
