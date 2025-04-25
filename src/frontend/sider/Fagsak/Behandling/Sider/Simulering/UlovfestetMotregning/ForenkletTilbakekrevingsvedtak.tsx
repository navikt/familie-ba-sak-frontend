import React from 'react';

import { Alert, Box, Checkbox, CheckboxGroup, Heading, VStack } from '@navikt/ds-react';

import { BekreftSamtykkeOmMotregning } from './BekreftSamtykkeOmMotregning';
import type { ForenkletTilbakekrevingsvedtakDTO } from './ForenkletTilbakekrevingsvedtakDTO';

interface ForenkletTilbakekrevingsvedtakProps {
    forenkletTilbakekrevingsvedtak: ForenkletTilbakekrevingsvedtakDTO;
    slettForenkletTilbakekrevingsvedtak: () => Promise<void>;
    oppdaterForenkletTilbakekrevingSamtykke: (samtykke: boolean) => Promise<void>;
    heleBeløpetSkalKrevesTilbake: boolean;
    settHeleBeløpetSkalKrevesTilbake: (value: boolean) => void;
}

export const ForenkletTilbakekrevingsvedtak = ({
    forenkletTilbakekrevingsvedtak,
    slettForenkletTilbakekrevingsvedtak,
    oppdaterForenkletTilbakekrevingSamtykke,
    heleBeløpetSkalKrevesTilbake,
    settHeleBeløpetSkalKrevesTilbake,
}: ForenkletTilbakekrevingsvedtakProps) => {
    const toggleHeleBeløpetSkalKrevesTilbake = (value: boolean[]) => {
        settHeleBeløpetSkalKrevesTilbake(value.includes(true));
    };

    return (
        <Box marginBlock="10 0" width="90%" maxWidth="40rem">
            <Heading size="medium" level="2" spacing>
                Tilbakekreving - ulovfestet motregning
            </Heading>
            {!forenkletTilbakekrevingsvedtak.samtykke ? (
                <BekreftSamtykkeOmMotregning
                    slettForenkletTilbakekrevingsvedtak={slettForenkletTilbakekrevingsvedtak}
                    oppdaterForenkletTilbakekrevingSamtykke={
                        oppdaterForenkletTilbakekrevingSamtykke
                    }
                />
            ) : (
                <VStack gap="2">
                    <Alert variant="info" style={{ marginBottom: '1rem' }}>
                        Du må ha kjennskap til regelverk for tilbakekreving for å kunne fortsette
                        saksbehandlingen.
                    </Alert>
                    <CheckboxGroup
                        legend="Hele beløpet skal kreves tilbake"
                        size="medium"
                        hideLegend
                        onChange={toggleHeleBeløpetSkalKrevesTilbake}
                    >
                        <Checkbox value={true}>Hele beløpet skal kreves tilbake</Checkbox>
                    </CheckboxGroup>
                    {!heleBeløpetSkalKrevesTilbake && (
                        <Alert variant="warning">
                            Dersom ikke hele beløpet skal kreves tilbake må du splitte saken
                        </Alert>
                    )}
                </VStack>
            )}
        </Box>
    );
};
