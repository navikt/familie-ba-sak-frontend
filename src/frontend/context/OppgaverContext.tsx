import { AxiosError } from 'axios';
import createUseContext from 'constate';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';
import useFagsakApi from '../komponenter/Fagsak/useFagsakApi';
import VisOppgaver from '../komponenter/Oppgaver/VisOppgaver';
import {
    IFinnOppgaveRequest,
    IHentOppgaveDto,
    IOppgave,
    OppgavetypeFilter,
    SaksbehandlerFilter,
} from '../typer/oppgave';
import { byggFeiletRessurs, byggTomRessurs, Ressurs, RessursStatus } from '../typer/ressurs';
import { useApp } from './AppContext';

export const oppgaveSideLimit = 15;

export const maksAntallOppgaver = 150;

const [OppgaverProvider, useOppgaver] = createUseContext(() => {
    const history = useHistory();
    const [oppgaver, settOppgaver] = React.useState<Ressurs<IHentOppgaveDto>>(
        byggTomRessurs<IHentOppgaveDto>()
    );

    const { opprettEllerHentFagsak } = useFagsakApi(
        _ => {
            'Feilmelding';
        },
        _ => {
            'Feilmelding';
        }
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

        const oppgaveMedIndeks: OppgaveMedIndeks[] = oppgaver.data.oppgaver.map((v, i) => {
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
            data: {
                ...oppgaver.data,
                oppgaver: sortedMedIndeks.map(
                    (oppgaveMedIndeks: OppgaveMedIndeks) => oppgaveMedIndeks.oppgave
                ),
            },
        });

        settSideindeks(sortedMedIndeks.length > 0 ? 0 : -1);
    };

    const hentSidetall = () =>
        oppgaver.status === RessursStatus.SUKSESS
            ? Math.floor((oppgaver.data.oppgaver.length - 1) / oppgaveSideLimit) + 1
            : 0;

    const nesteSide = () => sideindeks < hentSidetall() - 1 && settSideindeks(sideindeks + 1);

    const forrigeSide = () => sideindeks > 0 && settSideindeks(sideindeks - 1);

    const hentOppgaveSide = () =>
        oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.oppgaver.length > 0
            ? oppgaver.data.oppgaver.slice(
                  sideindeks * oppgaveSideLimit,
                  Math.min((sideindeks + 1) * oppgaveSideLimit, oppgaver.data.oppgaver.length)
              )
            : [];

    const hentOppgaver = (
        limit?: number,
        behandlingstema?: string,
        oppgavetype?: string,
        enhet?: string,
        frist?: string,
        registrertDato?: string,
        saksbehandler?: string
    ) => {
        settOppgaver({
            ...oppgaver,
            status: RessursStatus.HENTER,
        });

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
            frist,
            registrertDato,
            saksbehandlerForBackend
        ).then((oppgaverRessurs: Ressurs<IHentOppgaveDto>) => {
            settOppgaver(oppgaverRessurs);
            settSideindeks(
                oppgaverRessurs.status === RessursStatus.SUKSESS &&
                    oppgaverRessurs.data.oppgaver.length > 0
                    ? 0
                    : -1
            );
            return oppgaverRessurs;
        });
    };

    const fordelOppgave = (oppgave: IOppgave, saksbehandler: string): Promise<Ressurs<string>> => {
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
            .catch((_error: AxiosError) => {
                return byggFeiletRessurs<string>('Ukjent feil ved fordeling av oppgave');
            });
    };

    const tilbakestillFordelingPåOppgave = (oppgave: IOppgave): Promise<Ressurs<string>> => {
        return axiosRequest<string, void>({
            method: 'POST',
            url: `/familie-ba-sak/api/oppgave/${oppgave.id}/tilbakestill`,
        })
            .then((oppgaverRes: Ressurs<string>) => {
                return oppgaverRes;
            })
            .catch((_error: AxiosError) => {
                return byggFeiletRessurs<string>('Ukjent feil ved tilbakestilling av oppgave');
            });
    };

    const hentOppgaverFraBackend = (
        limit?: number,
        behandlingstema?: string,
        oppgavetype?: string,
        enhet?: string,
        frist?: string,
        registrertDato?: string,
        saksbehandler?: string
    ): Promise<Ressurs<IHentOppgaveDto>> => {
        const finnOppgaveRequest: IFinnOppgaveRequest = {
            behandlingstema: behandlingstema,
            oppgavetype: oppgavetype,
            enhet: enhet,
            saksbehandler: saksbehandler,
            journalpostId: undefined,
            opprettetFomTidspunkt: registrertDato ? `${registrertDato}T00:00:00.000` : undefined,
            opprettetTomTidspunkt: registrertDato ? `${registrertDato}T23:59:59.999` : undefined,
            fristFomDato: frist,
            fristTomDato: frist,
            aktivFomDato: undefined,
            aktivTomDato: undefined,
            limit: limit,
            offset: 0,
        };

        return axiosRequest<IHentOppgaveDto, IFinnOppgaveRequest>({
            data: finnOppgaveRequest,
            method: 'POST',
            url: `/familie-ba-sak/api/oppgave/hent-oppgaver`,
        })
            .then((oppgaverRes: Ressurs<IHentOppgaveDto>) => {
                return oppgaverRes;
            })
            .catch((_error: AxiosError) => {
                return byggFeiletRessurs('Ukjent ved innhenting av oppgaver');
            });
    };

    return {
        oppgaver,
        hentOppgaver,
        sortOppgave,
        sideindeks,
        nesteSide,
        forrigeSide,
        hentSidetall,
        hentOppgaveSide,
        fordelOppgave,
        tilbakestillFordelingPåOppgave,
    };
});

const Oppgaver: React.FC = () => {
    return (
        <OppgaverProvider>
            <VisOppgaver />
        </OppgaverProvider>
    );
};

export { Oppgaver, useOppgaver };
