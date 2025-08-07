import React, { createContext, type PropsWithChildren, useContext, useEffect } from 'react';

import type { AxiosError } from 'axios';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    hentDataFraRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useAppContext } from '../../context/AppContext';
import { useSettAktivBrukerIModiaContext } from '../../hooks/useSettAktivBrukerIModiaContext';
import { FagsakType, type IMinimalFagsak } from '../../typer/fagsak';
import { type IPersonInfo } from '../../typer/person';
import { ToggleNavn } from '../../typer/toggles';
import { sjekkTilgangTilPerson } from '../../utils/commons';
import { obfuskerFagsak, obfuskerPersonInfo } from '../../utils/obfuskerData';

interface IFagsakContext {
    bruker: Ressurs<IPersonInfo>;
    hentMinimalFagsak: (fagsakId: string | number, påvirkerSystemLaster?: boolean) => void;
    minimalFagsakRessurs: Ressurs<IMinimalFagsak>;
    settMinimalFagsakRessurs: (fagsak: Ressurs<IMinimalFagsak>) => void;
    minimalFagsak: IMinimalFagsak | undefined;
}

const FagsakContext = createContext<IFagsakContext | undefined>(undefined);

export const FagsakProvider = (props: PropsWithChildren) => {
    const [minimalFagsakRessurs, settMinimalFagsakRessurs] =
        React.useState<Ressurs<IMinimalFagsak>>(byggTomRessurs());

    const [bruker, settBruker] = React.useState<Ressurs<IPersonInfo>>(byggTomRessurs());

    const { request } = useHttp();
    const { skalObfuskereData, toggles } = useAppContext();
    const { mutate: settAktivBrukerIModiaContext } = useSettAktivBrukerIModiaContext();

    const hentMinimalFagsak = (fagsakId: string | number, påvirkerSystemLaster = true): void => {
        if (påvirkerSystemLaster) {
            settMinimalFagsakRessurs(byggHenterRessurs());
        }

        request<void, IMinimalFagsak>({
            method: 'GET',
            url: `/familie-ba-sak/api/fagsaker/minimal/${fagsakId}`,
            påvirkerSystemLaster,
        })
            .then((hentetFagsak: Ressurs<IMinimalFagsak>) => {
                if (skalObfuskereData) {
                    obfuskerFagsak(hentetFagsak);
                }
                settMinimalFagsakRessurs(hentetFagsak);
            })
            .catch((_error: AxiosError) => {
                settMinimalFagsakRessurs(byggFeiletRessurs('Ukjent ved innhenting av fagsak'));
            });
    };

    const oppdaterBrukerHvisFagsakEndres = (
        bruker: Ressurs<IPersonInfo>,
        fødselsnummer?: string
    ): void => {
        if (fødselsnummer === undefined) {
            return;
        }

        if (bruker.status !== RessursStatus.SUKSESS || fødselsnummer !== bruker.data.personIdent) {
            hentBruker(fødselsnummer);
        }
    };

    const hentBruker = (personIdent: string): void => {
        settBruker(byggHenterRessurs());
        request<{ ident: string }, IPersonInfo>({
            method: 'POST',
            url: '/familie-ba-sak/api/person',
            data: {
                ident: personIdent,
            },
        }).then((hentetPerson: Ressurs<IPersonInfo>) => {
            const brukerEtterTilgangssjekk = sjekkTilgangTilPerson(hentetPerson);
            if (skalObfuskereData) {
                obfuskerPersonInfo(brukerEtterTilgangssjekk);
            }
            settBruker(brukerEtterTilgangssjekk);
            if (brukerEtterTilgangssjekk.status === RessursStatus.SUKSESS) {
                if (toggles[ToggleNavn.oppdaterModiaKontekst]) {
                    settAktivBrukerIModiaContext(brukerEtterTilgangssjekk.data.personIdent);
                }
            }
        });
    };

    useEffect(() => {
        if (
            minimalFagsakRessurs.status !== RessursStatus.SUKSESS &&
            minimalFagsakRessurs.status !== RessursStatus.HENTER
        ) {
            settBruker(byggTomRessurs());
        } else {
            const minimalFagsak = hentDataFraRessurs(minimalFagsakRessurs);

            const brukerFødselsnummer =
                minimalFagsak?.fagsakType === FagsakType.SKJERMET_BARN
                    ? minimalFagsak?.fagsakeier
                    : minimalFagsak?.søkerFødselsnummer;

            oppdaterBrukerHvisFagsakEndres(bruker, brukerFødselsnummer);
        }
    }, [minimalFagsakRessurs]);

    return (
        <FagsakContext.Provider
            value={{
                bruker,
                hentMinimalFagsak,
                minimalFagsakRessurs,
                settMinimalFagsakRessurs,
                minimalFagsak: hentDataFraRessurs(minimalFagsakRessurs),
            }}
        >
            {props.children}
        </FagsakContext.Provider>
    );
};

export const useFagsakContext = () => {
    const context = useContext(FagsakContext);

    if (context === undefined) {
        throw new Error('useFagsakContext må brukes innenfor en FagsakProvider');
    }

    return context;
};
