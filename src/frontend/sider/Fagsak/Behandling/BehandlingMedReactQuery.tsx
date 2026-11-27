import { ApiFeil, RessursStatus } from '@api/client/apiClient';
import { useHentBehandling } from '@hooks/useHentBehandling';
import { useHentBrevmottakere } from '@hooks/useHentBrevmottakere';
import { Behandlingslinje } from '@komponenter/Saklinje/Behandlingslinje';
import { HenleggBehandlingModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingModal';
import { HenleggBehandlingVeivalgModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingVeivalgModal';
import { Box, GlobalAlert, HStack, Loader, VStack } from '@navikt/ds-react';
import { KontrollsiderProvider } from '@sider/Fagsak/Behandling/KontrollsiderContext';
import { Outlet } from 'react-router';
import Styles from './Behandling.module.css';
import { BehandlingProvider } from './BehandlingContext';
import { BrevmottakereBehandlingProvider } from './BrevmottakereBehandlingContext';
import { Høyremeny } from './Høyremeny/Høyremeny';
import { TabContextProvider } from './Høyremeny/TabContextProvider';
import { TotrinnskontrollModalContextProvider } from './Høyremeny/Totrinnskontroll/TotrinnskontrollModalContextProvider';
import { UgyldigSideAdvarsel } from './UgyldigSideAdvarsel';
import { Venstremeny } from './Venstremeny/Venstremeny';

interface Props {
    behandlingId: number;
}

export function BehandlingMedReactQuery({ behandlingId }: Props) {
    const {
        data: behandling,
        isPending: behandlingIsPending,
        error: behandlingError,
    } = useHentBehandling(behandlingId);

    const {
        data: brevmottakere,
        isPending: brevmottakereIsPending,
        error: brevmottakereError,
    } = useHentBrevmottakere(behandlingId);

    if (behandlingIsPending || brevmottakereIsPending) {
        return (
            <HStack gap={'space-16'} margin={'space-16'}>
                <Loader size={'small'} />
                Laster behandling...
            </HStack>
        );
    }

    if (behandlingError || brevmottakereError) {
        const error = behandlingError ?? brevmottakereError;

        if (error instanceof ApiFeil && error.ressursStatus === RessursStatus.IKKE_TILGANG) {
            return (
                <Box margin={'space-8'}>
                    <GlobalAlert status={'warning'}>
                        <GlobalAlert.Header>
                            <GlobalAlert.Title>Du har ikke tilgang til å se denne behandlingen.</GlobalAlert.Title>
                        </GlobalAlert.Header>
                    </GlobalAlert>
                </Box>
            );
        }

        return (
            <Box margin={'space-8'}>
                <GlobalAlert status={'error'}>
                    <GlobalAlert.Header>
                        <GlobalAlert.Title>Feil oppstod ved innlasting av behandling</GlobalAlert.Title>
                    </GlobalAlert.Header>
                    <GlobalAlert.Content>{error?.message}</GlobalAlert.Content>
                </GlobalAlert>
            </Box>
        );
    }

    return (
        <BehandlingProvider key={behandling.behandlingId} behandling={behandling}>
            <BrevmottakereBehandlingProvider brevmottakere={brevmottakere}>
                <KontrollsiderProvider>
                    <HenleggBehandlingModal />
                    <HenleggBehandlingVeivalgModal />
                    <VStack className={Styles.skrollbarStack}>
                        <Behandlingslinje />
                        <UgyldigSideAdvarsel />
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
            </BrevmottakereBehandlingProvider>
        </BehandlingProvider>
    );
}
