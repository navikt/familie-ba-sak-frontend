import React, { useEffect } from 'react';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Alert } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { DokumentutsendingProvider } from '../../context/DokumentutsendingContext';
import { useFagsakRessurser } from '../../context/FagsakContext';
import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
import { useAmplitude } from '../../utils/amplitude';
import Venstremeny from '../Felleskomponenter/Venstremeny/Venstremeny';
import BehandlingContainer from './BehandlingContainer';
import Dokumentutsending from './Dokumentutsending/Dokumentutsending';
import Høyremeny from './Høyremeny/Høyremeny';
import JournalpostListe from './journalposter/JournalpostListe';
import Personlinje from './Personlinje/Personlinje';
import Saksoversikt from './Saksoversikt/Saksoversikt';

const FagsakContainer: React.FunctionComponent = () => {
    const { fagsakId } = useSakOgBehandlingParams();

    const location = useLocation();
    const { loggSidevisning } = useAmplitude();
    const erPåSaksoversikt = location.pathname.includes('saksoversikt');
    const erPåDokumentliste = location.pathname.includes('dokumenter');
    const erPåDokumentutsending = location.pathname.includes('dokumentutsending');

    const skalHaVenstremeny = !erPåSaksoversikt && !erPåDokumentliste && !erPåDokumentutsending;

    const skalHaHøyremeny = !erPåSaksoversikt && !erPåDokumentutsending;

    const { bruker, minimalFagsak, hentMinimalFagsak } = useFagsakRessurser();

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

    useEffect(() => {
        if (erPåSaksoversikt) {
            loggSidevisning('saksoversikt');
        }

        if (erPåDokumentutsending) {
            loggSidevisning('dokumentutsending');
        }
    }, []);

    switch (minimalFagsak.status) {
        case RessursStatus.SUKSESS:
            switch (bruker.status) {
                case RessursStatus.SUKSESS:
                    return (
                        <>
                            <Personlinje bruker={bruker.data} minimalFagsak={minimalFagsak.data} />

                            <div className={'fagsakcontainer__content'}>
                                {skalHaVenstremeny && (
                                    <div className={'fagsakcontainer__content--venstremeny'}>
                                        <Venstremeny />
                                    </div>
                                )}
                                <div
                                    id={'fagsak-main'}
                                    className={'fagsakcontainer__content--main'}
                                >
                                    <Routes>
                                        <Route
                                            path="/saksoversikt"
                                            element={
                                                <Saksoversikt minimalFagsak={minimalFagsak.data} />
                                            }
                                        />

                                        <Route
                                            path="/dokumentutsending"
                                            element={
                                                <DokumentutsendingProvider
                                                    fagsakId={minimalFagsak.data.id}
                                                >
                                                    <Dokumentutsending />
                                                </DokumentutsendingProvider>
                                            }
                                        />

                                        <Route
                                            path="/dokumenter"
                                            element={<JournalpostListe bruker={bruker.data} />}
                                        />

                                        <Route
                                            path="/:behandlingId/*"
                                            element={<BehandlingContainer />}
                                        />
                                        <Route
                                            path="/"
                                            element={
                                                <Navigate to={`/fagsak/${fagsakId}/saksoversikt`} />
                                            }
                                        />
                                    </Routes>
                                </div>
                                {skalHaHøyremeny && (
                                    <div className={'fagsakcontainer__content--høyremeny'}>
                                        <Høyremeny />
                                    </div>
                                )}
                            </div>
                        </>
                    );
                case RessursStatus.FEILET:
                case RessursStatus.FUNKSJONELL_FEIL:
                case RessursStatus.IKKE_TILGANG:
                    return <Alert children={bruker.frontendFeilmelding} variant="error" />;
                default:
                    return <div />;
            }
        case RessursStatus.IKKE_TILGANG:
            return (
                <Alert children={`Du har ikke tilgang til å se denne saken.`} variant="warning" />
            );
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return <Alert children={minimalFagsak.frontendFeilmelding} variant="error" />;
        default:
            return <div />;
    }
};

export default FagsakContainer;
