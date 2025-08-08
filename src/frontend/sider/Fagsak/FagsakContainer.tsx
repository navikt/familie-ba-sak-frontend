import React from 'react';

import { Navigate, Route, Routes } from 'react-router';
import styled from 'styled-components';

import { Alert, HStack, Loader } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import BehandlingContainer from './Behandling/BehandlingContainer';
import { HentOgSettBehandlingProvider } from './Behandling/context/HentOgSettBehandlingContext';
import Dokumentutsending from './Dokumentutsending/Dokumentutsending';
import { DokumentutsendingProvider } from './Dokumentutsending/DokumentutsendingContext';
import { FagsakProvider, useFagsakContext } from './FagsakContext';
import { Fagsaklinje } from './Fagsaklinje/Fagsaklinje';
import { InfotrygdFagsak } from './Infotrygd/InfotrygdFagsak';
import JournalpostListe from './journalposter/JournalpostListe';
import { ManuelleBrevmottakerePåFagsakProvider } from './ManuelleBrevmottakerePåFagsakContext';
import { Personlinje } from './Personlinje/Personlinje';
import Saksoversikt from './Saksoversikt/Saksoversikt';
import { useFagsakId } from '../../hooks/useFagsakId';
import { useHentFagsak } from '../../hooks/useHentFagsak';
import { useScrollTilAnker } from '../../hooks/useScrollTilAnker';
import type { IMinimalFagsak } from '../../typer/fagsak';

const HovedInnhold = styled.div`
    height: calc(100vh - 3rem);
    overflow: auto;
`;

function FagsakContainerInnhold({ fagsak }: { fagsak: IMinimalFagsak }) {
    const { bruker: brukerRessurs } = useFagsakContext();

    switch (brukerRessurs.status) {
        case RessursStatus.SUKSESS:
            return (
                <ManuelleBrevmottakerePåFagsakProvider key={fagsak.id}>
                    <HovedInnhold>
                        <Personlinje bruker={brukerRessurs.data} minimalFagsak={fagsak} />
                        <Routes>
                            <Route
                                path="/saksoversikt"
                                element={
                                    <>
                                        <Fagsaklinje
                                            bruker={brukerRessurs.data}
                                            minimalFagsak={fagsak}
                                        />
                                        <Saksoversikt
                                            bruker={brukerRessurs.data}
                                            minimalFagsak={fagsak}
                                        />
                                    </>
                                }
                            />
                            <Route
                                path="/dokumentutsending"
                                element={
                                    <>
                                        <Fagsaklinje
                                            bruker={brukerRessurs.data}
                                            minimalFagsak={fagsak}
                                        />
                                        <DokumentutsendingProvider fagsakId={fagsak.id}>
                                            <Dokumentutsending bruker={brukerRessurs.data} />
                                        </DokumentutsendingProvider>
                                    </>
                                }
                            />
                            <Route
                                path="/dokumenter"
                                element={
                                    <>
                                        <Fagsaklinje
                                            bruker={brukerRessurs.data}
                                            minimalFagsak={fagsak}
                                        />
                                        <JournalpostListe bruker={brukerRessurs.data} />
                                    </>
                                }
                            />
                            <Route
                                path="/infotrygd"
                                element={
                                    <>
                                        <Fagsaklinje
                                            bruker={brukerRessurs.data}
                                            minimalFagsak={fagsak}
                                        />
                                        <InfotrygdFagsak minimalFagsak={fagsak} />
                                    </>
                                }
                            />
                            <Route
                                path="/:behandlingId/*"
                                element={
                                    <HentOgSettBehandlingProvider fagsak={fagsak}>
                                        <BehandlingContainer
                                            bruker={brukerRessurs.data}
                                            fagsak={fagsak}
                                        />
                                    </HentOgSettBehandlingProvider>
                                }
                            />
                            <Route
                                path="/"
                                element={
                                    <>
                                        <Navigate to={`/fagsak/${fagsak.id}/saksoversikt`} />
                                    </>
                                }
                            />
                        </Routes>
                    </HovedInnhold>
                </ManuelleBrevmottakerePåFagsakProvider>
            );
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
        case RessursStatus.IKKE_TILGANG:
            return <Alert children={brukerRessurs.frontendFeilmelding} variant="error" />;
        default:
            return <div />;
    }
}

export function FagsakContainer() {
    const fagsakId = useFagsakId();

    useScrollTilAnker();

    const {
        data: fagsak,
        isPending: isPendingFagsak,
        error: fagsakError,
    } = useHentFagsak(fagsakId);

    if (isPendingFagsak) {
        return (
            <HStack gap={'4'} margin={'space-16'}>
                <Loader size={'small'} />
                Laster fagsak...
            </HStack>
        );
    }

    if (fagsakError) {
        return (
            <Alert variant={'error'}>
                Feil oppstod ved innlasting av fagsak: {fagsakError.message}
            </Alert>
        );
    }

    return (
        <FagsakProvider fagsak={fagsak}>
            <FagsakContainerInnhold fagsak={fagsak} />
        </FagsakProvider>
    );
}
