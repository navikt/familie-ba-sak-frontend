import { useBehandling } from '@hooks/useBehandling';
import { useFagsakId } from '@hooks/useFagsakId';
import { useHentHarÅpenTilbakekreving } from '@hooks/useHentHarÅpenTilbakekreving';
import { useHentSimulering } from '@hooks/useHentSimulering';
import { useHentTilbakekreving } from '@hooks/useHentTilbakekreving';
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

    // Tilbakekrevingen og åpen tilbakekreving er kun relevante når simuleringen har en feilutbetaling eller en avregning.
    const skalHenteHarÅpenTilbakekreving =
        erDefinert(simulering) && (simulering.feilutbetaling > 0 || simulering.avregningsperioder.length > 0);

    const {
        data: tilbakekreving,
        isPending: tilbakekrevingIsPending,
        error: tilbakekrevingError,
    } = useHentTilbakekreving(behandling.behandlingId, { enabled: skalHenteHarÅpenTilbakekreving });

    const { data: harÅpenTilbakekreving, isPending: harÅpenTilbakekrevingIsPending } = useHentHarÅpenTilbakekreving(
        fagsakId,
        { enabled: skalHenteHarÅpenTilbakekreving }
    );

    if (
        simuleringIsPending ||
        (skalHenteHarÅpenTilbakekreving && (tilbakekrevingIsPending || harÅpenTilbakekrevingIsPending))
    ) {
        return (
            <Box margin={'space-48'}>
                <Stack direction={'row'} justify={'center'} align={'center'} gap={'space-8'}>
                    <Loader size={'medium'} />
                    <BodyShort weight={'semibold'}>Laster simulering...</BodyShort>
                </Stack>
            </Box>
        );
    }

    // En feil på åpen tilbakekreving skal ikke skjule simuleringen. TilbakekrevingForm leser den selv fra spørringen.
    if (simuleringError || tilbakekrevingError) {
        const errors = [simuleringError, tilbakekrevingError].filter(error => erDefinert(error));
        return (
            <Box margin={'space-48'}>
                <LocalAlert status={'error'}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>En teknisk feil oppstod.</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>
                        <VStack gap={'space-16'}>
                            Klarte ikke å hente inn simuleringen.
                            {errors.map(error => (
                                <ErrorMessage key={error.message}>{error.message}</ErrorMessage>
                            ))}
                        </VStack>
                    </LocalAlert.Content>
                </LocalAlert>
            </Box>
        );
    }

    return (
        <SimuleringProvider
            simulering={simulering}
            tilbakekreving={tilbakekreving ?? undefined}
            harÅpenTilbakekreving={harÅpenTilbakekreving ?? false}
        >
            {children}
        </SimuleringProvider>
    );
}
