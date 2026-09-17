import classNames from 'classnames';
import type { ButtonHTMLAttributes } from 'react';

import styles from './FamilieBaseKnapp.module.css';

export function FamilieBaseKnapp({ children, className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={classNames(styles.familieBaseKnapp, className)} {...rest}>
            {children}
        </button>
    );
}
