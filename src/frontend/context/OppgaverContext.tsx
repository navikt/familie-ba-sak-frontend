import React, { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import createUseContext from 'constate';
import { useHistory } from 'react-router';

import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import useFagsakApi from '../komponenter/Fagsak/useFagsakApi';
import Oppgavebenk from '../komponenter/Oppgavebenk/Oppgavebenk';
import {
    FeltSortOrder,
    initialOppgaveFelter,
    IOppgaveFelt,
    IOppgaveFelter,
} from '../komponenter/Oppgavebenk/oppgavefelter';
import {
    IFinnOppgaveRequest,
    IHentOppgaveDto,
    IOppgave,
    OppgavetypeFilter,
    SaksbehandlerFilter,
} from '../typer/oppgave';
import familieDayjs from '../utils/familieDayjs';
import { useApp } from './AppContext';

export const oppgaveSideLimit = 15;

export const maksAntallOppgaver = 150;

const [OppgaverProvider, useOppgaver] = createUseContext(() => {
    const history = useHistory();
    const { axiosRequest, innloggetSaksbehandler } = useApp();

    const [hentOppgaverVedSidelast, settHentOppgaverVedSidelast] = useState(true);
    const [oppgaver, settOppgaver] = React.useState<Ressurs<IHentOppgaveDto>>(
        byggTomRessurs<IHentOppgaveDto>()
    );
    const [oppgaveFelter, settOppgaveFelter] = useState<IOppgaveFelter>(
        initialOppgaveFelter(innloggetSaksbehandler, history.location.search)
    );

    useEffect(() => {
        settOppgaveFelter(initialOppgaveFelter(innloggetSaksbehandler, history.location.search));
    }, [innloggetSaksbehandler]);

    useEffect(() => {
        if (hentOppgaverVedSidelast && innloggetSaksbehandler) {
            if (
                Object.values(oppgaveFelter).filter(
                    (oppgaveFelt: IOppgaveFelt) =>
                        oppgaveFelt.filter?.initialValue !== oppgaveFelt.filter?.selectedValue
                ).length > 0
            ) {
                hentOppgaver();
            }
            settHentOppgaverVedSidelast(false);
        }
    }, [oppgaveFelter]);

    const hentOppgaveFelt = (nøkkel: string) => {
        return oppgaveFelter[nøkkel];
    };

    const oppdaterOppgave = (oppdatertOppgave: IOppgave) => {
        if (oppgaver.status === RessursStatus.SUKSESS) {
            const nyOppgaveliste = oppgaver.data.oppgaver.map(oppgave => {
                if (oppdatertOppgave.id === oppgave.id) {
                    return oppdatertOppgave;
                } else {
                    return oppgave;
                }
            });
            settOppgaver({
                status: oppgaver.status,
                data: {
                    ...oppgaver.data,
                    oppgaver: nyOppgaveliste,
                },
            });
        }
    };

    const settVerdiPåOppgaveFelt = (oppgaveFelt: IOppgaveFelt, nyVerdi: string) => {
        if (oppgaveFelt.filter) {
            const oppdaterteOppgaveFelter = {
                ...oppgaveFelter,
                [oppgaveFelt.nøkkel]: {
                    ...oppgaveFelt,
                    filter: {
                        ...oppgaveFelt.filter,
                        selectedValue: nyVerdi,
                    },
                },
            };
            settOppgaveFelter(oppdaterteOppgaveFelter);

            history.push({
                search: Object.values(oppdaterteOppgaveFelter)
                    .filter(
                        (mapOppgaveFelt: IOppgaveFelt) =>
                            mapOppgaveFelt.filter?.selectedValue !==
                            mapOppgaveFelt.filter?.initialValue
                    )
                    .map((mapOppgaveFelt: IOppgaveFelt) => {
                        return `${mapOppgaveFelt.nøkkel}=${mapOppgaveFelt?.filter?.selectedValue}`;
                    })
                    .join('&'),
            });
        }
    };

    const tilbakestillSortOrder = () => {
        let midlertidigOppgaveFelter = oppgaveFelter;
        Object.values(oppgaveFelter).forEach((oppgaveFelt: IOppgaveFelt) => {
            midlertidigOppgaveFelter = {
                ...midlertidigOppgaveFelter,
                [oppgaveFelt.nøkkel]: {
                    ...oppgaveFelt,
                    order: FeltSortOrder.NONE,
                },
            };
            settOppgaveFelter(midlertidigOppgaveFelter);
        });
    };

    const settSortOrderPåOppgaveFelt = (felt: string) => {
        let midlertidigOppgaveFelter = oppgaveFelter;
        Object.values(oppgaveFelter).forEach((oppgaveFelt: IOppgaveFelt) => {
            if (oppgaveFelt.nøkkel === felt) {
                midlertidigOppgaveFelter = {
                    ...midlertidigOppgaveFelter,
                    [oppgaveFelt.nøkkel]: {
                        ...oppgaveFelt,
                        order:
                            oppgaveFelt.order === FeltSortOrder.ASCENDANT
                                ? FeltSortOrder.DESCENDANT
                                : FeltSortOrder.ASCENDANT,
                    },
                };
            } else if (oppgaveFelt.order && oppgaveFelt.order !== FeltSortOrder.NONE) {
                midlertidigOppgaveFelter = {
                    ...midlertidigOppgaveFelter,
                    [oppgaveFelt.nøkkel]: {
                        ...oppgaveFelt,
                        order: FeltSortOrder.NONE,
                    },
                };
            }
            settOppgaveFelter(midlertidigOppgaveFelter);
        });
    };

    const tilbakestillOppgaveFelter = () => {
        settOppgaveFelter(initialOppgaveFelter(innloggetSaksbehandler));
    };

    const { opprettEllerHentFagsak } = useFagsakApi(
        _ => {
            'Feilmelding';
        },
        _ => {
            'Feilmelding';
        }
    );

    const [sideindeks, settSideindeks] = React.useState(-1);

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

            const aValid = familieDayjs(a.substring(0, 10), 'YYYY-MM-DD').isValid();
            const bValid = familieDayjs(b.substring(0, 10), 'YYYY-MM-DD').isValid();

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
            return familieDayjs(a.substring(0, 10), 'YYYY-MM-DD').isBefore(
                familieDayjs(b.substring(0, 10), 'YYYY-MM-DD')
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

        settSortOrderPåOppgaveFelt(felt);
    };

    const settSide = (side: number) => settSideindeks(side);

    const hentOppgaveSide = () =>
        oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.oppgaver.length > 0
            ? oppgaver.data.oppgaver.slice(
                  sideindeks * oppgaveSideLimit,
                  Math.min((sideindeks + 1) * oppgaveSideLimit, oppgaver.data.oppgaver.length)
              )
            : [];

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
                    if (oppgave.aktoerId)
                        opprettEllerHentFagsak({
                            personIdent: null,
                            aktørId: oppgave.aktoerId,
                        });
                    else byggFeiletRessurs('Oppgave mangler aktørid');
                }
                return oppgaverRes;
            })
            .catch((_error: AxiosError) => {
                return byggFeiletRessurs<string>('Ukjent feil ved fordeling av oppgave');
            });
    };

    const tilbakestillFordelingPåOppgave = (oppgave: IOppgave): Promise<Ressurs<IOppgave>> => {
        return axiosRequest<IOppgave, string>({
            method: 'POST',
            url: `/familie-ba-sak/api/oppgave/${oppgave.id}/tilbakestill`,
        })
            .then((oppgaverRes: Ressurs<IOppgave>) => {
                oppgaverRes.status === RessursStatus.SUKSESS && oppdaterOppgave(oppgaverRes.data);
                return oppgaverRes;
            })
            .catch((_error: AxiosError) => {
                return byggFeiletRessurs('Ukjent feil ved tilbakestilling av oppgave');
            });
    };

    const hentOppgaver = () => {
        settOppgaver(byggHenterRessurs());
        tilbakestillSortOrder();

        const saksbehandlerFilter = hentOppgaveFelt('tilordnetRessurs').filter?.selectedValue;
        let tildeltRessurs;
        switch (saksbehandlerFilter) {
            case SaksbehandlerFilter.FORDELTE:
                tildeltRessurs = true;
                break;
            case SaksbehandlerFilter.UFORDELTE:
                tildeltRessurs = false;
                break;
            default:
                tildeltRessurs = undefined;
        }

        hentOppgaverFraBackend(
            hentOppgaveFelt('behandlingstema').filter?.selectedValue,
            hentOppgaveFelt('oppgavetype').filter?.selectedValue,
            hentOppgaveFelt('tildeltEnhetsnr').filter?.selectedValue,
            hentOppgaveFelt('fristFerdigstillelse').filter?.selectedValue,
            hentOppgaveFelt('opprettetTidspunkt').filter?.selectedValue,
            saksbehandlerFilter === SaksbehandlerFilter.INNLOGGET
                ? innloggetSaksbehandler?.navIdent
                : undefined,
            tildeltRessurs
        ).then((oppgaverRessurs: Ressurs<IHentOppgaveDto>) => {
            settOppgaver(oppgaverRessurs);
            settSideindeks(
                oppgaverRessurs.status === RessursStatus.SUKSESS &&
                    oppgaverRessurs.data.oppgaver.length > 0
                    ? 0
                    : -1
            );
        });
    };

    const hentOppgaverFraBackend = (
        behandlingstema?: string,
        oppgavetype?: string,
        enhet?: string,
        frist?: string,
        registrertDato?: string,
        tilordnetRessurs?: string,
        tildeltRessurs?: boolean
    ): Promise<Ressurs<IHentOppgaveDto>> => {
        const erstattAlleMedUndefined = (filter: string | undefined) =>
            filter === 'ALLE' ? undefined : filter;

        const finnOppgaveRequest: IFinnOppgaveRequest = {
            behandlingstema: erstattAlleMedUndefined(behandlingstema),
            oppgavetype: erstattAlleMedUndefined(oppgavetype),
            enhet: erstattAlleMedUndefined(enhet)?.replace('E', ''),
            tilordnetRessurs,
            tildeltRessurs,
            opprettetFomTidspunkt:
                registrertDato && registrertDato !== ''
                    ? `${registrertDato}T00:00:00.000`
                    : undefined,
            opprettetTomTidspunkt:
                registrertDato && registrertDato !== ''
                    ? `${registrertDato}T23:59:59.999`
                    : undefined,
            fristFomDato: frist && frist !== '' ? frist : undefined,
            fristTomDato: frist && frist !== '' ? frist : undefined,
            limit: maksAntallOppgaver,
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
        fordelOppgave,
        hentOppgaveSide,
        hentOppgaver,
        oppgaveFelter,
        oppgaver,
        settSide,
        settSortOrderPåOppgaveFelt,
        settVerdiPåOppgaveFelt,
        sideindeks,
        sortOppgave,
        tilbakestillFordelingPåOppgave,
        tilbakestillOppgaveFelter,
    };
});
const Oppgaver: React.FC = () => {
    return (
        <OppgaverProvider>
            <Oppgavebenk />
        </OppgaverProvider>
    );
};

export { Oppgaver, useOppgaver };
