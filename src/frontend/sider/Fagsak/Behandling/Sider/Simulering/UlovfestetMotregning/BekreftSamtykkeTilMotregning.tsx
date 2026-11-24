import { queryKeys } from '@hooks/keys/queryKeys';
import { useOppdaterTilbakekrevingsvedtakMotregning } from '@hooks/useOppdaterTilbakekrevingsvedtakMotregning';
import { useSlettTilbakekrevingsvedtakMotregning } from '@hooks/useSlettTilbakekrevingsvedtakMotregning';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, ErrorMessage, HStack, InfoCard, VStack } from '@navikt/ds-react';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/BehandlingContext';
import { useQueryClient } from '@tanstack/react-query';

export function BekreftSamtykkeTilMotregning() {
    const queryClient = useQueryClient();

    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const {
        mutate: oppdaterTilbakekrevingsvedtakMotregning,
        isPending: oppdaterer,
        error: oppdaterError,
    } = useOppdaterTilbakekrevingsvedtakMotregning({
        onSuccess: oppdatertBehandling => {
            queryClient.setQueryData(queryKeys.behandling(oppdatertBehandling), oppdatertBehandling);
            settÅpenBehandling(oppdatertBehandling);
        },
    });

    const {
        mutate: slettTilbakekrevingsvedtakMotregning,
        isPending: sletter,
        error: slettError,
    } = useSlettTilbakekrevingsvedtakMotregning({
        onSuccess: oppdatertBehandling => {
            queryClient.setQueryData(queryKeys.behandling(oppdatertBehandling), oppdatertBehandling);
            settÅpenBehandling(oppdatertBehandling);
        },
    });

    const error = oppdaterError ?? slettError;

    return (
        <InfoCard data-color="info">
            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                <BodyLong spacing>
                    Bruker har samtykket til at vi venter med etterbetalingen til vi har vurdert feilutbetalingen
                </BodyLong>
                <VStack gap="space-16">
                    <HStack gap="space-16" justify="center">
                        <Button
                            onClick={() =>
                                slettTilbakekrevingsvedtakMotregning({ behandlingId: behandling.behandlingId })
                            }
                            loading={sletter}
                            disabled={sletter || oppdaterer}
                            variant="secondary"
                        >
                            Nei
                        </Button>
                        <Button
                            onClick={() =>
                                oppdaterTilbakekrevingsvedtakMotregning({
                                    behandlingId: behandling.behandlingId,
                                    tilbakekrevingsvedtakMotregning: { samtykke: true },
                                })
                            }
                            loading={oppdaterer}
                            disabled={oppdaterer || sletter}
                        >
                            Ja
                        </Button>
                    </HStack>
                    {error && <ErrorMessage>{error.message}</ErrorMessage>}
                </VStack>
            </InfoCard.Message>
        </InfoCard>
    );
}
