import React from 'react';

import styled from 'styled-components';

import { AGray300 } from '@navikt/ds-tokens/dist/tokens';

import Venstremeny from '../Felleskomponenter/Venstremeny/Venstremeny';
import BehandlingRouter from './BehandlingRouter';
import Høyremeny from './Høyremeny/Høyremeny';

const FlexContainer = styled.div`
    display: flex;
`;

const VenstremenyContainer = styled.div`
    min-width: 1rem;
    border-right: 1px solid ${AGray300};
    overflow: hidden;
`;

const HovedinnholdContainer = styled.div`
    flex: 1;
    overflow: auto;
`;

const HøyremenyContainer = styled.div`
    border-left: 1px solid ${AGray300};
    overflow-x: hidden;
    overflow-y: scroll;
`;

const BehandlingContainer: React.FC = () => (
    <FlexContainer>
        <VenstremenyContainer>
            <Venstremeny />
        </VenstremenyContainer>
        <HovedinnholdContainer>
            <BehandlingRouter />
        </HovedinnholdContainer>
        <HøyremenyContainer>
            <Høyremeny />
        </HøyremenyContainer>
    </FlexContainer>
);

export default BehandlingContainer;
