import { useBehandlingIdParam } from '@hooks/useBehandlingIdParam';
import { useBruker } from '@hooks/useBruker';
import { useFagsak } from '@hooks/useFagsak';
import { NotFound } from '@komponenter/Error/NotFound';
import { Personlinje } from '@komponenter/Personlinje/Personlinje';
import { Behandlingslinje } from '@komponenter/Saklinje/Behandlingslinje';
import { HenleggBehandlingModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingModal';
import { HenleggBehandlingVeivalgModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingVeivalgModal';
import { Box, GlobalAlert, HStack, VStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';
import { KontrollsiderProvider } from '@sider/Fagsak/Behandling/KontrollsiderContext';
import classNames from 'classnames';
import { Outlet } from 'react-router';

import Styles from './Behandling.module.css';
import { BehandlingProvider } from './context/BehandlingContext';
import { useHentOgSettBehandlingContext } from './context/HentOgSettBehandlingContext';
import { Høyremeny } from './Høyremeny/Høyremeny';
import { TabContextProvider } from './Høyremeny/TabContextProvider';
import { TotrinnskontrollModalContextProvider } from './Høyremeny/Totrinnskontroll/TotrinnskontrollModalContextProvider';
import { Personmeny } from './Personmeny/Personmeny';
import { KorrigerEtterbetalingModal } from './Sider/Vedtak/KorrigerEtterbetaling/KorrigerEtterbetalingModal';
import { Stegvelger } from './Stegvelger/Stegvelger';

export function Behandling() {
    const { behandlingRessurs } = useHentOgSettBehandlingContext();

    const behandlingIdParam = useBehandlingIdParam();
    const fagsak = useFagsak();
    const bruker = useBruker();

    if (!behandlingIdParam) {
        return <NotFound />;
    }

    switch (behandlingRessurs.status) {
        case RessursStatus.SUKSESS: {
            const behandling = behandlingRessurs.data;
            return (
                <BehandlingProvider key={behandling.behandlingId} behandling={behandling}>
                    <KontrollsiderProvider>
                        <HenleggBehandlingModal />
                        <HenleggBehandlingVeivalgModal />
                        <KorrigerEtterbetalingModal />
                        <HStack className={Styles.skrollbarStack} wrap={false}>
                            <VStack className={classNames(Styles.skrollbarStack, Styles.hovedområde)}>
                                <Personlinje bruker={bruker} fagsak={fagsak} handlinger={<Behandlingslinje />} />
                                <Stegvelger />
                                <HStack className={Styles.skrollbarStack} wrap={false}>
                                    {behandling.personResultater.length > 0 && (
                                        <Box className={Styles.venstreKolonne}>
                                            <Personmeny />
                                        </Box>
                                    )}
                                    <Box className={Styles.midtreKolonne}>
                                        <Outlet />
                                    </Box>
                                </HStack>
                            </VStack>
                            <Box className={Styles.høyreKolonne}>
                                <TotrinnskontrollModalContextProvider>
                                    <TabContextProvider>
                                        <Høyremeny />
                                    </TabContextProvider>
                                </TotrinnskontrollModalContextProvider>
                            </Box>
                        </HStack>
                    </KontrollsiderProvider>
                </BehandlingProvider>
            );
        }
        case RessursStatus.IKKE_TILGANG:
            return (
                <>
                    <Personlinje bruker={bruker} fagsak={fagsak} />
                    <GlobalAlert status="warning">
                        <GlobalAlert.Header>
                            <GlobalAlert.Title>Du har ikke tilgang til å se denne behandlingen.</GlobalAlert.Title>
                        </GlobalAlert.Header>
                    </GlobalAlert>
                </>
            );
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return (
                <>
                    <Personlinje bruker={bruker} fagsak={fagsak} />
                    <GlobalAlert status="error">
                        <GlobalAlert.Header>
                            <GlobalAlert.Title>{behandlingRessurs.frontendFeilmelding}</GlobalAlert.Title>
                        </GlobalAlert.Header>
                    </GlobalAlert>
                </>
            );
        default:
            return <Personlinje bruker={bruker} fagsak={fagsak} />;
    }
}
