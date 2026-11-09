import { useVisTekniskFeilModal } from '@context/TekniskFeilModalContext';
import { useToastContext } from '@context/ToastContext';
import { useHentFagsakerPåPerson } from '@hooks/useHentFagsakerPåPerson';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import type { SortState } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import { Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { byggFeiletRessurs, byggHenterRessurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';
import type { IFinnOppgaveRequest, IHentOppgaveDto, IOppgave } from '@typer/oppgave';
import { EnhetFilter, SaksbehandlerFilter } from '@typer/oppgave';
import { erIsoStringGyldig } from '@utils/dato';
import { hentNesteSorteringsrekkefølge, hentSortState, Sorteringsrekkefølge } from '@utils/tabell';
import type { AxiosError } from 'axios';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { finnFagsakÅNavigereTil } from './finnFagsakÅNavigereTil';
import type { IOppgaveFelt, IOppgaveFelter } from './oppgavefelter';
import { initialOppgaveFelter } from './oppgavefelter';
import { type IOppgaveRad, mapIOppgaverTilOppgaveRad, Sorteringsnøkkel, sorterEtterNøkkel } from './utils';

const OPPGAVEBENK_SORTERINGSNØKKEL = 'OPPGAVEBENK_SORTERINGSNØKKEL';

export const oppgaveSideLimit = 15;

const maksAntallOppgaver = 150;

interface OppgavebenkContextValue {
    hentOppgaver: () => void;
    oppgaveFelter: IOppgaveFelter;
    oppgaver: Ressurs<IHentOppgaveDto>;
    settVerdiPåOppgaveFelt: (oppgaveFelt: IOppgaveFelt, nyVerdi: string) => void;
    oppdaterOppgave: (oppgave: IOppgave) => void;
    tilbakestillOppgaveFelter: () => void;
    validerSkjema: () => boolean;
    gåTilFagsakEllerVisFeilmelding: (personident: string) => Promise<void>;
    sortering: SortState | undefined;
    settOgLagreSortering: (sorteringsnøkkel: Sorteringsnøkkel) => void;
    sorterteOppgaverader: IOppgaveRad[];
}

const OppgavebenkContext = createContext<OppgavebenkContextValue | undefined>(undefined);

export const OppgavebenkProvider = (props: PropsWithChildren) => {
    const { settToast } = useToastContext();
    const saksbehandler = useSaksbehandler();
    const navigate = useNavigate();
    const { request } = useHttp();
    const visTekniskFeilModal = useVisTekniskFeilModal();

    const { mutateAsync: hentFagsakerPåPerson } = useHentFagsakerPåPerson();

    const [hentOppgaverVedSidelast, settHentOppgaverVedSidelast] = useState(true);

    const [oppgaver, settOppgaver] = useState<Ressurs<IHentOppgaveDto>>(byggTomRessurs<IHentOppgaveDto>());

    const [oppgaveFelter, settOppgaveFelter] = useState<IOppgaveFelter>(initialOppgaveFelter(saksbehandler));

    const oppgaverader: IOppgaveRad[] = useMemo(() => {
        return oppgaver.status === RessursStatus.SUKSESS && oppgaver.data.oppgaver.length > 0
            ? mapIOppgaverTilOppgaveRad(oppgaver.data.oppgaver, saksbehandler)
            : [];
    }, [oppgaver]);

    const lagretSortering = localStorage.getItem(OPPGAVEBENK_SORTERINGSNØKKEL);
    const [sortering, settSortering] = useState<SortState | undefined>(
        lagretSortering && lagretSortering !== '"{}"' && lagretSortering !== '"undefined"'
            ? JSON.parse(lagretSortering)
            : hentSortState(Sorteringsrekkefølge.STIGENDE, Sorteringsnøkkel.OPPRETTET_TIDSPUNKT)
    );

    const [sorterteOppgaverader, settSorterteOppgaverader] = useState<IOppgaveRad[]>(oppgaverader);
    useEffect(() => {
        settSorterteOppgaverader(
            oppgaverader.sort((a, b) => {
                if (sortering) {
                    return sortering.direction === Sorteringsrekkefølge.STIGENDE
                        ? sorterEtterNøkkel(b, a, sortering.orderBy as Sorteringsnøkkel)
                        : sorterEtterNøkkel(a, b, sortering.orderBy as Sorteringsnøkkel);
                }
                return 1;
            })
        );
    }, [oppgaverader, sortering]);

    const settOgLagreSortering = (sorteringsnøkkel: Sorteringsnøkkel): void => {
        const nyRekkefølge =
            sorteringsnøkkel === sortering?.orderBy
                ? hentNesteSorteringsrekkefølge(sortering.direction as Sorteringsrekkefølge)
                : Sorteringsrekkefølge.STIGENDE;
        const nySortering = hentSortState(nyRekkefølge, sorteringsnøkkel);
        localStorage.setItem(OPPGAVEBENK_SORTERINGSNØKKEL, JSON.stringify(nySortering || {}));
        settSortering(nySortering);
    };

    useEffect(() => {
        settOppgaveFelter(initialOppgaveFelter(saksbehandler));
    }, [saksbehandler]);

    useEffect(() => {
        if (hentOppgaverVedSidelast) {
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
        const oppgaveFelterLocalStorage = JSON.parse(localStorage.getItem('oppgaveFeltVerdier') || '{}');
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
                            mapOppgaveFelt.filter?.selectedValue !== mapOppgaveFelt.filter?.initialValue
                    )
                    .map((mapOppgaveFelt: IOppgaveFelt) => {
                        return `${mapOppgaveFelt.nøkkel}=${mapOppgaveFelt?.filter?.selectedValue}`;
                    })
                    .join('&'),
            });
        }
    };

    const tilbakestillOppgaveFelter = () => {
        tilbakestillOppgaveFeltILocalStorage();
        settOppgaveFelter(initialOppgaveFelter(saksbehandler));
    };

    const visFantIkkeFagsakToast = () => {
        settToast(ToastTyper.FANT_IKKE_FAGSAK, {
            alertType: AlertType.WARNING,
            tekst: 'Fant ikke fagsak',
        });
    };

    const gåTilFagsakEllerVisFeilmelding = async (personident: string): Promise<void> => {
        try {
            const fagsaker = await hentFagsakerPåPerson({ personIdent: personident });
            const fagsaknavigering = finnFagsakÅNavigereTil(fagsaker);
            if (fagsaknavigering.status === 'INGEN_FAGSAKER') {
                visFantIkkeFagsakToast();
            } else if (fagsaknavigering.status === 'FUNNET') {
                navigate(`/fagsak/${fagsaknavigering.fagsak.id}/saksoversikt`);
            } else {
                settToast(ToastTyper.FANT_IKKE_FAGSAK, {
                    alertType: AlertType.WARNING,
                    tekst: 'Det finnes flere relevante fagsaker på brukeren, du må søke opp fagsaken manuelt.',
                });
            }
        } catch (error) {
            visTekniskFeilModal(error);
        }
    };

    const validerSkjema = () => {
        const opprettetTidspunktGyldig =
            oppgaveFelter.opprettetTidspunkt.filter?.selectedValue === '' ||
            erIsoStringGyldig(oppgaveFelter.opprettetTidspunkt.filter?.selectedValue);

        const fristGyldig =
            oppgaveFelter.fristFerdigstillelse.filter?.selectedValue === '' ||
            erIsoStringGyldig(oppgaveFelter.fristFerdigstillelse.filter?.selectedValue);

        const enhetGyldig = oppgaveFelter.tildeltEnhetsnr.filter?.selectedValue !== EnhetFilter.VELG;

        const oppdaterteOppgaveFelter = {
            ...oppgaveFelter,
            opprettetTidspunkt: {
                ...oppgaveFelter.opprettetTidspunkt,
                valideringsstatus: opprettetTidspunktGyldig ? Valideringsstatus.OK : Valideringsstatus.FEIL,
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
        let tildeltRessurs: boolean | undefined;
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
            saksbehandlerFilter === SaksbehandlerFilter.INNLOGGET ? saksbehandler.navIdent : undefined,
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
        const erstattAlleMedUndefined = (filter: string | undefined) => (filter === 'ALLE' ? undefined : filter);

        const finnOppgaveRequest: IFinnOppgaveRequest = {
            behandlingstema: erstattAlleMedUndefined(behandlingstema),
            behandlingstype: erstattAlleMedUndefined(behandlingstype),
            oppgavetype: erstattAlleMedUndefined(oppgavetype),
            enhet: erstattAlleMedUndefined(enhet)?.replace('E', ''),
            tilordnetRessurs,
            tildeltRessurs,
            opprettetFomTidspunkt:
                registrertDato && registrertDato !== '' ? `${registrertDato}T00:00:00.000` : undefined,
            opprettetTomTidspunkt:
                registrertDato && registrertDato !== '' ? `${registrertDato}T23:59:59.999` : undefined,
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

    return (
        <OppgavebenkContext.Provider
            value={{
                hentOppgaver,
                oppgaveFelter,
                oppgaver,
                settVerdiPåOppgaveFelt,
                oppdaterOppgave,
                tilbakestillOppgaveFelter,
                validerSkjema,
                gåTilFagsakEllerVisFeilmelding,
                sortering,
                settOgLagreSortering,
                sorterteOppgaverader,
            }}
        >
            {props.children}
        </OppgavebenkContext.Provider>
    );
};

export const useOppgavebenkContext = () => {
    const context = useContext(OppgavebenkContext);
    if (context === undefined) {
        throw new Error('useOppgavebenkContext må brukes innenfor en OppgavebenkProvider');
    }
    return context;
};
