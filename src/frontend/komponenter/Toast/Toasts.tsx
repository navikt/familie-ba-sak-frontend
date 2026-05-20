import Toast from './Toast';
import styles from './Toasts.module.css';
import { useAppContext } from '../../context/AppContext';

const Toasts = () => {
    const { toasts } = useAppContext();

    return (
        <div className={styles.container}>
            {Object.entries(toasts).map(([toastId, toast]) => (
                <Toast key={toastId} toastId={toastId} toast={toast} />
            ))}
        </div>
    );
};

export default Toasts;
