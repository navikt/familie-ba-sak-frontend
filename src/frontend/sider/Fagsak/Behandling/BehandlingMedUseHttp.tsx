import { useHentBrevmottakere } from '@hooks/useHentBrevmottakere';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { Behandlingslinje } from '@komponenter/Saklinje/Behandlingslinje';
import { HenleggBehandlingModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingModal';
import { HenleggBehandlingVeivalgModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingVeivalgModal';
import { Box, GlobalAlert, HStack, Loader, VStack } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggSuksessRessurs,
    byggTomRessurs,
    type Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';
import { BrevmottakereBehandlingProvider } from '@sider/Fagsak/Behandling/BrevmottakereBehandlingContext';
import { KontrollsiderProvider } from '@sider/Fagsak/Behandling/KontrollsiderContext';
import { BehandlerRolle, type IBehandling } from '@typer/behandling';
import { obfuskerBehandling } from '@utils/obfuskerData';
import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Styles from './Behandling.module.css';
import { BehandlingProvider } from './BehandlingContext';
import { Høyremeny } from './Høyremeny/Høyremeny';
import { TabContextProvider } from './Høyremeny/TabContextProvider';
import { TotrinnskontrollModalContextProvider } from './Høyremeny/Totrinnskontroll/TotrinnskontrollModalContextProvider';
import { UgyldigSideAdvarsel } from './UgyldigSideAdvarsel';
import { Venstremeny } from './Venstremeny/Venstremeny';

interface Props {
    behandlingId: number;
}

export function BehandlingMedUseHttp({ behandlingId }: Props) {
    const { request } = useHttp();

    const skalObfuskereData = useSkalObfuskereData();
    const saksbehandler = useSaksbehandler();

    const [behandlingRessurs, settBehandlingRessurs] = useState<Ressurs<IBehandling>>(byggTomRessurs());

    const {
        data: brevmottakere,
        isPending: brevmottakereIsPending,
        error: brevmottakereError,
    } = useHentBrevmottakere(behandlingId);

    useEffect(() => {
        settBehandlingRessurs(byggTomRessurs());

        const requestBasertPåBehandlerRolle = () => {
            if (saksbehandler.rolle === BehandlerRolle.BESLUTTER) {
                return request<void, IBehandling>({
                    method: 'PUT',
                    url: `/familie-ba-sak/api/behandlinger/${behandlingId}/oppdatert-valutakurs`,
                    påvirkerSystemLaster: true,
                });
            } else {
                return request<void, IBehandling>({
                    method: 'GET',
                    url: `/familie-ba-sak/api/behandlinger/${behandlingId}`,
                    påvirkerSystemLaster: true,
                });
            }
        };

        requestBasertPåBehandlerRolle()
            .then(response => {
                if (skalObfuskereData && response.status === RessursStatus.SUKSESS) {
                    obfuskerBehandling(response.data);
                }
                settBehandlingRessurs(response);
            })
            .catch((_error: AxiosError) => {
                settBehandlingRessurs(byggFeiletRessurs('Ukjent ved innhenting av behandling'));
            });
    }, [behandlingId]);

    if (behandlingRessurs.status === RessursStatus.IKKE_HENTET) {
        return <div />;
    }

    if (behandlingRessurs.status === RessursStatus.HENTER || brevmottakereIsPending) {
        return (
            <HStack gap={'space-16'} margin={'space-16'}>
                <Loader size={'small'} />
                Laster behandling...
            </HStack>
        );
    }

    if (behandlingRessurs.status === RessursStatus.IKKE_TILGANG) {
        return (
            <GlobalAlert status="warning">
                <GlobalAlert.Header>
                    <GlobalAlert.Title>Du har ikke tilgang til å se denne behandlingen.</GlobalAlert.Title>
                </GlobalAlert.Header>
            </GlobalAlert>
        );
    }

    if (
        behandlingRessurs.status === RessursStatus.FEILET ||
        behandlingRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
        brevmottakereError
    ) {
        return (
            <GlobalAlert status="error">
                <GlobalAlert.Header>
                    <GlobalAlert.Title>Feil oppstod ved innlasting av behandling.</GlobalAlert.Title>
                </GlobalAlert.Header>
                <GlobalAlert.Content>
                    {behandlingRessurs.status === RessursStatus.SUKSESS
                        ? brevmottakereError?.message
                        : behandlingRessurs.frontendFeilmelding}
                </GlobalAlert.Content>
            </GlobalAlert>
        );
    }

    const behandling = behandlingRessurs.data;

    return (
        <BehandlingProvider
            key={behandling.behandlingId}
            behandling={behandling}
            settBehandling={behandling => {
                if (skalObfuskereData) {
                    obfuskerBehandling(behandling);
                }
                settBehandlingRessurs(byggSuksessRessurs(behandling));
            }}
        >
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
