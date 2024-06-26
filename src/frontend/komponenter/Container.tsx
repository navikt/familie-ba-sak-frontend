import React from 'react';

import classNames from 'classnames';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import FagsakContainer from './Fagsak/FagsakContainer';
import { HeaderMedSøk } from './Felleskomponenter/HeaderMedSøk/HeaderMedSøk';
import AppInfoModal from './Felleskomponenter/Modal/AppInfoModal';
import UgyldigSesjon from './Felleskomponenter/Modal/SesjonUtløpt';
import SystemetLaster from './Felleskomponenter/SystemetLaster/SystemetLaster';
import TidslinjeVisualisering from './Felleskomponenter/TidslinjeVisualisering/TidslinjeVisualisering';
import Toasts from './Felleskomponenter/Toast/Toasts';
import { Infotrygd } from './Infotrygd/Infotrygd';
import { Samhandler } from './Infotrygd/Samhandler';
import Internstatistikk from './Internstatistikk';
import ManuellJournalfør from './ManuellJournalfør/ManuellJournalfør';
import { useApp } from '../context/AppContext';
import { FagsakProvider } from '../context/Fagsak/FagsakContext';
import { Oppgaver } from '../context/OppgaverContext';
import { TidslinjeProvider } from '../context/TidslinjeContext';

const Container: React.FC = () => {
    const { autentisert, systemetLaster, innloggetSaksbehandler, appInfoModal } = useApp();

    return (
        <Router>
            {appInfoModal.visModal && <AppInfoModal modal={appInfoModal} />}
            {autentisert ? (
                <>
                    {systemetLaster() && <SystemetLaster />}
                    <Toasts />

                    <main className={classNames('container', systemetLaster() && 'blur')}>
                        <HeaderMedSøk
                            brukerNavn={innloggetSaksbehandler?.displayName}
                            brukerEnhet={innloggetSaksbehandler?.enhet}
                        />
                        <FagsakProvider>
                            <Routes>
                                <Route path="/fagsak/:fagsakId/*" element={<FagsakContainer />} />
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
                                <Route path="/internstatistikk" element={<Internstatistikk />} />
                                <Route path="/infotrygd" element={<Infotrygd />} />
                                <Route path="/samhandler" element={<Samhandler />} />
                                <Route path="/oppgaver" element={<Oppgaver />} />
                                <Route path="/" element={<Navigate to="/oppgaver" />} />
                            </Routes>
                        </FagsakProvider>
                    </main>
                </>
            ) : (
                <UgyldigSesjon />
            )}
        </Router>
    );
};

export default Container;
