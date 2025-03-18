import React, { useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router';
import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import BehandlingContainer from './Behandling/BehandlingContainer';
import Dokumentutsending from './Dokumentutsending/Dokumentutsending';
import JournalpostListe from './journalposter/JournalpostListe';
import Personlinje from './Personlinje/Personlinje';
import Saksoversikt from './Saksoversikt/Saksoversikt';
import { HentOgSettBehandlingProvider } from '../../context/behandlingContext/HentOgSettBehandlingContext';
import { DokumentutsendingProvider } from '../../context/DokumentutsendingContext';
import { useFagsakContext } from '../../context/Fagsak/FagsakContext';
import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
import { useScrollTilAnker } from '../../hooks/useScrollTilAnker';

const HovedInnhold = styled.div`
    height: calc(100vh - 3rem);
    overflow: auto;
`;

const FagsakContainer: React.FunctionComponent = () => {
    const { fagsakId } = useSakOgBehandlingParams();
    useScrollTilAnker();

    const { bruker: brukerRessurs, minimalFagsak, hentMinimalFagsak } = useFagsakContext();

    useEffect(() => {
        if (fagsakId !== undefined) {
            if (minimalFagsak.status !== RessursStatus.SUKSESS) {
                hentMinimalFagsak(fagsakId);
            } else if (
                minimalFagsak.status === RessursStatus.SUKSESS &&
                minimalFagsak.data.id !== parseInt(fagsakId, 10)
            ) {
                hentMinimalFagsak(fagsakId);
            }
        }
    }, [fagsakId]);

    switch (minimalFagsak.status) {
        case RessursStatus.SUKSESS:
            switch (brukerRessurs.status) {
                case RessursStatus.SUKSESS:
                    return (
                        <HovedInnhold>
                            <Routes>
                                <Route
                                    path="/saksoversikt"
                                    element={
                                        <>
                                            <Personlinje
                                                bruker={brukerRessurs.data}
                                                minimalFagsak={minimalFagsak.data}
                                            />
                                            <Saksoversikt minimalFagsak={minimalFagsak.data} />
                                        </>
                                    }
                                />

                                <Route
                                    path="/dokumentutsending"
                                    element={
                                        <>
                                            <Personlinje
                                                bruker={brukerRessurs.data}
                                                minimalFagsak={minimalFagsak.data}
                                            />
                                            <DokumentutsendingProvider
                                                fagsakId={minimalFagsak.data.id}
                                            >
                                                <Dokumentutsending bruker={brukerRessurs.data} />
                                            </DokumentutsendingProvider>
                                        </>
                                    }
                                />

                                <Route
                                    path="/dokumenter"
                                    element={
                                        <>
                                            <Personlinje
                                                bruker={brukerRessurs.data}
                                                minimalFagsak={minimalFagsak.data}
                                            />
                                            <JournalpostListe bruker={brukerRessurs.data} />
                                        </>
                                    }
                                />

                                <Route
                                    path="/:behandlingId/*"
                                    element={
                                        <HentOgSettBehandlingProvider fagsak={minimalFagsak.data}>
                                            <BehandlingContainer
                                                bruker={brukerRessurs.data}
                                                fagsak={minimalFagsak.data}
                                            />
                                        </HentOgSettBehandlingProvider>
                                    }
                                />
                                <Route
                                    path="/"
                                    element={
                                        <>
                                            <Personlinje
                                                bruker={brukerRessurs.data}
                                                minimalFagsak={minimalFagsak.data}
                                            />
                                            <Navigate to={`/fagsak/${fagsakId}/saksoversikt`} />
                                        </>
                                    }
                                />
                            </Routes>
                        </HovedInnhold>
                    );
                case RessursStatus.FEILET:
                case RessursStatus.FUNKSJONELL_FEIL:
                case RessursStatus.IKKE_TILGANG:
                    return <Alert children={brukerRessurs.frontendFeilmelding} variant="error" />;
                default:
                    return <div />;
            }
        case RessursStatus.IKKE_TILGANG:
            return <Alert children={minimalFagsak.frontendFeilmelding} variant="error" />;
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return <Alert children={minimalFagsak.frontendFeilmelding} variant="error" />;
        default:
            return <div />;
    }
};

export default FagsakContainer;
