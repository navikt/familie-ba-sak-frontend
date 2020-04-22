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
        hentOppgaverFraBackend(behandlingstema, oppgavetype, enhet, saksbehandler).then(
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

    const hentOppgaverFraBackend = (
        behandlingstema?: string,
        oppgavetype?: string,
        enhet?: string,
        saksbehandler?: string
    ): Promise<Ressurs<IOppgave[]>> => {
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
    };
});

export { OppgaverProvider, useOppgaver };
