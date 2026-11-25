import { useVisTekniskFeilModal } from '@context/TekniskFeilModalContext';
import { useToastContext } from '@context/ToastContext';
import { useHentFagsakerPåPerson } from '@hooks/useHentFagsakerPåPerson';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import type { SortState } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggFeiletRessurs, byggHenterRessurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';
import type { IFinnOppgaveRequest, IHentOppgaveDto, IOppgave } from '@typer/oppgave';
import { SaksbehandlerFilter } from '@typer/oppgave';
import { hentNesteSorteringsrekkefølge, hentSortState, Sorteringsrekkefølge } from '@utils/tabell';
import type { AxiosError } from 'axios';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { finnFagsakÅNavigereTil } from './finnFagsakÅNavigereTil';
import type { OppgavefilterFormValues } from './form/useOppgavefilterForm';
import { type IOppgaveRad, mapIOppgaverTilOppgaveRad, Sorteringsnøkkel, sorterEtterNøkkel } from './utils';

const OPPGAVEBENK_SORTERINGSNØKKEL = 'OPPGAVEBENK_SORTERINGSNØKKEL';

export const oppgaveSideLimit = 15;

const maksAntallOppgaver = 150;

interface OppgavebenkContextValue {
    hentOppgaver: (verdier: OppgavefilterFormValues) => Promise<void>;
    oppgaver: Ressurs<IHentOppgaveDto>;
    oppdaterOppgave: (oppgave: IOppgave) => void;
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

    const [oppgaver, settOppgaver] = useState<Ressurs<IHentOppgaveDto>>(byggTomRessurs<IHentOppgaveDto>());

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

    const hentOppgaver = (verdier: OppgavefilterFormValues) => {
        settOppgaver(byggHenterRessurs());

        const erstattAlleMedUndefined = (filter: string) => (filter === 'ALLE' ? undefined : filter);
        let tildeltRessurs: boolean | undefined;
        switch (verdier.saksbehandler) {
            case SaksbehandlerFilter.FORDELTE:
                tildeltRessurs = true;
                break;
            case SaksbehandlerFilter.UFORDELTE:
                tildeltRessurs = false;
                break;
            default:
                tildeltRessurs = undefined;
        }

        const finnOppgaveRequest: IFinnOppgaveRequest = {
            behandlingstema: erstattAlleMedUndefined(verdier.behandlingstema),
            behandlingstype: erstattAlleMedUndefined(verdier.behandlingstype),
            oppgavetype: erstattAlleMedUndefined(verdier.oppgavetype),
            enhet: erstattAlleMedUndefined(verdier.enhet)?.replace('E', ''),
            tilordnetRessurs:
                verdier.saksbehandler === SaksbehandlerFilter.INNLOGGET ? saksbehandler.navIdent : undefined,
            tildeltRessurs,
            opprettetFomTidspunkt: verdier.registrertDato ? `${verdier.registrertDato}T00:00:00.000` : undefined,
            opprettetTomTidspunkt: verdier.registrertDato ? `${verdier.registrertDato}T23:59:59.999` : undefined,
            fristFomDato: verdier.frist || undefined,
            fristTomDato: verdier.frist || undefined,
            limit: maksAntallOppgaver,
            offset: 0,
        };

        return request<IFinnOppgaveRequest, IHentOppgaveDto>({
            data: finnOppgaveRequest,
            method: 'POST',
            url: `/familie-ba-sak/api/oppgave/hent-oppgaver`,
        })
            .then((oppgaverRes: Ressurs<IHentOppgaveDto>) => {
                settOppgaver(oppgaverRes);
            })
            .catch((_error: AxiosError) => {
                settOppgaver(byggFeiletRessurs('Ukjent ved innhenting av oppgaver'));
            });
    };

    return (
        <OppgavebenkContext.Provider
            value={{
                hentOppgaver,
                oppgaver,
                oppdaterOppgave,
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
