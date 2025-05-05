import React, { useState } from 'react';

import styled from 'styled-components';

import { Alert, BodyLong, Button, HStack } from '@navikt/ds-react';

const StyledAlert = styled(Alert)`
    margin-top: 2rem;
    width: fit-content;
`;

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
        <>
            <StyledAlert variant={'info'}>
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
            </StyledAlert>
        </>
    );
};
