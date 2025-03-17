import React from 'react';

import styled from 'styled-components';

import Toast from './Toast';
import { useApp } from '../../../context/AppContext';

const Container = styled.div`
    position: fixed;
    right: 2rem;
    float: right;
    bottom: 0;
    z-index: 9999;
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
