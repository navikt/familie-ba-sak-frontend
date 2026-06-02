import { useFagsakIdParam } from '@hooks/useFagsakIdParam';
import { useHentFagsak } from '@hooks/useHentFagsak';
import { useHentPerson } from '@hooks/useHentPerson';
import { useScrollTilAnker } from '@hooks/useScrollTilAnker';
import { useSyncModiaContext } from '@hooks/useSyncModiaContext';
import { Personlinje } from '@komponenter/Personlinje/Personlinje';
import { FagsakType } from '@typer/fagsak';
import { Outlet } from 'react-router';

import { Box, GlobalAlert, HStack, Loader } from '@navikt/ds-react';

import { BrukerProvider } from './BrukerContext';
import Styles from './FagsakContainer.module.css';
import { FagsakProvider } from './FagsakContext';
import { ManuelleBrevmottakerePåFagsakProvider } from './ManuelleBrevmottakerePåFagsakContext';

export function FagsakContainer() {
    const fagsakIdParam = useFagsakIdParam();

    const { data: fagsak, isPending: isPendingFagsak, error: fagsakError } = useHentFagsak(fagsakIdParam);

    const ident = fagsak?.fagsakType === FagsakType.SKJERMET_BARN ? fagsak?.fagsakeier : fagsak?.søkerFødselsnummer;

    const { data: bruker, isPending: isPendingBruker, error: brukerError } = useHentPerson({ ident });

    useScrollTilAnker();
    useSyncModiaContext(bruker);

    if (isPendingFagsak) {
        return (
            <HStack gap={'space-16'} margin={'space-16'}>
                <Loader size={'small'} />
                Laster fagsak...
            </HStack>
        );
    }

    if (fagsakError) {
        return (
            <Box margin={'space-8'}>
                <GlobalAlert status={'error'}>
                    <GlobalAlert.Header>
                        <GlobalAlert.Title>Feil oppstod ved innlasting av fagsak</GlobalAlert.Title>
                    </GlobalAlert.Header>
                    <GlobalAlert.Content>{fagsakError.message}</GlobalAlert.Content>
                </GlobalAlert>
            </Box>
        );
    }

    if (isPendingBruker) {
        return (
            <HStack gap={'space-16'} margin={'space-16'}>
                <Loader size={'small'} />
                Laster bruker...
            </HStack>
        );
    }

    if (brukerError) {
        return (
            <Box padding={'space-8'}>
                <GlobalAlert status={'error'}>
                    <GlobalAlert.Header>
                        <GlobalAlert.Title>Feil oppstod ved innlasting av bruker</GlobalAlert.Title>
                    </GlobalAlert.Header>
                    <GlobalAlert.Content>{brukerError.message}</GlobalAlert.Content>
                </GlobalAlert>
            </Box>
        );
    }

    return (
        <Box className={Styles.container}>
            <FagsakProvider fagsak={fagsak}>
                <BrukerProvider bruker={bruker}>
                    <ManuelleBrevmottakerePåFagsakProvider key={fagsak.id}>
                        <Personlinje bruker={bruker} fagsak={fagsak} />
                        <Outlet />
                    </ManuelleBrevmottakerePåFagsakProvider>
                </BrukerProvider>
            </FagsakProvider>
        </Box>
    );
}
