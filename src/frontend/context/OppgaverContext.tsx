import React, { useEffect, useMemo, useState } from 'react';

import type { AxiosError } from 'axios';
import createUseContext from 'constate';
import { useNavigate } from 'react-router-dom';
import type {
    Column,
    TableInstance,
    UsePaginationInstanceProps,
    UseSortByInstanceProps,
} from 'react-table';
import { usePagination, useSortBy, useTable } from 'react-table';

import { useHttp } from '@navikt/familie-http';
import { Valideringsstatus } from '@navikt/familie-skjema';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import useFagsakApi from '../komponenter/Fagsak/useFagsakApi';
import { AlertType, ToastTyper } from '../komponenter/Felleskomponenter/Toast/typer';
import Oppgavebenk from '../komponenter/Oppgavebenk/Oppgavebenk';
import type { IOppgaveFelt, IOppgaveFelter } from '../komponenter/Oppgavebenk/oppgavefelter';
import { FeltSortOrder, initialOppgaveFelter } from '../komponenter/Oppgavebenk/oppgavefelter';
import type { IMinimalFagsak } from '../typer/fagsak';
import type { IFinnOppgaveRequest, IHentOppgaveDto, IOppgave } from '../typer/oppgave';
import {
    BehandlingstypeFilter,
    EnhetFilter,
    OppgavetypeFilter,
    SaksbehandlerFilter,
} from '../typer/oppgave';
import { erIsoStringGyldig } from '../utils/kalender';
import { hentFnrFraOppgaveIdenter } from '../utils/oppgave';
import { hentFrontendFeilmelding } from '../utils/ressursUtils';
import { useApp } from './AppContext';
import type { IOppgaveRad } from './OppgaverContextUtils';
import { kolonner, mapIOppgaverTilOppgaveRad } from './OppgaverContextUtils';

export const oppgaveSideLimit = 15;

export const maksAntallOppgaver = 150;

