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
            <BodyLong>Du må derfor:</BodyLong>
            <List>
                <List.Item>
                    Betale ut etterbetalingen, deretter opprette t-sak om feilutbetalingen («splitte
                    saken»).
                </List.Item>
            </List>
        </StyledAlert>
    );
};

export default AvregningAlert;
