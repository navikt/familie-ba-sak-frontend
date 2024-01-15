import type { PropsWithChildren } from 'react';
import React from 'react';

import { NavHashLink as NavLink } from 'react-router-hash-link';
import styled from 'styled-components';

import { BodyShort } from '@navikt/ds-react';
import { ABorderSelected, ASurfaceNeutralSubtle } from '@navikt/ds-tokens/dist/tokens';

const StyledNavLink = styled(NavLink)`
    &.active {
        background-color: ${ASurfaceNeutralSubtle};
        box-shadow: inset 0.35rem 0 0 0 ${ABorderSelected};
    }
`;

interface Props extends PropsWithChildren {
    id: string;
    to?: string;
    active?: boolean;
    className?: string;
}

const Link: React.FC<Props> = ({ active = true, id, to, children, className }) => {
    const onClick = (event: React.MouseEvent): void => {
        (event.target as HTMLElement).blur();
    };

    return active && to ? (
        <StyledNavLink
            id={id}
            to={to}
            tabIndex={0}
            onClick={onClick}
            className={className}
            scroll={el => {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
        >
            {children}
        </StyledNavLink>
    ) : (
        <BodyShort key={id} className={className}>
            {children}
        </BodyShort>
    );
};

export default Link;
