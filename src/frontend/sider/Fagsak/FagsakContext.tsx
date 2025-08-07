import React, { createContext, type PropsWithChildren, useContext, useEffect } from 'react';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggHenterRessurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import { useAppContext } from '../../context/AppContext';
import { useSettAktivBrukerIModiaContext } from '../../hooks/useSettAktivBrukerIModiaContext';
import { FagsakType, type IMinimalFagsak } from '../../typer/fagsak';
import { type IPersonInfo } from '../../typer/person';
import { ToggleNavn } from '../../typer/toggles';
import { sjekkTilgangTilPerson } from '../../utils/commons';
import { obfuskerPersonInfo } from '../../utils/obfuskerData';

interface IFagsakContext {
    bruker: Ressurs<IPersonInfo>;
    fagsak: IMinimalFagsak;
}

const FagsakContext = createContext<IFagsakContext | undefined>(undefined);

interface Props extends PropsWithChildren {
    fagsak: IMinimalFagsak;
}

export function FagsakProvider({ fagsak, children }: Props) {
    const [bruker, settBruker] = React.useState<Ressurs<IPersonInfo>>(byggTomRessurs());

    const { request } = useHttp();
    const { skalObfuskereData, toggles } = useAppContext();
    const { mutate: settAktivBrukerIModiaContext } = useSettAktivBrukerIModiaContext();

    const brukerFødselsnummer =
        fagsak.fagsakType === FagsakType.SKJERMET_BARN
            ? fagsak.fagsakeier
            : fagsak.søkerFødselsnummer;

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
        hentBruker(brukerFødselsnummer);
    }, [brukerFødselsnummer]);

    return <FagsakContext.Provider value={{ bruker, fagsak }}>{children}</FagsakContext.Provider>;
}

export const useFagsakContext = () => {
    const context = useContext(FagsakContext);

    if (context === undefined) {
        throw new Error('useFagsakContext må brukes innenfor en FagsakProvider');
    }

    return context;
};
