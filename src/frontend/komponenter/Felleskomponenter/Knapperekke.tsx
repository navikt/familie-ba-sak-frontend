import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
`;

interface IProps {
    children?: React.ReactNode;
}
const Knapperekke: React.FC<IProps> = ({ children }) => {
    return <Container>{children}</Container>;
};

export default Knapperekke;
