import { useBehandling } from '@hooks/useBehandling';
import { useBruker } from '@hooks/useBruker';
import { useFagsak } from '@hooks/useFagsak';
import { erNyttOppsett, Konsept, useKonsept } from '@hooks/useKonsept';
import { BehandlingPåVentAlert } from '@komponenter/Alert/BehandlingPåVentAlert';
import { Personlinje } from '@komponenter/Personlinje/Personlinje';
import { Behandlingshandlinger } from '@komponenter/Saklinje/Behandlingshandlinger';
import { Behandlingslinje } from '@komponenter/Saklinje/Behandlingslinje';
import { Box, HStack, VStack } from '@navikt/ds-react';
import classNames from 'classnames';
import { Outlet } from 'react-router';

import Styles from './Behandling.module.css';
import { Høyremeny } from './Høyremeny/Høyremeny';
import { TabContextProvider } from './Høyremeny/TabContextProvider';
import { TotrinnskontrollModalContextProvider } from './Høyremeny/Totrinnskontroll/TotrinnskontrollModalContextProvider';
import { Oppgavemeny } from './Oppgavemeny/Oppgavemeny';
import { Personmeny } from './Personmeny/Personmeny';
import { Stegvelger } from './Stegvelger/Stegvelger';
import { UgyldigSideAdvarsel } from './UgyldigSideAdvarsel';
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
            <UgyldigSideAdvarsel />
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
                <UgyldigSideAdvarsel />
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

/** Oppsettet av en lastet behandling, etter konseptet som er valgt i headeren. */
export function BehandlingOppsett() {
    const konsept = useKonsept();

    return konsept === Konsept.DAGENS ? <DagensOppsett /> : <NyttOppsett konsept={konsept} />;
}

/**
 * Personlinjen mens behandlingen lastes eller har feilet. I dagens løsning rendrer Fagsak personlinjen selv, så her
 * vises den bare i det nye oppsettet.
 */
export function PersonlinjeUtenBehandling() {
    const fagsak = useFagsak();
    const bruker = useBruker();
    const konsept = useKonsept();

    if (!erNyttOppsett(konsept)) {
        return null;
    }

    return <Personlinje bruker={bruker} fagsak={fagsak} />;
}
