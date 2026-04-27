import React from 'react';

import classNames from 'classnames';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router';

import { useHttp } from '@navikt/familie-http';

import Styles from './Container.module.css';
import { useAppContext } from './context/AppContext';
import { HeaderMedSøk } from './komponenter/HeaderMedSøk/HeaderMedSøk';
import AppInfoModal from './komponenter/Modal/AppInfoModal';
import { FeilmeldingModal } from './komponenter/Modal/fagsak/FeilmeldingModal';
import { OpprettFagsakModal } from './komponenter/Modal/fagsak/OpprettFagsakModal';
import UgyldigSesjon from './komponenter/Modal/SesjonUtløpt';
import { ForhåndsvisOpprettingAvPdfModal } from './komponenter/PdfVisningModal/ForhåndsvisOpprettingAvPdfModal';
import SystemetLaster from './komponenter/SystemetLaster/SystemetLaster';
import Toasts from './komponenter/Toast/Toasts';
import { FagsakContainer } from './sider/Fagsak/FagsakContainer';
import { Infotrygd } from './sider/Infotrygd/Infotrygd';
import ManuellJournalføring from './sider/ManuellJournalføring/ManuellJournalføring';
import { Oppgavebenk } from './sider/Oppgavebenk/Oppgavebenk';
import { Samhandler } from './sider/Samhandler/Samhandler';

export function Container() {
    const { autentisert, appInfoModal } = useAppContext();
    const { systemetLaster } = useHttp();

    return (
        <Router>
            {appInfoModal.visModal && <AppInfoModal modal={appInfoModal} />}
            {autentisert ? (
                <>
                    {systemetLaster() && <SystemetLaster />}
                    <Toasts />
                    <main className={classNames(Styles.main, { [Styles.systemLaster]: systemetLaster() })}>
                        <OpprettFagsakModal />
                        <FeilmeldingModal />
                        <ForhåndsvisOpprettingAvPdfModal />
                        <HeaderMedSøk />
                        <Routes>
                            <Route path="/fagsak/:fagsakId/*" element={<FagsakContainer />} />
                            <Route path="/oppgaver/journalfor/:oppgaveId" element={<ManuellJournalføring />} />
                            <Route path="/infotrygd" element={<Infotrygd />} />
                            <Route path="/samhandler" element={<Samhandler />} />
                            <Route path="/oppgaver" element={<Oppgavebenk />} />
                            <Route path="/" element={<Navigate to="/oppgaver" />} />
                        </Routes>
                    </main>
                </>
            ) : (
                <UgyldigSesjon />
            )}
        </Router>
    );
}
