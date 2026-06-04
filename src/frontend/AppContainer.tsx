import { useAuthContext } from '@context/AuthContext';
import { useVisSystemetLaster } from '@hooks/useVisSystemetLaster';
import { HeaderMedSøk } from '@komponenter/HeaderMedSøk/HeaderMedSøk';
import { FeilmeldingModal } from '@komponenter/Modal/fagsak/FeilmeldingModal';
import { OpprettFagsakModal } from '@komponenter/Modal/fagsak/OpprettFagsakModal';
import { UgyldigSesjon } from '@komponenter/Modal/SesjonUtløpt';
import { ForhåndsvisOpprettingAvPdfModal } from '@komponenter/PdfVisningModal/ForhåndsvisOpprettingAvPdfModal';
import classNames from 'classnames';
import { Outlet } from 'react-router';

import { Box } from '@navikt/ds-react';

import Styles from './AppContainer.module.css';
import SystemetLaster from './komponenter/SystemetLaster/SystemetLaster';
import Toasts from './komponenter/Toast/Toasts';

export function AppContainer() {
    const { autentisert } = useAuthContext();
    const visSystemetLaster = useVisSystemetLaster();

    if (!autentisert) {
        return (
            <main className={Styles.main}>
                <UgyldigSesjon />
            </main>
        );
    }

    return (
        <main className={Styles.main}>
            {visSystemetLaster && <SystemetLaster />}
            <Box as={'div'} className={classNames({ [Styles.systemLaster]: visSystemetLaster })}>
                <Toasts />
                <OpprettFagsakModal />
                <FeilmeldingModal />
                <ForhåndsvisOpprettingAvPdfModal />
                <HeaderMedSøk />
                <Outlet />
            </Box>
        </main>
    );
}
