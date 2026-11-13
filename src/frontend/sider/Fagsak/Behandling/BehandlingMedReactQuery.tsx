import { HentBehandlingQueryKeyFactory, useHentBehandling } from '@hooks/useHentBehandling';
import { Behandlingslinje } from '@komponenter/Saklinje/Behandlingslinje';
import { HenleggBehandlingModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingModal';
import { HenleggBehandlingVeivalgModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingVeivalgModal';
import { Box, GlobalAlert, HStack, Loader, VStack } from '@navikt/ds-react';
import { KontrollsiderProvider } from '@sider/Fagsak/Behandling/KontrollsiderContext';
import { useQueryClient } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import { Outlet } from 'react-router';

import Styles from './Behandling.module.css';
import { BehandlingProvider } from './context/BehandlingContext';
import { Høyremeny } from './Høyremeny/Høyremeny';
import { TabContextProvider } from './Høyremeny/TabContextProvider';
import { TotrinnskontrollModalContextProvider } from './Høyremeny/Totrinnskontroll/TotrinnskontrollModalContextProvider';
import { KorrigerEtterbetalingModal } from './Sider/Vedtak/KorrigerEtterbetaling/KorrigerEtterbetalingModal';
import { Venstremeny } from './Venstremeny/Venstremeny';

interface Props {
    behandlingId: number;
}

export function BehandlingMedReactQuery({ behandlingId }: Props) {
    const queryClient = useQueryClient();

    const {
        data: behandling,
        isPending: behandlingIsPending,
        error: behandlingError,
    } = useHentBehandling(behandlingId);

    function settBehandling(oppdatertBehandling: IBehandling) {
        queryClient.setQueryData(
            HentBehandlingQueryKeyFactory.behandling(oppdatertBehandling.behandlingId),
            oppdatertBehandling
        );
    }

    if (behandlingIsPending) {
        return (
            <HStack gap={'space-16'} margin={'space-16'}>
                <Loader size={'small'} />
                Laster behandling...
            </HStack>
        );
    }

    if (behandlingError) {
        return (
            <Box margin={'space-8'}>
                <GlobalAlert status={'error'}>
                    <GlobalAlert.Header>
                        <GlobalAlert.Title>Feil oppstod ved innlasting av behandling</GlobalAlert.Title>
                    </GlobalAlert.Header>
                    <GlobalAlert.Content>{behandlingError.message}</GlobalAlert.Content>
                </GlobalAlert>
            </Box>
        );
    }

    return (
        <BehandlingProvider key={behandling.behandlingId} behandling={behandling} settBehandling={settBehandling}>
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
}
