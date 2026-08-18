import classNames from 'classnames';
import type { ButtonHTMLAttributes } from 'react';

import styles from './FamilieBaseKnapp.module.css';

const FamilieBaseKnapp = ({ children, className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button className={classNames(styles.familieBaseKnapp, className)} {...rest}>
        {children}
    </button>
);
export default FamilieBaseKnapp;
