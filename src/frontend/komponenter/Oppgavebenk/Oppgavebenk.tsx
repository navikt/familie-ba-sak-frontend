import React, { useEffect } from 'react';

import styled from 'styled-components';

import OppgaveHeader from './OppgaveHeader';
import OppgaveList from './OppgaveList';
import { useAmplitude } from '../../utils/amplitude';

const Container = styled.article`
    padding: 0.5rem;
    height: ${`calc(100vh - 30px - 1.1rem)`};
    width: 100vw;
    overflow: scroll;

    & hr {
        margin-top: 2rem;
    }
`;

const Oppgavebenk: React.FunctionComponent = () => {
    const { loggSidevisning } = useAmplitude();

    useEffect(() => {
        loggSidevisning('oppgavebenk');
    }, []);

    return (
        <Container>
            <OppgaveHeader />
            <OppgaveList />
        </Container>
    );
};

export default Oppgavebenk;
