import { useAuthContext } from '@context/AuthContext';
import { useVisSystemetLaster } from '@hooks/useVisSystemetLaster';
import { HeaderMedSøk } from '@komponenter/HeaderMedSøk/HeaderMedSøk';
import { FeilmeldingModal } from '@komponenter/Modal/fagsak/FeilmeldingModal';
import { OpprettFagsakModal } from '@komponenter/Modal/fagsak/OpprettFagsakModal';
import { UgyldigSesjon } from '@komponenter/Modal/SesjonUtløpt';
import { ForhåndsvisOpprettingAvPdfModal } from '@komponenter/PdfVisningModal/ForhåndsvisOpprettingAvPdfModal';
import { FagsakContainer } from '@sider/Fagsak/FagsakContainer';
import { Infotrygd } from '@sider/Infotrygd/Infotrygd';
import { Oppgavebenk } from '@sider/Oppgavebenk/Oppgavebenk';
import { Samhandler } from '@sider/Samhandler/Samhandler';
import classNames from 'classnames';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router';

import Styles from './Container.module.css';
import SystemetLaster from './komponenter/SystemetLaster/SystemetLaster';
import Toasts from './komponenter/Toast/Toasts';
import ManuellJournalføring from './sider/ManuellJournalføring/ManuellJournalføring';

export function Container() {
    const { autentisert } = useAuthContext();
    const visSystemetLaster = useVisSystemetLaster();

    if (!autentisert) {
        return <UgyldigSesjon />;
    }

    return (
        <Router>
            {visSystemetLaster && <SystemetLaster />}
            <Toasts />
            <main className={classNames(Styles.main, { [Styles.systemLaster]: visSystemetLaster })}>
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
        </Router>
    );
}
