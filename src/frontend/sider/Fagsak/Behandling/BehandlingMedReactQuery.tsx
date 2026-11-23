import { ApiFeil, RessursStatus } from '@api/client/apiClient';
import { queryKeys } from '@hooks/keys/queryKeys';
import { useHentBehandling } from '@hooks/useHentBehandling';
import { HenleggBehandlingModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingModal';
import { HenleggBehandlingVeivalgModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingVeivalgModal';
import { Box, GlobalAlert, HStack, Loader } from '@navikt/ds-react';
import { KontrollsiderProvider } from '@sider/Fagsak/Behandling/KontrollsiderContext';
import { useQueryClient } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

import { BehandlingProvider } from './BehandlingContext';
import { BehandlingOppsett, PersonlinjeUtenBehandling } from './BehandlingOppsett';

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
        queryClient.setQueryData(queryKeys.behandling(oppdatertBehandling.behandlingId), oppdatertBehandling);
    }

    if (behandlingIsPending) {
        return (
            <>
                <PersonlinjeUtenBehandling />
                <HStack gap={'space-16'} margin={'space-16'}>
                    <Loader size={'small'} />
                    Laster behandling...
                </HStack>
            </>
        );
    }

    if (behandlingError instanceof ApiFeil && behandlingError.ressursStatus === RessursStatus.IKKE_TILGANG) {
        return (
            <>
                <PersonlinjeUtenBehandling />
                <Box margin={'space-8'}>
                    <GlobalAlert status={'warning'}>
                        <GlobalAlert.Header>
                            <GlobalAlert.Title>Du har ikke tilgang til å se denne behandlingen.</GlobalAlert.Title>
                        </GlobalAlert.Header>
                    </GlobalAlert>
                </Box>
            </>
        );
    }

    if (behandlingError) {
        return (
            <>
                <PersonlinjeUtenBehandling />
                <Box margin={'space-8'}>
                    <GlobalAlert status={'error'}>
                        <GlobalAlert.Header>
                            <GlobalAlert.Title>Feil oppstod ved innlasting av behandling</GlobalAlert.Title>
                        </GlobalAlert.Header>
                        <GlobalAlert.Content>{behandlingError.message}</GlobalAlert.Content>
                    </GlobalAlert>
                </Box>
            </>
        );
    }

    return (
        <BehandlingProvider key={behandling.behandlingId} behandling={behandling} settBehandling={settBehandling}>
            <KontrollsiderProvider>
                <HenleggBehandlingModal />
                <HenleggBehandlingVeivalgModal />
                <BehandlingOppsett />
            </KontrollsiderProvider>
        </BehandlingProvider>
    );
}
