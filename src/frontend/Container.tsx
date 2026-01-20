import React from 'react';

import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router';
import styled from 'styled-components';

import { useAppContext } from './context/AppContext';
import { HeaderMedSøk } from './komponenter/HeaderMedSøk/HeaderMedSøk';
import AppInfoModal from './komponenter/Modal/AppInfoModal';
import { FeilmeldingModal } from './komponenter/Modal/fagsak/FeilmeldingModal';
import { OpprettFagsakModal } from './komponenter/Modal/fagsak/OpprettFagsakModal';
import UgyldigSesjon from './komponenter/Modal/SesjonUtløpt';
import { UtdatertAppVersjonModal } from './komponenter/Modal/UtdatertAppVersjonModal/UtdatertAppVersjonModal';
import { ForhåndsvisOpprettingAvPdfModal } from './komponenter/PdfVisningModal/ForhåndsvisOpprettingAvPdfModal';
import SystemetLaster from './komponenter/SystemetLaster/SystemetLaster';
import { TidslinjeProvider } from './komponenter/Tidslinje/TidslinjeContext';
import Toasts from './komponenter/Toast/Toasts';
import { FagsakContainer } from './sider/Fagsak/FagsakContainer';
import { Infotrygd } from './sider/Infotrygd/Infotrygd';
import ManuellJournalføring from './sider/ManuellJournalføring/ManuellJournalføring';
import { Oppgavebenk } from './sider/Oppgavebenk/Oppgavebenk';
import { Samhandler } from './sider/Samhandler/Samhandler';
import TidslinjeVisualisering from './sider/tidslinjer/TidslinjeVisualisering';

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
    const { autentisert, systemetLaster, innloggetSaksbehandler, appInfoModal, erTogglesHentet } = useAppContext();

    return (
        <Router>
            {appInfoModal.visModal && <AppInfoModal modal={appInfoModal} />}
            {autentisert ? (
                erTogglesHentet && (
                    <>
                        {systemetLaster() && <SystemetLaster />}
                        <Toasts />
                        <Main $systemetLaster={systemetLaster()}>
                            <UtdatertAppVersjonModal />
                            <OpprettFagsakModal />
                            <FeilmeldingModal />
                            <ForhåndsvisOpprettingAvPdfModal />
                            <HeaderMedSøk
                                brukerNavn={innloggetSaksbehandler?.displayName}
                                brukerEnhet={innloggetSaksbehandler?.enhet}
                            />
                            <Routes>
                                <Route path="/fagsak/:fagsakId/*" element={<FagsakContainer />} />
                                <Route path="/oppgaver/journalfor/:oppgaveId" element={<ManuellJournalføring />} />
                                <Route path="/infotrygd" element={<Infotrygd />} />
                                <Route path="/samhandler" element={<Samhandler />} />
                                <Route path="/oppgaver" element={<Oppgavebenk />} />
                                <Route path="/" element={<Navigate to="/oppgaver" />} />
                            </Routes>
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
