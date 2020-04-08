import './Filterknapp.less';

import React, { ReactNode } from 'react';

import classNames from 'classnames';
import { randomUUID } from '../../../../utils/commons';

interface IFilterknappProps {
    children: ReactNode;
    onClick: () => void;
    aktiv?: boolean;
}

const Filterknapp = ({ children, onClick, aktiv }: IFilterknappProps) => {
    return (
        <button
            id={`filter_${randomUUID()}`}
            aria-label={`filter_${randomUUID()}`}
            onClick={onClick}
            className={classNames('filterknapp', aktiv && 'filterknapp__aktivKnapp')}
        >
            {children}
        </button>
    );
};

export default Filterknapp;
