import styled from 'styled-components';

import navFarger from 'nav-frontend-core';

const FamilieBaseKnapp = styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;

    :focus {
        box-shadow: 0 0 0 3px ${navFarger.fokusFarge};
    }
`;

export default FamilieBaseKnapp;
