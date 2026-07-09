import { useBehandlingIdParam } from '@hooks/useBehandlingIdParam';
import { NotFound } from '@komponenter/Error/NotFound';
import { Behandlingslinje } from '@komponenter/Saklinje/Behandlingslinje';
import { HenleggBehandlingModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingModal';
import { HenleggBehandlingVeivalgModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingVeivalgModal';
import { KontrollsiderProvider } from '@sider/Fagsak/Behandling/KontrollsiderContext';
import { Outlet } from 'react-router';

import { Box, GlobalAlert, HStack, VStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import Styles from './Behandling.module.css';
import { BehandlingProvider } from './context/BehandlingContext';
import { useHentOgSettBehandlingContext } from './context/HentOgSettBehandlingContext';
import { Høyremeny } from './Høyremeny/Høyremeny';
import { TabContextProvider } from './Høyremeny/TabContextProvider';
import { TotrinnskontrollModalContextProvider } from './Høyremeny/Totrinnskontroll/TotrinnskontrollModalContextProvider';
import { KorrigerEtterbetalingModal } from './Sider/Vedtak/KorrigerEtterbetaling/KorrigerEtterbetalingModal';
import { Venstremeny } from './Venstremeny/Venstremeny';

export function Behandling() {
    const { behandlingRessurs } = useHentOgSettBehandlingContext();

    const behandlingIdParam = useBehandlingIdParam();

    if (!behandlingIdParam) {
        return <NotFound />;
    }

    switch (behandlingRessurs.status) {
        case RessursStatus.SUKSESS:
            const behandling = behandlingRessurs.data;
            return (
                <BehandlingProvider key={behandling.behandlingId} behandling={behandling}>
                    <KontrollsiderProvider>
                        <HenleggBehandlingModal />
                        <HenleggBehandlingVeivalgModal />
                        <KorrigerEtterbetalingModal />
                        <VStack className={Styles.skrollbarStack}>
                            <Behandlingslinje />
                            <HStack className={Styles.skrollbarStack}>
                                <Box className={Styles.venstreKolonne}>
                                    <Venstremeny />
                                </Box>
                                <Box className={Styles.midtreKolonne}>
                                    <Outlet />
                                </Box>
                                <Box className={Styles.høyreKolonne}>
                                    <TotrinnskontrollModalContextProvider>
                                        <TabContextProvider>
                                            <Høyremeny />
                                        </TabContextProvider>
                                    </TotrinnskontrollModalContextProvider>
                                </Box>
                            </HStack>
                        </VStack>
                    </KontrollsiderProvider>
                </BehandlingProvider>
            );
        case RessursStatus.IKKE_TILGANG:
            return (
                <GlobalAlert status="warning">
                    <GlobalAlert.Header>
                        <GlobalAlert.Title>Du har ikke tilgang til å se denne behandlingen.</GlobalAlert.Title>
                    </GlobalAlert.Header>
                </GlobalAlert>
            );
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return (
                <GlobalAlert status="error">
                    <GlobalAlert.Header>
                        <GlobalAlert.Title>{behandlingRessurs.frontendFeilmelding}</GlobalAlert.Title>
                    </GlobalAlert.Header>
                </GlobalAlert>
            );
        default:
            return <div />;
    }
}
