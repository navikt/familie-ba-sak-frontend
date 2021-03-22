import React from 'react';

import styled from 'styled-components';

import Hjelpetekst44px from './Hjelpetekst44px';
import { Element } from 'nav-frontend-typografi';
import { PopoverOrientering } from 'nav-frontend-popover';

const Container = styled.div`
    margin: 2.75rem 0 1rem;
    display: flex;
    align-items: center;
    text-align: center;
`;

const StyledHjelpetekst44px = styled(Hjelpetekst44px)`
    .popover {
        max-width: 18rem;
        text-align: left;
    }
`;

interface IOverskriftMedHjelpetekstProps {
    overskrift: string;
    hjelpetekst: string;
}

const OverskriftMedHjelpetekst: React.FC<IOverskriftMedHjelpetekstProps> = ({
    overskrift,
    hjelpetekst,
}) => (
    <Container>
        <Element>{overskrift}</Element>
        <StyledHjelpetekst44px type={PopoverOrientering.Hoyre} innhold={hjelpetekst} />
    </Container>
);

export default OverskriftMedHjelpetekst;
