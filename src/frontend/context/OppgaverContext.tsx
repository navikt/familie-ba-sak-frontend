import { AxiosError } from 'axios';
import createUseContext from 'constate';
import React from 'react';

import { IOppgave, SaksbehandlerFilter, IDataForManuellJournalføring } from '../typer/oppgave';
import { byggFeiletRessurs, byggTomRessurs, Ressurs, RessursStatus } from '../typer/ressurs';
import { useApp } from './AppContext';
import moment from 'moment';

export const oppgaveSideLimit = 15;

export const maksAntallOppgaver = 150;

const [OppgaverProvider, useOppgaver] = createUseContext(() => {
    const [dataForManuellJournalføring, settDataForManuellJournalføring] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );
    const [oppgaver, settOppgaver] = React.useState<Ressurs<IOppgave[]>>(
        byggTomRessurs<IOppgave[]>()
    );

    const [sideindeks, settSideindeks] = React.useState(-1);

    const { axiosRequest } = useApp();

    //Stable sort algorithm makes sorting by multiple fields easier. However,
    //Javascript does not specify the sort algorithm. To make sure the sort algorithm implemented
    //by browsers are stable, we have to wrap it with the function below.
    const sortOppgave = (felt: string, ascendant: boolean) => {
        if (oppgaver.status !== RessursStatus.SUKSESS) {
            return;
        }

        type OppgaveMedIndeks = {
            oppgave: IOppgave;
            indeks: number;
        };

        const oppgaveMedIndeks: OppgaveMedIndeks[] = oppgaver.data.map((v, i) => {
            return {
                oppgave: v,
                indeks: i,
            };
        });

        const compareTid = (a: string, b: string) => {
            if (a.substring(0, 10) === b.substring(0, 10)) {
                return 0;
            }

            const aValid = moment(a.substring(0, 10), 'YYYY-MM-DD', true).isValid();
            const bValid = moment(b.substring(0, 10), 'YYYY-MM-DD', true).isValid();

            if (!aValid && !bValid) {
                return 0;
            }

            if (!aValid) {
                return ascendant ? 1 : -1;
            }

            if (!bValid) {
                return ascendant ? -1 : 1;
            }

            const aBefore = ascendant ? -1 : 1;
            const aAfter = ascendant ? 1 : -1;
            return moment(a.substring(0, 10), 'YYYY-MM-DD').isBefore(
                moment(b.substring(0, 10), 'YYYY-MM-DD')
            )
                ? aBefore
                : aAfter;
        };

        const compareOppgave = (a: IOppgave, b: IOppgave) => {
            if (felt === 'opprettetTidspunkt' || felt === 'fristFerdigstillelse') {
                return compareTid(a[felt], b[felt]);
            }

            if (!a[felt] && !b[felt]) {
                return 0;
            }

            if (!a[felt]) {
                return ascendant ? 1 : -1;
            }

            if (!b[felt]) {
                return ascendant ? -1 : 1;
            }

            if (a[felt] === b[felt]) {
                return 0;
            }
            return ascendant ? a[felt].localeCompare(b[felt]) : b[felt].localeCompare(a[felt]);
        };

        const stablizedCompareOppgave = (a: OppgaveMedIndeks, b: OppgaveMedIndeks) => {
            const result = compareOppgave(a.oppgave, b.oppgave);
            return result !== 0 ? result : a.indeks - b.indeks;
        };

        const sortedMedIndeks = oppgaveMedIndeks.sort(stablizedCompareOppgave);

        settOppgaver({
            status: oppgaver.status,
            data: sortedMedIndeks.map(
                (oppgaveMedIndeks: OppgaveMedIndeks) => oppgaveMedIndeks.oppgave
            ),
        });

        settSideindeks(sortedMedIndeks.length > 0 ? 0 : -1);
    };

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
            ? Math.floor((oppgaver.data.length - 1) / oppgaveSideLimit) + 1
            : 0;

    const nesteSide = () => sideindeks < hentSidetall() - 1 && settSideindeks(sideindeks + 1);

    const forrigeSide = () => sideindeks > 0 && settSideindeks(sideindeks - 1);

    const hentOppgaveSide = () =>
        oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.length > 0
            ? oppgaver.data.slice(
                  sideindeks * oppgaveSideLimit,
                  Math.min((sideindeks + 1) * oppgaveSideLimit, oppgaver.data.length)
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
        sortOppgave,
        sideindeks,
        nesteSide,
        forrigeSide,
        hentSidetall,
        hentOppgaveSide,
    };
});

export { OppgaverProvider, useOppgaver };
