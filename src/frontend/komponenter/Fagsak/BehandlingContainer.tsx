import React from 'react';

import styled from 'styled-components';

import { AGray300 } from '@navikt/ds-tokens/dist/tokens';

import BehandlingRouter from './BehandlingRouter';
import Høyremeny from './Høyremeny/Høyremeny';
import type { IPersonInfo } from '../../typer/person';
import Venstremeny from '../Felleskomponenter/Venstremeny/Venstremeny';

interface Props {
    bruker: IPersonInfo;
}

const FlexContainer = styled.div`
    display: flex;
`;

const VenstremenyContainer = styled.div`
    min-width: 1rem;
    border-right: 1px solid ${AGray300};
    overflow: hidden;
`;

const HovedinnholdContainer = styled.div`
    height: calc(100vh - 6rem);
    flex: 1;
    overflow: auto;
`;

const HøyremenyContainer = styled.div`
    border-left: 1px solid ${AGray300};
    overflow-x: hidden;
    overflow-y: scroll;
`;

const BehandlingContainer: React.FC<Props> = ({ bruker }) => (
    <FlexContainer>
        <VenstremenyContainer>
            <Venstremeny />
        </VenstremenyContainer>
        <HovedinnholdContainer>
            <BehandlingRouter bruker={bruker} />
        </HovedinnholdContainer>
        <HøyremenyContainer>
            <Høyremeny bruker={bruker} />
        </HøyremenyContainer>
    </FlexContainer>
);

export default BehandlingContainer;
