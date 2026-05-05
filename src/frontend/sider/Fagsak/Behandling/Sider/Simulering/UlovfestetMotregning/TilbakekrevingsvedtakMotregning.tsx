import { ArrowUndoIcon, InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, ConfirmationPanel, Heading, InfoCard, VStack } from '@navikt/ds-react';
import type { Ressurs } from '@navikt/familie-typer';

import AvregningAlert from './AvregningAlert';
import { BekreftSamtykkeTilMotregning } from './BekreftSamtykkeTilMotregning';
import {
    dagerFristForAvventerSamtykkeUlovfestetMotregning,
    useTilbakekrevingsvedtakMotregning,
} from './useTilbakekrevingsvedtakMotregning';
import { type IBehandling, SettPåVentÅrsak } from '../../../../../../typer/behandling';
import type { IAvregningsperiode } from '../../../../../../typer/simulering';
import type { TilbakekrevingsvedtakMotregningDTO } from '../../../../../../typer/tilbakekrevingsvedtakMotregning';
import { useBehandlingContext } from '../../../context/BehandlingContext';

interface TilbakekrevingsvedtakMotregningProps {
    åpenBehandling: IBehandling;
    tilbakekrevingsvedtakMotregning: TilbakekrevingsvedtakMotregningDTO | null;
    avregningsperioder: IAvregningsperiode[];
    harÅpenTilbakekrevingRessurs: Ressurs<boolean>;
}

export const TilbakekrevingsvedtakMotregning = ({
    åpenBehandling,
    tilbakekrevingsvedtakMotregning,
    avregningsperioder,
    harÅpenTilbakekrevingRessurs,
}: TilbakekrevingsvedtakMotregningProps) => {
    const { slettTilbakekrevingsvedtakMotregning, oppdaterTilbakekrevingsvedtakMotregning } =
        useTilbakekrevingsvedtakMotregning(åpenBehandling);

    const { vurderErLesevisning } = useBehandlingContext();

    const erLesevisning = vurderErLesevisning();

    const erBehandlingSattPåVentMedÅrsakAvventerSamtykke =
        åpenBehandling.aktivSettPåVent?.årsak === SettPåVentÅrsak.AVVENTER_SAMTYKKE_ULOVFESTET_MOTREGNING;

    return (
        <VStack marginBlock="space-40 space-0" width="90%" maxWidth="40rem" gap="space-16">
            {tilbakekrevingsvedtakMotregning === null && (
                <AvregningAlert
                    avregningsperioder={avregningsperioder}
                    harÅpenTilbakekrevingRessurs={harÅpenTilbakekrevingRessurs}
                />
            )}

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

                    {!tilbakekrevingsvedtakMotregning.samtykke && !erLesevisning && (
                        <BekreftSamtykkeTilMotregning
                            slettTilbakekrevingsvedtakMotregning={slettTilbakekrevingsvedtakMotregning}
                            oppdaterTilbakekrevingsvedtakMotregning={oppdaterTilbakekrevingsvedtakMotregning}
                        />
                    )}
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
                                disabled={erLesevisning}
                                onChange={() =>
                                    oppdaterTilbakekrevingsvedtakMotregning({
                                        heleBeløpetSkalKrevesTilbake:
                                            !tilbakekrevingsvedtakMotregning.heleBeløpetSkalKrevesTilbake,
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
                                        onClick={slettTilbakekrevingsvedtakMotregning}
                                        variant="secondary"
                                        size="small"
                                        icon={<ArrowUndoIcon />}
                                    >
                                        Angre bruk av ulovfestet motregning
                                    </Button>
                                </Box>
                            )}
                        </VStack>
                    )}
                </>
            )}
        </VStack>
    );
};
