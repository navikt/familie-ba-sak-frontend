import { useBehandling } from '@hooks/useBehandling';
import { useBehandlingIdParam } from '@hooks/useBehandlingIdParam';
import { useBruker } from '@hooks/useBruker';
import { useFagsak } from '@hooks/useFagsak';
import { erNyttOppsett, Konsept, useKonsept } from '@hooks/useKonsept';
import { BehandlingPåVentAlert } from '@komponenter/Alert/BehandlingPåVentAlert';
import { NotFound } from '@komponenter/Error/NotFound';
import { Personlinje } from '@komponenter/Personlinje/Personlinje';
import { Behandlingshandlinger } from '@komponenter/Saklinje/Behandlingshandlinger';
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
import { Oppgavemeny } from './Oppgavemeny/Oppgavemeny';
import { Personmeny } from './Personmeny/Personmeny';
import { KorrigerEtterbetalingModal } from './Sider/Vedtak/KorrigerEtterbetaling/KorrigerEtterbetalingModal';
import { Stegvelger } from './Stegvelger/Stegvelger';
import { Venstremeny } from './Venstremeny/Venstremeny';

function Høyrekolonne() {
    return (
        <Box className={Styles.høyreKolonne}>
            <TotrinnskontrollModalContextProvider>
                <TabContextProvider>
                    <Høyremeny />
                </TabContextProvider>
            </TotrinnskontrollModalContextProvider>
        </Box>
    );
}

/** Dagens løsning: stegene i venstremenyen og behandlingslinjen under personlinjen. */
function DagensOppsett() {
    return (
        <VStack className={Styles.skrollbarStack}>
            <Behandlingslinje />
            <HStack className={Styles.skrollbarStack}>
                <Box className={Styles.venstreKolonne}>
                    <Venstremeny />
                </Box>
                <Box className={Styles.midtreKolonne}>
                    <Outlet />
                </Box>
                <Høyrekolonne />
            </HStack>
        </VStack>
    );
}

/**
 * Konsept 2 og 3: personlinjen med behandlingens handlinger og stegene øverst. Venstremenyen viser personer
 * (konsept 2) eller oppgaver (konsept 3).
 */
function NyttOppsett({ konsept }: { konsept: Konsept }) {
    const behandling = useBehandling();
    const fagsak = useFagsak();
    const bruker = useBruker();

    return (
        <HStack className={Styles.skrollbarStack} wrap={false}>
            <VStack className={classNames(Styles.skrollbarStack, Styles.hovedområde)}>
                <Personlinje bruker={bruker} fagsak={fagsak} handlinger={<Behandlingshandlinger />} />
                <Stegvelger />
                {konsept === Konsept.KONSEPT_3 && behandling.aktivSettPåVent && (
                    <Box padding="space-16" borderWidth="0 0 1 0" borderColor="neutral-subtle">
                        <BehandlingPåVentAlert plassering="topp" />
                    </Box>
                )}
                <HStack className={Styles.skrollbarStack} wrap={false}>
                    {behandling.personResultater.length > 0 && (
                        <Box className={Styles.venstreKolonne}>
                            {konsept === Konsept.KONSEPT_3 ? <Oppgavemeny /> : <Personmeny />}
                        </Box>
                    )}
                    <Box className={Styles.midtreKolonne}>
                        <Outlet />
                    </Box>
                </HStack>
            </VStack>
            <Høyrekolonne />
        </HStack>
    );
}

export function Behandling() {
    const { behandlingRessurs } = useHentOgSettBehandlingContext();

    const behandlingIdParam = useBehandlingIdParam();
    const fagsak = useFagsak();
    const bruker = useBruker();
    const konsept = useKonsept();
    // I dagens løsning rendrer Fagsak personlinjen, også mens behandlingen lastes
    const personlinje = erNyttOppsett(konsept) && <Personlinje bruker={bruker} fagsak={fagsak} />;

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
                        {konsept === Konsept.DAGENS ? <DagensOppsett /> : <NyttOppsett konsept={konsept} />}
                    </KontrollsiderProvider>
                </BehandlingProvider>
            );
        }
        case RessursStatus.IKKE_TILGANG:
            return (
                <>
                    {personlinje}
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
                    {personlinje}
                    <GlobalAlert status="error">
                        <GlobalAlert.Header>
                            <GlobalAlert.Title>{behandlingRessurs.frontendFeilmelding}</GlobalAlert.Title>
                        </GlobalAlert.Header>
                    </GlobalAlert>
                </>
            );
        default:
            return personlinje || <div />;
    }
}
