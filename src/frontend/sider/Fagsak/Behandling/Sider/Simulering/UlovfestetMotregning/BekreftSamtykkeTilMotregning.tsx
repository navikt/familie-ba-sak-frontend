import { queryKeys } from '@hooks/keys/queryKeys';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useOppdaterTilbakekrevingsvedtakMotregning } from '@hooks/useOppdaterTilbakekrevingsvedtakMotregning';
import { useSlettTilbakekrevingsvedtakMotregning } from '@hooks/useSlettTilbakekrevingsvedtakMotregning';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, ErrorMessage, HStack, InfoCard, VStack } from '@navikt/ds-react';
import { useQueryClient } from '@tanstack/react-query';

export function BekreftSamtykkeTilMotregning() {
    const behandlingId = useBehandlingId();
    const queryClient = useQueryClient();

    const {
        mutate: oppdaterTilbakekrevingsvedtakMotregning,
        isPending: oppdaterer,
        error: oppdaterError,
    } = useOppdaterTilbakekrevingsvedtakMotregning({
        onSuccess: lagretTilbakekrevingsvedtakMotregning => {
            queryClient.setQueryData(
                queryKeys.tilbakekrevingsvedtakMotregning(behandlingId),
                lagretTilbakekrevingsvedtakMotregning
            );
            queryClient.invalidateQueries({ queryKey: queryKeys.historikkinnslag(behandlingId) });
        },
    });

    const {
        mutate: slettTilbakekrevingsvedtakMotregning,
        isPending: sletter,
        error: slettError,
    } = useSlettTilbakekrevingsvedtakMotregning({
        onSuccess: () => {
            queryClient.setQueryData(queryKeys.tilbakekrevingsvedtakMotregning(behandlingId), null);
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
                            onClick={() => slettTilbakekrevingsvedtakMotregning({ behandlingId })}
                            loading={sletter}
                            disabled={sletter || oppdaterer}
                            variant="secondary"
                        >
                            Nei
                        </Button>
                        <Button
                            onClick={() =>
                                oppdaterTilbakekrevingsvedtakMotregning({
                                    behandlingId,
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
