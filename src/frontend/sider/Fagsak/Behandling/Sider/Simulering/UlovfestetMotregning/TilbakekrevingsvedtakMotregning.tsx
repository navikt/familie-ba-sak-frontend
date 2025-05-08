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

import { BekreftSamtykkeTilMotregning } from './BekreftSamtykkeTilMotregning';
import type {
    OppdaterTilbakekrevingsvedtakMotregningDTO,
    TilbakekrevingsvedtakMotregningDTO,
} from './TilbakekrevingsvedtakMotregningDTO';

interface TilbakekrevingsvedtakMotregningProps {
    tilbakekrevingsvedtakMotregning: TilbakekrevingsvedtakMotregningDTO;
    slettTilbakekrevingsvedtakMotregning: () => Promise<void>;
    oppdaterTilbakekrevingsvedtakMotregning: (
        dto: OppdaterTilbakekrevingsvedtakMotregningDTO
    ) => Promise<void>;
}

export const TilbakekrevingsvedtakMotregning = ({
    tilbakekrevingsvedtakMotregning,
    slettTilbakekrevingsvedtakMotregning,
    oppdaterTilbakekrevingsvedtakMotregning,
}: TilbakekrevingsvedtakMotregningProps) => {
    return (
        <Box marginBlock="10 0" width="90%" maxWidth="40rem">
            <Heading size="medium" level="2" spacing>
                Tilbakekreving - ulovfestet motregning
            </Heading>
            {!tilbakekrevingsvedtakMotregning.samtykke ? (
                <BekreftSamtykkeTilMotregning
                    slettTilbakekrevingsvedtakMotregning={slettTilbakekrevingsvedtakMotregning}
                    oppdaterTilbakekrevingsvedtakMotregning={
                        oppdaterTilbakekrevingsvedtakMotregning
                    }
                />
            ) : (
                <VStack gap="4">
                    <Alert variant="info">
                        Du må ha kjennskap til regelverk for tilbakekreving for å kunne fortsette
                        saksbehandlingen.
                    </Alert>
                    <ConfirmationPanel
                        checked={tilbakekrevingsvedtakMotregning.heleBeløpetSkalKrevesTilbake}
                        label="Hele beløpet skal kreves tilbake"
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
                            Dersom ikke hele beløpet skal kreves tilbake må du splitte saken.
                        </BodyShort>
                    </ConfirmationPanel>
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
                </VStack>
            )}
        </Box>
    );
};
