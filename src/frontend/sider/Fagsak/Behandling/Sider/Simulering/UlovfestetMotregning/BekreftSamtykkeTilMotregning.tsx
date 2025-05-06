import React, { useState } from 'react';

import { Alert, BodyLong, Box, Button, HStack } from '@navikt/ds-react';

interface IProps {
    slettTilbakekrevingsvedtakMotregning: () => Promise<void>;
    bekreftSamtykkeTilMotregning: () => Promise<void>;
}

export const BekreftSamtykkeTilMotregning = ({
    slettTilbakekrevingsvedtakMotregning,
    bekreftSamtykkeTilMotregning,
}: IProps) => {
    const [oppdaterer, settOppdaterer] = useState(false);
    const [sletter, settSletter] = useState(false);

    return (
        <Box marginBlock="8 0" width="fit-content">
            <Alert variant={'info'}>
                <BodyLong spacing>
                    Bruker har samtykket til at vi venter med etterbetalingen til vi har vurdert
                    feilutbetalingen
                </BodyLong>
                <HStack gap="4" justify="center">
                    <Button
                        onClick={() => {
                            settSletter(true);
                            slettTilbakekrevingsvedtakMotregning().finally(() =>
                                settSletter(false)
                            );
                        }}
                        loading={sletter}
                        disabled={sletter || oppdaterer}
                        variant="secondary"
                    >
                        Nei
                    </Button>
                    <Button
                        onClick={() => {
                            settOppdaterer(true);
                            bekreftSamtykkeTilMotregning().finally(() => settOppdaterer(false));
                        }}
                        loading={oppdaterer}
                        disabled={oppdaterer || sletter}
                    >
                        Ja
                    </Button>
                </HStack>
            </Alert>
        </Box>
    );
};
