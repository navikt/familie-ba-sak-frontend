import React from 'react';

import styled from 'styled-components';

import { Heading } from '@navikt/ds-react';

import FilterSkjema from './FilterSkjema';

const FlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const OppgaveHeader: React.FunctionComponent = () => {
    return (
        <FlexDiv>
            <Heading size={'medium'} level={'2'}>
                Oppgavebenken
            </Heading>

            <FilterSkjema />
        </FlexDiv>
    );
};

export default OppgaveHeader;
