import { useEffect, useRef } from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';

import type { IToast } from './typer';
import { useAppContext } from '../../context/AppContext';

const Container = styled.div`
    grid-column: 3;
    width: 20rem;
    z-index: 9999;
    margin: auto 0 1.7rem auto;

    &:focus {
        border-radius: 4px;
        box-shadow: 0 0 0 3px @fokusFarge;
        outline: none;
    }
`;

const Toast = ({ toastId, toast }: { toastId: string; toast: IToast }) => {
    const { toasts, settToasts } = useAppContext();
    const toastRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (toastRef.current as HTMLSpanElement).focus();
    }, [toastRef]);

    /**
     * Vis beskjed i minst 7 sekunder og mer dersom teksten er lang.
     *
     * Basert på lenken under, men forenklet litt.
     * https://ux.stackexchange.com/questions/11203/how-long-should-a-temporary-notification-toast-appear
     */
    useEffect(() => {
        const timer = setTimeout(
            () => {
                // eslint-disable-next-line
                const { [toastId]: fjernetToast, ...resterendeToast } = toasts;
                settToasts(resterendeToast);
            },
            Math.max(...[toast.tekst.length * 50, 7000])
        );
        return () => clearTimeout(timer);
    });

    return (
        <Container ref={toastRef}>
            <Alert variant={toast.alertType}>{toast.tekst}</Alert>
        </Container>
    );
};

export default Toast;
