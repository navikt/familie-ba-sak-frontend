import { useEffect, useRef } from 'react';

import { LocalAlert } from '@navikt/ds-react';

import styles from './Toast.module.css';
import type { IToast } from './typer';
import { useAppContext } from '../../context/AppContext';

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
        <div ref={toastRef} className={styles.container}>
            <LocalAlert status={toast.alertType}>
                <LocalAlert.Header>
                    <LocalAlert.Title>{toast.tekst}</LocalAlert.Title>
                </LocalAlert.Header>
            </LocalAlert>
        </div>
    );
};

export default Toast;
