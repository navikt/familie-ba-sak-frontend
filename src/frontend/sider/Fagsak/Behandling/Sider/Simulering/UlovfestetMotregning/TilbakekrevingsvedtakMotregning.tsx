import { useErLesevisning } from '@hooks/useErLesevisning';
import { useOppdaterTilbakekrevingsvedtakMotregning } from '@hooks/useOppdaterTilbakekrevingsvedtakMotregning';
import { useSlettTilbakekrevingsvedtakMotregning } from '@hooks/useSlettTilbakekrevingsvedtakMotregning';
import { ArrowUndoIcon, InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, ConfirmationPanel, ErrorMessage, Heading, InfoCard, VStack } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { AvregningAlert } from '@sider/Fagsak/Behandling/Sider/Simulering/UlovfestetMotregning/AvregningAlert';
import { BekreftSamtykkeTilMotregning } from '@sider/Fagsak/Behandling/Sider/Simulering/UlovfestetMotregning/BekreftSamtykkeTilMotregning';
import { dagerFristForAvventerSamtykkeUlovfestetMotregning } from '@sider/Fagsak/Behandling/Sider/Simulering/UlovfestetMotregning/konstanter';
import { SettPåVentÅrsak } from '@typer/behandling';
import type { IAvregningsperiode } from '@typer/simulering';
import type { TilbakekrevingsvedtakMotregningDTO } from '@typer/tilbakekrevingsvedtakMotregning';

interface Props {
    tilbakekrevingsvedtakMotregning: TilbakekrevingsvedtakMotregningDTO | null;
    avregningsperioder: IAvregningsperiode[];
}

export function TilbakekrevingsvedtakMotregning({ tilbakekrevingsvedtakMotregning, avregningsperioder }: Props) {
    const erLesevisning = useErLesevisning();

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

    const erBehandlingSattPåVentMedÅrsakAvventerSamtykke =
        behandling.aktivSettPåVent?.årsak === SettPåVentÅrsak.AVVENTER_SAMTYKKE_ULOVFESTET_MOTREGNING;

    return (
        <VStack marginBlock="space-40 space-0" width="90%" maxWidth="40rem" gap="space-16">
            {tilbakekrevingsvedtakMotregning === null && <AvregningAlert avregningsperioder={avregningsperioder} />}

            {tilbakekrevingsvedtakMotregning !== null && (
                <>
                    <Heading size="medium" level="2">
                        Tilbakekreving - ulovfestet motregning
                    </Heading>
                    {erBehandlingSattPåVentMedÅrsakAvventerSamtykke && (
                        <InfoCard data-color="info">
                            <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                                <InfoCard.Title>Samtykke for ulovfestet motregning</InfoCard.Title>
                            </InfoCard.Header>
                            <InfoCard.Content>
                                Saken venter på samtykke fra bruker for ulovfestet motregning. Hvis bruker har gitt
                                samtykke før det har gått {dagerFristForAvventerSamtykkeUlovfestetMotregning} dager, kan
                                saken tas av vent manuelt.
                            </InfoCard.Content>
                        </InfoCard>
                    )}

                    {!tilbakekrevingsvedtakMotregning.samtykke && !erLesevisning && <BekreftSamtykkeTilMotregning />}
                    {tilbakekrevingsvedtakMotregning.samtykke && (
                        <VStack gap="space-16">
                            <InfoCard data-color="info">
                                <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                                    Du må ha kjennskap til regelverk for tilbakekreving for å kunne fortsette
                                    saksbehandlingen.
                                </InfoCard.Message>
                            </InfoCard>

                            <ConfirmationPanel
                                checked={tilbakekrevingsvedtakMotregning.heleBeløpetSkalKrevesTilbake}
                                label="Hele beløpet skal kreves tilbake"
                                disabled={erLesevisning || oppdaterer}
                                onChange={() =>
                                    oppdaterTilbakekrevingsvedtakMotregning({
                                        behandlingId: behandling.behandlingId,
                                        tilbakekrevingsvedtakMotregning: {
                                            heleBeløpetSkalKrevesTilbake:
                                                !tilbakekrevingsvedtakMotregning.heleBeløpetSkalKrevesTilbake,
                                        },
                                    })
                                }
                            >
                                <Heading level="2" size="xsmall" spacing>
                                    Skal hele beløpet kreves tilbake?
                                </Heading>
                                <BodyShort>Dersom ikke hele beløpet skal kreves tilbake må du splitte saken.</BodyShort>
                            </ConfirmationPanel>

                            {!erLesevisning && (
                                <Box>
                                    <Button
                                        onClick={() =>
                                            slettTilbakekrevingsvedtakMotregning({
                                                behandlingId: behandling.behandlingId,
                                            })
                                        }
                                        loading={sletter}
                                        disabled={sletter || oppdaterer}
                                        variant="secondary"
                                        size="small"
                                        icon={<ArrowUndoIcon />}
                                    >
                                        Angre bruk av ulovfestet motregning
                                    </Button>
                                </Box>
                            )}
                            {error && <ErrorMessage>{error.message}</ErrorMessage>}
                        </VStack>
                    )}
                </>
            )}
        </VStack>
    );
}
