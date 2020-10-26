import React, { ReactNode } from 'react';

import classNames from 'classnames';
import { randomUUID } from '../../../../utils/commons';

interface IFilterknappProps {
    aktiv?: boolean;
    disabled?: boolean;
    children: ReactNode;
    onClick: () => void;
}

const Filterknapp = ({ children, disabled = false, onClick, aktiv }: IFilterknappProps) => {
    return (
        <button
            id={`filter_${randomUUID()}`}
            aria-label={`filter_${randomUUID()}`}
            onClick={onClick}
            disabled={disabled}
            className={classNames('filterknapp', aktiv && 'aktivKnapp', disabled && 'disabled')}
        >
            {children}
        </button>
    );
};

export default Filterknapp;
