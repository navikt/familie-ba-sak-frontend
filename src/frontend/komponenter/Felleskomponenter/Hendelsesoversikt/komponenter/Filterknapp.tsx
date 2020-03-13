import './Filterknapp.less';

import React, { ReactNode } from 'react';

import classNames from 'classnames';

interface IFilterknappProps {
    children: ReactNode;
    onClick: () => void;
    aktiv?: boolean;
}

const Filterknapp = ({ children, onClick, aktiv }: IFilterknappProps) => {
    return (
        <button
            onClick={onClick}
            className={classNames('filterknapp', aktiv && 'filterknapp__aktivKnapp')}
        >
            {children}
        </button>
    );
};

export default Filterknapp;
