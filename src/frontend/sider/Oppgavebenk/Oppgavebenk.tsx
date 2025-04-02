import React from 'react';

import styled from 'styled-components';

import { VStack } from '@navikt/ds-react';

import { OppgavebenkProvider } from './OppgavebenkContext';
import OppgaveHeader from './OppgaveHeader';
import OppgaveList from './OppgaveList';

const Container = styled.article`
    padding: 0.5rem;
    height: ${`calc(100vh - 30px - 1.1rem)`};
    width: 100vw;
    overflow: scroll;

    & hr {
        margin-top: 2rem;
    }
`;

const OppgavebenkInnhold: React.FunctionComponent = () => {
    return (
        <Container>
            <VStack gap="4">
                <OppgaveHeader />
                <OppgaveList />
            </VStack>
        </Container>
    );
};

export const Oppgavebenk: React.FC = () => {
    return (
        <OppgavebenkProvider>
            <OppgavebenkInnhold />
        </OppgavebenkProvider>
    );
};
