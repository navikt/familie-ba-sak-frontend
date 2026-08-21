import { useBehandling } from '@hooks/useBehandling';
import { useFagsakId } from '@hooks/useFagsakId';
import { useHentHarÅpenTilbakekreving } from '@hooks/useHentHarÅpenTilbakekreving';
import { useHentSimulering } from '@hooks/useHentSimulering';
import { BodyShort, Box, ErrorMessage, Loader, LocalAlert, Stack, VStack } from '@navikt/ds-react';
import { SimuleringProvider } from '@sider/Fagsak/Behandling/Sider/Simulering/SimuleringContext';
import { erDefinert } from '@utils/commons';
import type { PropsWithChildren } from 'react';

export function SimuleringContainer({ children }: PropsWithChildren) {
    const fagsakId = useFagsakId();
    const behandling = useBehandling();

    const {
        data: simulering,
        isPending: simuleringIsPending,
        error: simuleringError,
    } = useHentSimulering(behandling.behandlingId);

    // Åpen tilbakekreving er kun relevant når simuleringen har en feilutbetaling eller en avregning.
    const skalHenteHarÅpenTilbakekreving =
        erDefinert(simulering) && (simulering.feilutbetaling > 0 || simulering.avregningsperioder.length > 0);

    const {
        data: harÅpenTilbakekreving,
        isLoading: harÅpenTilbakekrevingIsLoading,
        error: harÅpenTilbakekrevingError,
    } = useHentHarÅpenTilbakekreving(fagsakId, { enabled: skalHenteHarÅpenTilbakekreving });

    if (simuleringIsPending || harÅpenTilbakekrevingIsLoading) {
        return (
            <Box margin={'space-48'}>
                <Stack direction={'row'} justify={'center'} align={'center'} gap={'space-8'}>
                    <Loader size={'medium'} />
                    <BodyShort weight={'semibold'}>Laster simulering...</BodyShort>
                </Stack>
            </Box>
        );
    }

    // En feil på åpen tilbakekreving skal ikke skjule simuleringen. Den vises i tilbakekrevingsskjemaet i stedet.
    if (simuleringError) {
        return (
            <Box margin={'space-48'}>
                <LocalAlert status={'error'}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>En teknisk feil oppstod.</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>
                        <VStack gap={'space-16'}>
                            Klarte ikke å hente inn simuleringen.
                            <ErrorMessage>{simuleringError.message}</ErrorMessage>
                        </VStack>
                    </LocalAlert.Content>
                </LocalAlert>
            </Box>
        );
    }

    return (
        <SimuleringProvider
            simulering={simulering}
            harÅpenTilbakekreving={harÅpenTilbakekreving ?? false}
            harÅpenTilbakekrevingError={harÅpenTilbakekrevingError}
        >
            {children}
        </SimuleringProvider>
    );
}
