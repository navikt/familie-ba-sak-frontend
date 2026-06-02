import { useAuthContext } from '@context/AuthContext';
import { useVisSystemetLaster } from '@hooks/useVisSystemetLaster';
import { HeaderMedSøk } from '@komponenter/HeaderMedSøk/HeaderMedSøk';
import { FeilmeldingModal } from '@komponenter/Modal/fagsak/FeilmeldingModal';
import { OpprettFagsakModal } from '@komponenter/Modal/fagsak/OpprettFagsakModal';
import { UgyldigSesjon } from '@komponenter/Modal/SesjonUtløpt';
import { ForhåndsvisOpprettingAvPdfModal } from '@komponenter/PdfVisningModal/ForhåndsvisOpprettingAvPdfModal';
import classNames from 'classnames';
import { Outlet } from 'react-router';

import Styles from './AppContainer.module.css';
import SystemetLaster from './komponenter/SystemetLaster/SystemetLaster';
import Toasts from './komponenter/Toast/Toasts';

export function AppContainer() {
    const { autentisert } = useAuthContext();
    const visSystemetLaster = useVisSystemetLaster();

    if (!autentisert) {
        return (
            <main>
                <UgyldigSesjon />
            </main>
        );
    }

    return (
        <main className={classNames(Styles.main, { [Styles.systemLaster]: visSystemetLaster })}>
            <Toasts />
            {visSystemetLaster && <SystemetLaster />}
            <OpprettFagsakModal />
            <FeilmeldingModal />
            <ForhåndsvisOpprettingAvPdfModal />
            <HeaderMedSøk />
            <Outlet />
        </main>
    );
}
