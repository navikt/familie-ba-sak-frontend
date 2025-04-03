import React, { useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router';
import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import BehandlingContainer from './Behandling/BehandlingContainer';
import { HentOgSettBehandlingProvider } from './Behandling/context/HentOgSettBehandlingContext';
import Dokumentutsending from './Dokumentutsending/Dokumentutsending';
import { FagsakProvider, useFagsakContext } from './FagsakContext';
import JournalpostListe from './journalposter/JournalpostListe';
import Personlinje from './Personlinje/Personlinje';
import Saksoversikt from './Saksoversikt/Saksoversikt';
import { DokumentutsendingProvider } from '../../context/DokumentutsendingContext';
import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
import { useScrollTilAnker } from '../../hooks/useScrollTilAnker';

const HovedInnhold = styled.div`
    height: calc(100vh - 3rem);
    overflow: auto;
`;

const FagsakContainerInnhold: React.FunctionComponent = () => {
    const { fagsakId } = useSakOgBehandlingParams();
    useScrollTilAnker();

    const { bruker: brukerRessurs, minimalFagsakRessurs, hentMinimalFagsak } = useFagsakContext();

    useEffect(() => {
        if (fagsakId !== undefined) {
            if (minimalFagsakRessurs.status !== RessursStatus.SUKSESS) {
                hentMinimalFagsak(fagsakId);
            } else if (
                minimalFagsakRessurs.status === RessursStatus.SUKSESS &&
                minimalFagsakRessurs.data.id !== parseInt(fagsakId, 10)
            ) {
                hentMinimalFagsak(fagsakId);
            }
        }
    }, [fagsakId]);

    switch (minimalFagsakRessurs.status) {
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
                                                minimalFagsak={minimalFagsakRessurs.data}
                                            />
                                            <Saksoversikt
                                                minimalFagsak={minimalFagsakRessurs.data}
                                            />
                                        </>
                                    }
                                />

                                <Route
                                    path="/dokumentutsending"
                                    element={
                                        <>
                                            <Personlinje
                                                bruker={brukerRessurs.data}
                                                minimalFagsak={minimalFagsakRessurs.data}
                                            />
                                            <DokumentutsendingProvider
                                                fagsakId={minimalFagsakRessurs.data.id}
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
                                                minimalFagsak={minimalFagsakRessurs.data}
                                            />
                                            <JournalpostListe bruker={brukerRessurs.data} />
                                        </>
                                    }
                                />

                                <Route
                                    path="/:behandlingId/*"
                                    element={
                                        <HentOgSettBehandlingProvider
                                            fagsak={minimalFagsakRessurs.data}
                                        >
                                            <BehandlingContainer
                                                bruker={brukerRessurs.data}
                                                fagsak={minimalFagsakRessurs.data}
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
                                                minimalFagsak={minimalFagsakRessurs.data}
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
            return (
                <Alert
                    children={minimalFagsakRessurs.frontendFeilmelding}
                    variant="error"
                    contentMaxWidth={false}
                />
            );
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return <Alert children={minimalFagsakRessurs.frontendFeilmelding} variant="error" />;
        default:
            return <div />;
    }
};

const FagsakContainer: React.FC = () => {
    return (
        <FagsakProvider>
            <FagsakContainerInnhold />
        </FagsakProvider>
    );
};

export default FagsakContainer;
