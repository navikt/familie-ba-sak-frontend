import type { ReactChild } from 'react';
import React from 'react';

import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { NavHashLink as NavLink } from 'react-router-hash-link';

interface Props {
    children: ReactChild;
    id: string;
    to?: string;
    active?: boolean;
    className?: string;
}

const Link: React.FC<Props> = ({ active = true, id, to, children, className }) => {
    const location = useLocation();
    const onClick = (event: React.MouseEvent): void => {
        (event.target as HTMLElement).blur();
    };

    return active && to ? (
        <NavLink
            id={id}
            to={to}
            tabIndex={0}
            onClick={onClick}
            className={classNames(
                className,
                `${location.pathname}${location.hash}` === to ? 'active' : ''
            )}
            scroll={el => {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
        >
            {children}
        </NavLink>
    ) : (
        // eslint-disable-next-line
        <a key={id} className={classNames('inactive', className)}>
            {children}
        </a>
    );
};

export default Link;
