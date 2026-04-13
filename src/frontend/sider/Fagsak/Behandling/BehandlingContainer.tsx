import React from 'react';

import { Alert, Box, HStack, VStack } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import Styles from './BehandlingContainer.module.css';
import { BehandlingRouter } from './BehandlingRouter';
import { BehandlingProvider } from './context/BehandlingContext';
import { useHentOgSettBehandlingContext } from './context/HentOgSettBehandlingContext';
import { Høyremeny } from './Høyremeny/Høyremeny';
import { KorrigerEtterbetalingModal } from './Sider/Vedtak/KorrigerEtterbetaling/KorrigerEtterbetalingModal';
import { Venstremeny } from './Venstremeny/Venstremeny';
import { Behandlingslinje } from '../../../komponenter/Saklinje/Behandlingslinje';
import { HenleggBehandlingModal } from '../../../komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingModal';
import { HenleggBehandlingVeivalgModal } from '../../../komponenter/Saklinje/Meny/HenleggBehandling/HenleggBehandlingVeivalgModal';

export function BehandlingContainer() {
    const { behandlingRessurs } = useHentOgSettBehandlingContext();

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
                                <BehandlingRouter />
                            </Box>
                            <Box className={Styles.høyreKolonne}>
                                <Høyremeny />
                            </Box>
                        </HStack>
                    </VStack>
                </BehandlingProvider>
            );
        case RessursStatus.IKKE_TILGANG:
            return <Alert variant={'warning'}>Du har ikke tilgang til å se denne behandlingen.</Alert>;
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return <Alert variant={'error'}>{behandlingRessurs.frontendFeilmelding}</Alert>;
        default:
            return <div />;
    }
}
