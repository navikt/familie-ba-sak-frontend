import { useEffect } from 'react';

import { useBehandlingIdParam } from '@hooks/useBehandlingIdParam';
import { NotFound } from '@komponenter/Error/NotFound';
import { Behandlingslinje } from '@komponenter/Saklinje/Behandlingslinje';
import { HenleggBehandlingModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingModal';
import { HenleggBehandlingVeivalgModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingVeivalgModal';
import { type SideId, sider } from '@sider/Fagsak/Behandling/Sider/sider';
import { hentSideHref } from '@utils/miljø';
import { Outlet, useLocation } from 'react-router';

import { Box, GlobalAlert, HStack, VStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import Styles from './BehandlingContainer.module.css';
import { BehandlingProvider, useBehandlingContext } from './context/BehandlingContext';
import { useHentOgSettBehandlingContext } from './context/HentOgSettBehandlingContext';
import { Høyremeny } from './Høyremeny/Høyremeny';
import { TabContextProvider } from './Høyremeny/TabContextProvider';
import { TotrinnskontrollModalContextProvider } from './Høyremeny/Totrinnskontroll/TotrinnskontrollModalContextProvider';
import { KorrigerEtterbetalingModal } from './Sider/Vedtak/KorrigerEtterbetaling/KorrigerEtterbetalingModal';
import { Venstremeny } from './Venstremeny/Venstremeny';

/**
 * Dette er gjort fordi useEffecten her må kjøre etter at useEffectene i BehandlingProvider er kjørt. Ellers visker
 * den tilstand og viser masse "undefined" i GUI. Dette skjer spesielt hvis man er inne på vedtakssiden f.eks. og
 * refresher siden. Burde skrive en bedre logikk.
 */
export function OutletContainer() {
    const { leggTilBesøktSide } = useBehandlingContext();
    const location = useLocation();

    const sidevisning = hentSideHref(location.pathname);

    useEffect(() => {
        if (sidevisning) {
            leggTilBesøktSide(Object.entries(sider).find(([_, side]) => side.href === sidevisning)?.[0] as SideId);
        }
    }, [sidevisning]);

    return <Outlet />;
}

export function BehandlingContainer() {
    const { behandlingRessurs } = useHentOgSettBehandlingContext();

    const behandlingIdParam = useBehandlingIdParam();

    if (!behandlingIdParam) {
        return <NotFound />;
    }

    switch (behandlingRessurs.status) {
        case RessursStatus.SUKSESS:
            return (
                <BehandlingProvider behandling={behandlingRessurs.data}>
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
                                <OutletContainer />
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
