import { AxiosError } from 'axios';
import createUseContext from 'constate';
import React from 'react';

import {
    IOppgave,
    SaksbehandlerFilter,
    IDataForManuellJournalføring,
    OppgavetypeFilter,
} from '../typer/oppgave';
import { byggFeiletRessurs, byggTomRessurs, Ressurs, RessursStatus } from '../typer/ressurs';
import { useApp } from './AppContext';
import { useHistory } from 'react-router';
import useFagsakApi from '../komponenter/Fagsak/useFagsakApi';

const [OppgaverProvider, useOppgaver] = createUseContext(() => {
    const [dataForManuellJournalføring, settDataForManuellJournalføring] = React.useState(
        byggTomRessurs<IDataForManuellJournalføring>()
    );
    const history = useHistory();
    const [oppgaver, settOppgaver] = React.useState<Ressurs<IOppgave[]>>(
        byggTomRessurs<IOppgave[]>()
    );

    const { opprettEllerHentFagsak } = useFagsakApi(
        _ => {
            'Feilmelding';
        },
        _ => {
            'Feilmelding';
        }
    );
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

    const hentOppgaver = (
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
        hentOppgaverFraBackend(behandlingstema, oppgavetype, enhet, saksbehandlerForBackend).then(
            (oppgaverRessurs: Ressurs<IOppgave[]>) => {
                if (oppgaverRessurs.status === RessursStatus.SUKSESS) {
                    const filteredOppgaver = filterOppgaver(
                        oppgaverRessurs,
                        prioritet,
                        frist,
                        registrertDato,
                        saksbehandler
                    );
                    settOppgaver(filteredOppgaver);
                    return filteredOppgaver;
                }
            }
        );
    };

    const fordelOppgave = (oppgave: IOppgave, saksbehandler: string) => {
        return axiosRequest<string, void>({
            method: 'POST',
            url: `/familie-ba-sak/api/oppgave/${oppgave.id}/fordel?saksbehandler=${saksbehandler}`,
        })
            .then((oppgaverRes: Ressurs<string>) => {
                if (
                    OppgavetypeFilter[oppgave.oppgavetype as keyof typeof OppgavetypeFilter] ===
                    OppgavetypeFilter.JFR
                ) {
                    history.push(`/oppgaver/journalfør/${oppgave.id}`);
                } else {
                    opprettEllerHentFagsak({
                        personIdent: null,
                        aktørId: oppgave.aktoerId,
                    });
                }
                return oppgaverRes;
            })
            .catch((error: AxiosError) => {
                return byggFeiletRessurs('Ukjent feil ved fordeling av oppgave', error);
            });
    };

    const tilbakestillFordelingPåOppgave = (oppgave: IOppgave) => {
        return axiosRequest<string, void>({
            method: 'POST',
            url: `/familie-ba-sak/api/oppgave/${oppgave.id}/tilbakestill`,
        })
            .then((oppgaverRes: Ressurs<string>) => {
                return oppgaverRes;
            })
            .catch((error: AxiosError) => {
                return byggFeiletRessurs(
                    'Ukjent feil ved tilbakestilling av fordeling på oppgave',
                    error
                );
            });
    };

    const hentOppgaverFraBackend = (
        behandlingstema?: string,
        oppgavetype?: string,
        enhet?: string,
        saksbehandler?: string
    ): Promise<Ressurs<IOppgave[]>> => {
        interface LooseObject {
            [key: string]: string;
        }
        const searchParams: LooseObject = {};

        if (behandlingstema !== undefined) {
            searchParams['behandlingstema'] = behandlingstema;
        }

        if (oppgavetype !== undefined) {
            searchParams['oppgavetype'] = oppgavetype;
        }

        if (enhet !== undefined) {
            searchParams['enhet'] = enhet;
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

    const filterOppgaver = (
        oppgaverRes: Ressurs<IOppgave[]>,
        prioritet?: string,
        frist?: string,
        registrertDato?: string,
        saksbehandler?: string
    ): Ressurs<IOppgave[]> => {
        if (oppgaverRes.status === RessursStatus.SUKSESS) {
            return {
                status: RessursStatus.SUKSESS,
                data: oppgaverRes.data.filter(
                    oppgave =>
                        // if "prioritet" parameter is set, only accept the oppgave with the same prioritet value
                        (!prioritet || oppgave.prioritet === prioritet.toString()) &&
                        // if "frist" parameter is set, only accept the oppgave with the same frist value
                        (!frist || oppgave.fristFerdigstillelse === frist) &&
                        // if "registrertDato" parameter is set, only accept the oppgave with the same opprettetTidspunkt,
                        // because the opprettetTidspunkt field of oppgave is in a complete time format like YYYY-MM-DD HH:MM:SS
                        // we have to take the first part of the field by substring()
                        (!registrertDato ||
                            oppgave.opprettetTidspunkt.substring(0, 10) === registrertDato) &&
                        // if "saksbehandler" parameter is set, we need to check the tilordnedRessurs of oppgave
                        (!saksbehandler ||
                            // if "saksbehandler" is set to 'Alle', all oppgave will be accepted
                            saksbehandler === Object.keys(SaksbehandlerFilter)[0] ||
                            // if "saksbehandler" is set to 'AlleUfordelte', all oppgave without tilordnedRessurs will be accepted
                            (saksbehandler === Object.keys(SaksbehandlerFilter)[1] &&
                                !oppgave.tilordnetRessurs) ||
                            // if "saksbehandler" is set to other values, only oppgave with tilordnedRessurs === saksbehandler will be accepted
                            saksbehandler === oppgave.tilordnetRessurs)
                ),
            };
        } else {
            return oppgaverRes;
        }
    };

    return {
        dataForManuellJournalføring,
        oppgaver,
        hentDataForManuellJournalføring,
        hentOppgaver,
        fordelOppgave,
        tilbakestillFordelingPåOppgave,
    };
});

export { OppgaverProvider, useOppgaver };