const [OppgaverProvider, useOppgaver] = createUseContext(() => {
    const navigate = useNavigate();
    const { innloggetSaksbehandler, settToast } = useApp();
    const { request } = useHttp();

    const [hentOppgaverVedSidelast, settHentOppgaverVedSidelast] = useState(true);

    const [oppgaver, settOppgaver] = React.useState<Ressurs<IHentOppgaveDto>>(
        byggTomRessurs<IHentOppgaveDto>()
    );

    const [oppgaveFelter, settOppgaveFelter] = useState<IOppgaveFelter>(
        initialOppgaveFelter(innloggetSaksbehandler)
    );

    const columns: ReadonlyArray<Column<IOppgaveRad>> = useMemo(() => kolonner, []);
    const data: ReadonlyArray<IOppgaveRad> = useMemo(() => {
        return oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.oppgaver.length > 0
            ? mapIOppgaverTilOppgaveRad(oppgaver.data.oppgaver, innloggetSaksbehandler)
            : [];
    }, [oppgaver]);

    const tableInstance: TableInstance<IOppgaveRad> &
        UseSortByInstanceProps<IOppgaveRad> &
        UsePaginationInstanceProps<IOppgaveRad> = useTable<IOppgaveRad>(
        {
            columns,
            data,
            initialState: {
                pageSize: oppgaveSideLimit,
                pageIndex: 0,
            },
        },
        useSortBy,
        usePagination
    );

    useEffect(() => {
        settOppgaveFelter(initialOppgaveFelter(innloggetSaksbehandler));
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

    const oppdaterOppgaveFeltILocalStorage = (oppgaveFelt: IOppgaveFelt, nyVerdi: string) => {
        const oppgaveFelterLocalStorage = JSON.parse(
            localStorage.getItem('oppgaveFeltVerdier') || '{}'
        );
        oppgaveFelterLocalStorage[oppgaveFelt.nøkkel] = nyVerdi;
        localStorage.setItem('oppgaveFeltVerdier', JSON.stringify(oppgaveFelterLocalStorage));
    };

    const tilbakestillOppgaveFeltILocalStorage = () => {
        localStorage.removeItem('oppgaveFeltVerdier');
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
            oppdaterOppgaveFeltILocalStorage(oppgaveFelt, nyVerdi);

            settOppgaveFelter(oppdaterteOppgaveFelter);

            navigate({
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
        tilbakestillOppgaveFeltILocalStorage();
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

    const fordelOppgave = (oppgave: IOppgave, saksbehandler: string) => {
        request<void, string>({
            method: 'POST',
            url: `/familie-ba-sak/api/oppgave/${oppgave.id}/fordel?saksbehandler=${saksbehandler}`,
            påvirkerSystemLaster: true,
        })
            .then((oppgaveId: Ressurs<string>) => {
                if (oppgaveId.status === RessursStatus.SUKSESS) {
                    const oppgavetypeFilter =
                        OppgavetypeFilter[oppgave.oppgavetype as keyof typeof OppgavetypeFilter];
                    if (
                        oppgavetypeFilter === OppgavetypeFilter.JFR ||
                        oppgavetypeFilter === OppgavetypeFilter.BEH_SED
                    ) {
                        navigate(`/oppgaver/journalfor/${oppgave.id}`);
                    } else {
                        if (oppgave.behandlingstype === BehandlingstypeFilter.ae0161) {
                            // tilbakekreving
                            gåTilTilbakekreving(oppgave);
                        } else if (oppgave.aktoerId) {
                            opprettEllerHentFagsak({
                                personIdent: null,
                                aktørId: oppgave.aktoerId,
                            });
                        }
                    }
                } else {
                    settToast(ToastTyper.OPPGAVE_PLUKKET, {
                        alertType: AlertType.ERROR,
                        tekst: hentFrontendFeilmelding(oppgaveId) ?? 'Fordeling av oppgave feilet',
                    });
                }
            })
            .catch((_error: AxiosError) => {
                settToast(ToastTyper.OPPGAVE_PLUKKET, {
                    alertType: AlertType.ERROR,
                    tekst: 'Fordeling av oppgave feilet',
                });
            });
    };

    const tilbakestillFordelingPåOppgave = (oppgave: IOppgave) => {
        request<string, IOppgave>({
            method: 'POST',
            url: `/familie-ba-sak/api/oppgave/${oppgave.id}/tilbakestill`,
            påvirkerSystemLaster: true,
        })
            .then((oppgaverRes: Ressurs<IOppgave>) => {
                if (oppgaverRes.status === RessursStatus.SUKSESS) {
                    oppdaterOppgave(oppgaverRes.data);
                    settToast(ToastTyper.OPPGAVE_TILBAKESTILT, {
                        alertType: AlertType.SUCCESS,
                        tekst: 'Oppgave er tilbakestilt',
                    });
                } else {
                    settToast(ToastTyper.OPPGAVE_TILBAKESTILT, {
                        alertType: AlertType.ERROR,
                        tekst:
                            hentFrontendFeilmelding(oppgaverRes) ??
                            'Tilbakestilling av oppgave feilet',
                    });
                }
            })
            .catch((_error: AxiosError) => {
                settToast(ToastTyper.OPPGAVE_TILBAKESTILT, {
                    alertType: AlertType.ERROR,
                    tekst: 'Tilbakestilling av oppgave feilet',
                });
            });
    };

    const validerSkjema = () => {
        const opprettetTidspunktGyldig =
            oppgaveFelter.opprettetTidspunkt.filter?.selectedValue === '' ||
            erIsoStringGyldig(oppgaveFelter.opprettetTidspunkt.filter?.selectedValue);

        const fristGyldig =
            oppgaveFelter.fristFerdigstillelse.filter?.selectedValue === '' ||
            erIsoStringGyldig(oppgaveFelter.fristFerdigstillelse.filter?.selectedValue);

        const enhetGyldig =
            oppgaveFelter.tildeltEnhetsnr.filter?.selectedValue !== EnhetFilter.VELG;

        const oppdaterteOppgaveFelter = {
            ...oppgaveFelter,
            opprettetTidspunkt: {
                ...oppgaveFelter.opprettetTidspunkt,
                valideringsstatus: opprettetTidspunktGyldig
                    ? Valideringsstatus.OK
                    : Valideringsstatus.FEIL,
                feilmelding: opprettetTidspunktGyldig ? '' : 'Dato må skrives på format ddmmåå',
            },
            fristFerdigstillelse: {
                ...oppgaveFelter.fristFerdigstillelse,
                valideringsstatus: fristGyldig ? Valideringsstatus.OK : Valideringsstatus.FEIL,
                feilmelding: fristGyldig ? '' : 'Dato må skrives på format ddmmåå',
            },
            tildeltEnhetsnr: {
                ...oppgaveFelter.tildeltEnhetsnr,
                valideringsstatus: enhetGyldig ? Valideringsstatus.OK : Valideringsstatus.FEIL,
                feilmelding: enhetGyldig ? '' : 'Du må velge enhet',
            },
        };

        const erGyldig = opprettetTidspunktGyldig && fristGyldig && enhetGyldig;
        settOppgaveFelter(oppdaterteOppgaveFelter);

        return erGyldig;
    };

    const hentOppgaver = () => {
        settOppgaver(byggHenterRessurs());

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
            hentOppgaveFelt('behandlingstype').filter?.selectedValue,
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
        });
    };

    const hentOppgaverFraBackend = (
        behandlingstema?: string,
        behandlingstype?: string,
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
            behandlingstype: erstattAlleMedUndefined(behandlingstype),
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

        return request<IFinnOppgaveRequest, IHentOppgaveDto>({
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

    const gåTilTilbakekreving = (oppgave: IOppgave) => {
        const brukerident = hentFnrFraOppgaveIdenter(oppgave.identer);
        if (brukerident) {
            request<{ personIdent: string }, IMinimalFagsak | undefined>({
                method: 'POST',
                url: `/familie-ba-sak/api/fagsaker/hent-fagsak-paa-person`,
                data: {
                    personIdent: brukerident,
                },
            }).then((fagsak: Ressurs<IMinimalFagsak | undefined>) => {
                if (fagsak.status === RessursStatus.SUKSESS && !!fagsak.data) {
                    window.location.href = `/redirect/familie-tilbake/fagsystem/BA/fagsak/${fagsak.data.id}/behandling/${oppgave.saksreferanse}`;
                }
            });
        }
    };

    return {
        fordelOppgave,
        hentOppgaver,
        oppgaveFelter,
        oppgaver,
        settSortOrderPåOppgaveFelt,
        settVerdiPåOppgaveFelt,
        tilbakestillFordelingPåOppgave,
        tilbakestillOppgaveFelter,
        validerSkjema,
        tableInstance,
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
