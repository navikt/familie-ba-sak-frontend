import * as React from 'react';

import styled from 'styled-components';

import { Alert, BodyLong, List } from '@navikt/ds-react';

const StyledAlert = styled(Alert)`
    margin-top: 2rem;
    width: fit-content;
`;

const AvregningAlert = () => {
    return (
        <StyledAlert variant="warning">
            <BodyLong spacing>
                Denne saken inneholder både en etterbetaling og en feilutbetaling. Vi kan ikke
                automatisk avregne feilutbetalinger mot etterbetalinger.
            </BodyLong>
            <BodyLong>Du må derfor velge 1 eller 2:</BodyLong>
            <List as={'ol'}>
                <List.Item>
                    Først gjøre vedtak om etterbetalingen, og deretter gjøre nytt vedtak om
                    feilutbetalingen og opprette t-sak («splitte saken»).
                </List.Item>
                <List.Item>
                    Be bruker om samtykke til å holde på etterbetalingen mens Nav vurderer t-sak
                    («ulovfestet motregning»).
                </List.Item>
            </List>
        </StyledAlert>
    );
};

export default AvregningAlert;
