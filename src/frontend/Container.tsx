import React from 'react';

import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router';
import styled from 'styled-components';

import { useApp } from './context/AppContext';
import { FagsakProvider } from './context/Fagsak/FagsakContext';
import { Oppgaver } from './context/OppgaverContext';
import { TidslinjeProvider } from './context/TidslinjeContext';
import { HeaderMedSøk } from './komponenter/HeaderMedSøk/HeaderMedSøk';
import AppInfoModal from './komponenter/Modal/AppInfoModal';
import UgyldigSesjon from './komponenter/Modal/SesjonUtløpt';
import SystemetLaster from './komponenter/SystemetLaster/SystemetLaster';
import TidslinjeVisualisering from './komponenter/TidslinjeVisualisering/TidslinjeVisualisering';
import Toasts from './komponenter/Toast/Toasts';
import FagsakContainer from './sider/Fagsak/FagsakContainer';
import { Infotrygd } from './sider/Infotrygd/Infotrygd';
import Internstatistikk from './sider/Internstatistikk';
import ManuellJournalfør from './sider/ManuellJournalfør/ManuellJournalfør';
import { Samhandler } from './sider/Samhandler/Samhandler';

const Main = styled.main<{ $systemetLaster: boolean }>`
    position: fixed;
    width: 100%;
    height: 100%;

    ${props => {
        if (props.$systemetLaster)
            return `
                filter: blur(12px);
                -webkit-filter: blur(12px);
        `;
    }};
`;

const Container: React.FC = () => {
    const { autentisert, systemetLaster, innloggetSaksbehandler, appInfoModal, erTogglesHentet } =
        useApp();

    return (
        <Router>
            {appInfoModal.visModal && <AppInfoModal modal={appInfoModal} />}
            {autentisert ? (
                erTogglesHentet && (
                    <>
                        {systemetLaster() && <SystemetLaster />}
                        <Toasts />

                        <Main $systemetLaster={systemetLaster()}>
                            <HeaderMedSøk
                                brukerNavn={innloggetSaksbehandler?.displayName}
                                brukerEnhet={innloggetSaksbehandler?.enhet}
                            />
                            <FagsakProvider>
                                <Routes>
                                    <Route
                                        path="/fagsak/:fagsakId/*"
                                        element={<FagsakContainer />}
                                    />
                                    <Route
                                        path="/oppgaver/journalfor/:oppgaveId"
                                        element={<ManuellJournalfør />}
                                    />
                                    <Route
                                        path="/tidslinjer/:behandlingId"
                                        element={
                                            <TidslinjeProvider>
                                                <TidslinjeVisualisering />
                                            </TidslinjeProvider>
                                        }
                                    />
                                    <Route
                                        path="/internstatistikk"
                                        element={<Internstatistikk />}
                                    />
                                    <Route path="/infotrygd" element={<Infotrygd />} />
                                    <Route path="/samhandler" element={<Samhandler />} />
                                    <Route path="/oppgaver" element={<Oppgaver />} />
                                    <Route path="/" element={<Navigate to="/oppgaver" />} />
                                </Routes>
                            </FagsakProvider>
                        </Main>
                    </>
                )
            ) : (
                <UgyldigSesjon />
            )}
        </Router>
    );
};

export default Container;
