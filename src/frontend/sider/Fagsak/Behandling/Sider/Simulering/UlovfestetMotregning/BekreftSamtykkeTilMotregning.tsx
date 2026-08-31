import { useOppdaterTilbakekrevingsvedtakMotregning } from '@hooks/useOppdaterTilbakekrevingsvedtakMotregning';
import { useSlettTilbakekrevingsvedtakMotregning } from '@hooks/useSlettTilbakekrevingsvedtakMotregning';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, ErrorMessage, HStack, InfoCard, VStack } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';

export function BekreftSamtykkeTilMotregning() {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const {
        mutate: oppdaterTilbakekrevingsvedtakMotregning,
        isPending: oppdaterer,
        error: oppdaterError,
    } = useOppdaterTilbakekrevingsvedtakMotregning({
        onSuccess: oppdatertBehandling => settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling)),
    });

    const {
        mutate: slettTilbakekrevingsvedtakMotregning,
        isPending: sletter,
        error: slettError,
    } = useSlettTilbakekrevingsvedtakMotregning({
        onSuccess: oppdatertBehandling => settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling)),
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
