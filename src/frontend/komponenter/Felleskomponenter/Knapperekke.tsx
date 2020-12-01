import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
`;

const Knapperekke: React.FC = ({ children }) => {
    return <Container>{children}</Container>;
};

export default Knapperekke;
