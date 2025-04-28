import React from 'react';

import { Alert, BodyShort, Box, ConfirmationPanel, Heading, VStack } from '@navikt/ds-react';

import { BekreftSamtykkeOmMotregning } from './BekreftSamtykkeOmMotregning';
import type { TilbakekrevingsvedtakMotregningDTO } from './TilbakekrevingsvedtakMotregningDTO';

interface TilbakekrevingsvedtakMotregningProps {
    tilbakekrevingsvedtakMotregning: TilbakekrevingsvedtakMotregningDTO;
    slettTilbakekrevingsvedtakMotregning: () => Promise<void>;
    oppdaterTilbakekrevingMotregningSamtykke: (samtykke: boolean) => Promise<void>;
    heleBeløpetSkalKrevesTilbake: boolean;
    settHeleBeløpetSkalKrevesTilbake: (value: boolean) => void;
}

export const TilbakekrevingsvedtakMotregning = ({
    tilbakekrevingsvedtakMotregning,
    slettTilbakekrevingsvedtakMotregning,
    oppdaterTilbakekrevingMotregningSamtykke,
    heleBeløpetSkalKrevesTilbake,
    settHeleBeløpetSkalKrevesTilbake,
}: TilbakekrevingsvedtakMotregningProps) => {
    return (
        <Box marginBlock="10 0" width="90%" maxWidth="40rem">
            <Heading size="medium" level="2" spacing>
                Tilbakekreving - ulovfestet motregning
            </Heading>
            {!tilbakekrevingsvedtakMotregning.samtykke ? (
                <BekreftSamtykkeOmMotregning
                    slettTilbakekrevingsvedtakMotregning={slettTilbakekrevingsvedtakMotregning}
                    oppdaterTilbakekrevingMotregningSamtykke={
                        oppdaterTilbakekrevingMotregningSamtykke
                    }
                />
            ) : (
                <VStack gap="2">
                    <Alert variant="info" style={{ marginBottom: '1rem' }}>
                        Du må ha kjennskap til regelverk for tilbakekreving for å kunne fortsette
                        saksbehandlingen.
                    </Alert>
                    <ConfirmationPanel
                        checked={heleBeløpetSkalKrevesTilbake}
                        label="Hele beløpet skal kreves tilbake"
                        onChange={() =>
                            settHeleBeløpetSkalKrevesTilbake(!heleBeløpetSkalKrevesTilbake)
                        }
                    >
                        <Heading level="2" size="xsmall" spacing>
                            Skal hele beløpet kreves tilbake?
                        </Heading>
                        <BodyShort>
                            Dersom ikke hele beløpet skal kreves tilbake må du splitte saken.
                        </BodyShort>
                    </ConfirmationPanel>
                </VStack>
            )}
        </Box>
    );
};
