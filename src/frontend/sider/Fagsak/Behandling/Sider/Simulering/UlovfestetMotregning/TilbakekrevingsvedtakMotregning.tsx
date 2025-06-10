import React from 'react';

import { ArrowUndoIcon } from '@navikt/aksel-icons';
import {
    Alert,
    BodyShort,
    Box,
    Button,
    ConfirmationPanel,
    Heading,
    VStack,
} from '@navikt/ds-react';
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
        åpenBehandling.aktivSettPåVent?.årsak ===
        SettPåVentÅrsak.AVVENTER_SAMTYKKE_ULOVFESTET_MOTREGNING;

    return (
        <VStack marginBlock="10 0" width="90%" maxWidth="40rem" gap="4">
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
                        <Alert variant="info">
                            Saken venter på samtykke fra bruker for ulovfestet motregning. Hvis
                            bruker har gitt samtykke før det har gått{' '}
                            {dagerFristForAvventerSamtykkeUlovfestetMotregning} dager, kan saken tas
                            av vent manuelt.
                        </Alert>
                    )}

                    {!tilbakekrevingsvedtakMotregning.samtykke && !erLesevisning && (
                        <BekreftSamtykkeTilMotregning
                            slettTilbakekrevingsvedtakMotregning={
                                slettTilbakekrevingsvedtakMotregning
                            }
                            oppdaterTilbakekrevingsvedtakMotregning={
                                oppdaterTilbakekrevingsvedtakMotregning
                            }
                        />
                    )}

                    {tilbakekrevingsvedtakMotregning.samtykke && (
                        <VStack gap="4">
                            <Alert variant="info">
                                Du må ha kjennskap til regelverk for tilbakekreving for å kunne
                                fortsette saksbehandlingen.
                            </Alert>

                            <ConfirmationPanel
                                checked={
                                    tilbakekrevingsvedtakMotregning.heleBeløpetSkalKrevesTilbake
                                }
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
                                <BodyShort>
                                    Dersom ikke hele beløpet skal kreves tilbake må du splitte
                                    saken.
                                </BodyShort>
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
