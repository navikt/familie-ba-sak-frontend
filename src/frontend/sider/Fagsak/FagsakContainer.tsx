import React from 'react';

import { Navigate, Route, Routes } from 'react-router';
import styled from 'styled-components';

import { Alert, HStack, Loader } from '@navikt/ds-react';

import BehandlingContainer from './Behandling/BehandlingContainer';
import { HentOgSettBehandlingProvider } from './Behandling/context/HentOgSettBehandlingContext';
import { BrukerProvider } from './BrukerContext';
import Dokumentutsending from './Dokumentutsending/Dokumentutsending';
import { DokumentutsendingProvider } from './Dokumentutsending/DokumentutsendingContext';
import { FagsakProvider } from './FagsakContext';
import { InfotrygdFagsak } from './Infotrygd/InfotrygdFagsak';
import JournalpostListe from './journalposter/JournalpostListe';
import { ManuelleBrevmottakerePåFagsakProvider } from './ManuelleBrevmottakerePåFagsakContext';
import { Saksoversikt } from './Saksoversikt/Saksoversikt';
import { useFagsakId } from '../../hooks/useFagsakId';
import { useHentFagsak } from '../../hooks/useHentFagsak';
import { useHentPerson } from '../../hooks/useHentPerson';
import { useScrollTilAnker } from '../../hooks/useScrollTilAnker';
import { useSyncModiaContext } from '../../hooks/useSyncModiaContext';
import { Personlinje } from '../../komponenter/Personlinje/Personlinje';
import { Fagsaklinje } from '../../komponenter/Saklinje/Fagsaklinje';
import { FagsakType } from '../../typer/fagsak';

const HovedInnhold = styled.div`
    height: calc(100vh - 3rem);
    overflow: auto;
`;

export function FagsakContainer() {
    const fagsakId = useFagsakId();

    const { data: fagsak, isPending: isPendingFagsak, error: fagsakError } = useHentFagsak(fagsakId);

    const ident = fagsak?.fagsakType === FagsakType.SKJERMET_BARN ? fagsak?.fagsakeier : fagsak?.søkerFødselsnummer;

    const { data: bruker, isPending: isPendingBruker, error: brukerError } = useHentPerson({ ident });

    useScrollTilAnker();
    useSyncModiaContext(bruker);

    if (isPendingFagsak) {
        return (
            <HStack gap={'4'} margin={'space-16'}>
                <Loader size={'small'} />
                Laster fagsak...
            </HStack>
        );
    }

    if (fagsakError) {
        return <Alert variant={'error'}>Feil oppstod ved innlasting av fagsak: {fagsakError.message}</Alert>;
    }

    if (isPendingBruker) {
        return (
            <HStack gap={'4'} margin={'space-16'}>
                <Loader size={'small'} />
                Laster bruker...
            </HStack>
        );
    }

    if (brukerError) {
        return <Alert variant={'error'}>Feil oppstod ved innlasting av bruker: {brukerError.message}</Alert>;
    }

    return (
        <FagsakProvider fagsak={fagsak}>
            <BrukerProvider bruker={bruker}>
                <ManuelleBrevmottakerePåFagsakProvider key={fagsak.id}>
                    <HovedInnhold>
                        <Personlinje bruker={bruker} fagsak={fagsak} />
                        <Routes>
                            <Route
                                path="/saksoversikt"
                                element={
                                    <>
                                        <Fagsaklinje />
                                        <Saksoversikt />
                                    </>
                                }
                            />
                            <Route
                                path="/dokumentutsending"
                                element={
                                    <>
                                        <Fagsaklinje />
                                        <DokumentutsendingProvider fagsakId={fagsak.id}>
                                            <Dokumentutsending bruker={bruker} />
                                        </DokumentutsendingProvider>
                                    </>
                                }
                            />
                            <Route
                                path="/dokumenter"
                                element={
                                    <>
                                        <Fagsaklinje />
                                        <JournalpostListe bruker={bruker} />
                                    </>
                                }
                            />
                            <Route
                                path="/infotrygd"
                                element={
                                    <>
                                        <Fagsaklinje />
                                        <InfotrygdFagsak minimalFagsak={fagsak} />
                                    </>
                                }
                            />
                            <Route
                                path="/:behandlingId/*"
                                element={
                                    <HentOgSettBehandlingProvider fagsak={fagsak}>
                                        <BehandlingContainer bruker={bruker} fagsak={fagsak} />
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
            </BrukerProvider>
        </FagsakProvider>
    );
}
