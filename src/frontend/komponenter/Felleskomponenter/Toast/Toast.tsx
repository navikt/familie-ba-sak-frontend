import React, { useEffect, useRef } from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';

import { useApp } from '../../../context/AppContext';
import { IToast } from './typer';

const Container = styled.div<{ out: boolean }>`
    grid-column: 3;
    width: 20rem;
    z-index: 9999;
    margin: auto 0 1.7rem auto;

    &:focus {
        border-radius: 4px;
        box-shadow: 0 0 0 3px @fokusFarge;
        outline: none;
    }

    alertstripe {
        padding: 0.3rem 0.5rem;
    }

    span {
        color: black;
        font-family: 'Source Sans Pro', Arial, sans-serif;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 0.2rem;
    }
`;

const Toast: React.FC<{ toastId: string; toast: IToast }> = ({ toastId, toast }) => {
    const { toasts, settToasts } = useApp();
    const toastRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (toastRef.current as HTMLSpanElement).focus();
    }, [toastRef]);

    useEffect(() => {
        const timer = setTimeout(() => {
            // eslint-disable-next-line
            const { [toastId]: fjernetToast, ...resterendeToast } = toasts;
            settToasts(resterendeToast);
        }, 6000);
        return () => clearTimeout(timer);
    });

    return (
        <Container out={false} ref={toastRef}>
            <AlertStripe type={toast.alertstripeType}>{toast.tekst}</AlertStripe>
        </Container>
    );
};

export default Toast;
