import React from 'react';

import { Navigate, Route, Routes } from 'react-router';
import styled from 'styled-components';

import { Alert, HStack, Loader, VStack } from '@navikt/ds-react';

import BehandlingContainer from './Behandling/BehandlingContainer';
import { HentOgSettBehandlingProvider } from './Behandling/context/HentOgSettBehandlingContext';
import Dokumentutsending from './Dokumentutsending/Dokumentutsending';
import { DokumentutsendingProvider } from './Dokumentutsending/DokumentutsendingContext';
import { Fagsaklinje } from './Fagsaklinje/Fagsaklinje';
import { InfotrygdFagsak } from './Infotrygd/InfotrygdFagsak';
import JournalpostListe from './journalposter/JournalpostListe';
import { ManuelleBrevmottakerePåFagsakProvider } from './ManuelleBrevmottakerePåFagsakContext';
import { Personlinje } from './Personlinje/Personlinje';
import Saksoversikt from './Saksoversikt/Saksoversikt';
import { BrukerProvider } from '../../context/BrukerContext';
import { FagsakProvider } from '../../context/FagsakContext';
import { useFagsakId } from '../../hooks/useFagsakId';
import { useHentFagsak } from '../../hooks/useHentFagsak';
import { useHentPerson } from '../../hooks/useHentPerson';
import { useScrollTilAnker } from '../../hooks/useScrollTilAnker';
import { FagsakType } from '../../typer/fagsak';

const HovedInnhold = styled.div`
    height: calc(100vh - 3rem);
    overflow: auto;
`;

export function FagsakContainer() {
    const fagsakId = useFagsakId();

    const {
        data: fagsak,
        isPending: erFagsakPending,
        error: fagsakError,
    } = useHentFagsak(fagsakId);

    const {
        data: person,
        isPending: erPersonPending,
        error: personError,
    } = useHentPerson(
        fagsak?.fagsakType === FagsakType.SKJERMET_BARN
            ? fagsak?.fagsakeier
            : fagsak?.søkerFødselsnummer
    );

    useScrollTilAnker();

    if (erFagsakPending || erPersonPending) {
        return (
            <HStack gap={'4'} margin={'space-16'}>
                <Loader size={'small'} />
                Laster...
            </HStack>
        );
    }

    if (fagsakError || personError) {
        return (
            <VStack gap={'4'}>
                {fagsakError && <Alert variant={'error'}>{fagsakError.message}</Alert>}
                {personError && <Alert variant={'error'}>{personError.message}</Alert>}
            </VStack>
        );
    }

    return (
        <FagsakProvider fagsak={fagsak}>
            <BrukerProvider bruker={person}>
                <ManuelleBrevmottakerePåFagsakProvider key={fagsakId}>
                    <HovedInnhold>
                        <Personlinje bruker={person} minimalFagsak={fagsak} />
                        <Routes>
                            <Route
                                path="/saksoversikt"
                                element={
                                    <>
                                        <Fagsaklinje bruker={person} minimalFagsak={fagsak} />
                                        <Saksoversikt bruker={person} minimalFagsak={fagsak} />
                                    </>
                                }
                            />
                            <Route
                                path="/dokumentutsending"
                                element={
                                    <>
                                        <Fagsaklinje bruker={person} minimalFagsak={fagsak} />
                                        <DokumentutsendingProvider fagsakId={fagsak.id}>
                                            <Dokumentutsending bruker={person} />
                                        </DokumentutsendingProvider>
                                    </>
                                }
                            />
                            <Route
                                path="/dokumenter"
                                element={
                                    <>
                                        <Fagsaklinje bruker={person} minimalFagsak={fagsak} />
                                        <JournalpostListe bruker={person} />
                                    </>
                                }
                            />
                            <Route
                                path="/infotrygd"
                                element={
                                    <>
                                        <Fagsaklinje bruker={person} minimalFagsak={fagsak} />
                                        <InfotrygdFagsak minimalFagsak={fagsak} />
                                    </>
                                }
                            />
                            <Route
                                path="/:behandlingId/*"
                                element={
                                    <HentOgSettBehandlingProvider fagsak={fagsak}>
                                        <BehandlingContainer bruker={person} fagsak={fagsak} />
                                    </HentOgSettBehandlingProvider>
                                }
                            />
                            <Route
                                path="/"
                                element={
                                    <>
                                        <Navigate to={`/fagsak/${fagsakId}/saksoversikt`} />
                                    </>
                                }
                            />
                        </Routes>
                    </HovedInnhold>
                </ManuelleBrevmottakerePåFagsakProvider>
            </BrukerProvider>
        </FagsakProvider>
    );
}
