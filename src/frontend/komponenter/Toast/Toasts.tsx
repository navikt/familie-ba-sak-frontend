import React from 'react';

import Toast from './Toast';
import styles from './Toasts.module.css';
import { useAppContext } from '../../context/AppContext';

const Toasts: React.FC = () => {
    const { toasts } = useAppContext();

    return (
        <div className={styles.container}>
            {Object.entries(toasts).map(([toastId, toast]) => (
                <Toast key={toastId + 'ya'} toastId={toastId} toast={toast} />
            ))}
        </div>
    );
};

export default Toasts;
