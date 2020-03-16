import React, { ReactChild } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
    children: ReactChild;
    id: string;
    to?: string;
    active?: boolean;
    className?: string;
}

const Link = ({ active = true, id, to, children, className }: Props) => {
    const onClick = (event: React.MouseEvent) => {
        (event.target as HTMLElement).blur();
    };

    return active && to ? (
        <NavLink id={id} to={to} tabIndex={0} onClick={onClick} className={className}>
            {children}
        </NavLink>
    ) : (
        // tslint:disable-next-line: react-a11y-anchors
        <a className={classNames('inactive', className)}>{children}</a>
    );
};

export default Link;
