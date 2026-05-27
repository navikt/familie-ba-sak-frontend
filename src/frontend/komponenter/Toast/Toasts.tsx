import { useToastContext } from '@context/ToastContext';

import Toast from './Toast';
import styles from './Toasts.module.css';

const Toasts = () => {
    const { toasts } = useToastContext();

    return (
        <div className={styles.container}>
            {Object.entries(toasts).map(([toastId, toast]) => (
                <Toast key={toastId} toastId={toastId} toast={toast} />
            ))}
        </div>
    );
};

export default Toasts;
