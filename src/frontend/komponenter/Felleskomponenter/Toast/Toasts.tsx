import React from 'react';

import styled from 'styled-components';

import { useApp } from '../../../context/AppContext';
import Toast from './Toast';

const Container = styled.div`
    position: fixed;
    right: 2rem;
    float: right;
    bottom: 0;
`;

const Toasts: React.FC = () => {
    const { toasts } = useApp();

    return (
        <Container>
            {Object.entries(toasts).map(([toastId, toast]) => (
                <Toast key={toastId} toastId={toastId} toast={toast} />
            ))}
        </Container>
    );
};

export default Toasts;
