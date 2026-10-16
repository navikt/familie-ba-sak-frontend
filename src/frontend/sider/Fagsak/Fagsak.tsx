import { useFagsakIdParam } from '@hooks/useFagsakIdParam';
import { useHentDistribusjonskanal } from '@hooks/useHentDistribusjonskanal';
import { useHentFagsak } from '@hooks/useHentFagsak';
import { useHentPerson } from '@hooks/useHentPerson';
import { useScrollTilAnker } from '@hooks/useScrollTilAnker';
import { useSyncModiaContext } from '@hooks/useSyncModiaContext';
import { NotFound } from '@komponenter/Error/NotFound';
import { Personlinje } from '@komponenter/Personlinje/Personlinje';
import { Box, GlobalAlert, HStack, Loader } from '@navikt/ds-react';
import { FagsakType } from '@typer/fagsak';
import { Outlet } from 'react-router';
import { BrevmottakereFagsakProvider } from './BrevmottakereFagsakContext';
import { BrukerProvider } from './BrukerContext';
import { DistribusjonskanalProvider } from './DistribusjonskanalProvider';
import Styles from './Fagsak.module.css';
import { FagsakProvider } from './FagsakContext';

export function Fagsak() {
    const fagsakIdParam = useFagsakIdParam();

    const { data: fagsak, isPending: isPendingFagsak, error: fagsakError } = useHentFagsak(fagsakIdParam);

    const ident = fagsak?.fagsakType === FagsakType.SKJERMET_BARN ? fagsak?.fagsakeier : fagsak?.søkerFødselsnummer;

    const { data: bruker, isPending: isPendingBruker, error: brukerError } = useHentPerson({ ident });

    const {
        data: distribusjonskanal,
        isPending: isPendingDistribusjonskanal,
        error: distribusjonskanalError,
    } = useHentDistribusjonskanal(bruker?.personIdent);

    useScrollTilAnker();
    useSyncModiaContext(bruker);

    if (!fagsakIdParam) {
        return <NotFound />;
    }

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

    if (isPendingDistribusjonskanal) {
        return (
            <HStack gap={'space-16'} margin={'space-16'}>
                <Loader size={'small'} />
                Laster distribusjonskanal...
            </HStack>
        );
    }

    const distribusjonskanalContext = distribusjonskanalError
        ? { distribusjonskanal: undefined, distribusjonskanalError }
        : { distribusjonskanal, distribusjonskanalError: undefined };

    return (
        <Box className={Styles.container}>
            <FagsakProvider key={fagsak.id} fagsak={fagsak}>
                <BrukerProvider key={bruker.personIdent} bruker={bruker}>
                    <DistribusjonskanalProvider context={distribusjonskanalContext}>
                        <BrevmottakereFagsakProvider>
                            <Personlinje bruker={bruker} fagsak={fagsak} />
                            <Outlet />
                        </BrevmottakereFagsakProvider>
                    </DistribusjonskanalProvider>
                </BrukerProvider>
            </FagsakProvider>
        </Box>
    );
}
