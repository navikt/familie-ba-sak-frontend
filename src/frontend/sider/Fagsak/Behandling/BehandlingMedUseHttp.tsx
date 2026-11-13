import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { useSkalObfuskereData } from '@hooks/useSkalObfuskereData';
import { Behandlingslinje } from '@komponenter/Saklinje/Behandlingslinje';
import { HenleggBehandlingModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingModal';
import { HenleggBehandlingVeivalgModal } from '@komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingVeivalgModal';
import { Box, GlobalAlert, HStack, VStack } from '@navikt/ds-react';
import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggSuksessRessurs,
    byggTomRessurs,
    type Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';
import { KontrollsiderProvider } from '@sider/Fagsak/Behandling/KontrollsiderContext';
import { BehandlerRolle, type IBehandling } from '@typer/behandling';
import { obfuskerBehandling } from '@utils/obfuskerData';
import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
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

export function BehandlingMedUseHttp({ behandlingId }: Props) {
    const { request } = useHttp();

    const skalObfuskereData = useSkalObfuskereData();
    const saksbehandler = useSaksbehandler();

    const [behandlingRessurs, settBehandlingRessurs] = useState<Ressurs<IBehandling>>(byggTomRessurs());

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

    switch (behandlingRessurs.status) {
        case RessursStatus.SUKSESS: {
            const behandling = behandlingRessurs.data;
            return (
                <BehandlingProvider
                    key={behandling.behandlingId}
                    behandling={behandling}
                    settBehandling={behandling => settBehandlingRessurs(byggSuksessRessurs(behandling))}
                >
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
