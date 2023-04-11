import styled from 'styled-components';

import { ABlue800 } from '@navikt/ds-tokens/dist/tokens';

const FamilieBaseKnapp = styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;

    :focus {
        box-shadow: 0 0 0 3px ${ABlue800};
    }
`;

export default FamilieBaseKnapp;
