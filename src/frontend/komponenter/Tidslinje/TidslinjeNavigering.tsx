import type { PropsWithChildren } from 'react';
import React from 'react';

import styled from 'styled-components';

import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

import { NavigeringsRetning } from './TidslinjeContext';

interface IProps extends PropsWithChildren {
    naviger: (retning: NavigeringsRetning) => void;
    kanNavigereTilHøyre?: boolean;
    kanNavigereTilVenstre?: boolean;
    navigerTilVenstreTittel?: string;
    navigerTilHøyreTittel?: string;
}

const StyledTidslinjenavigering = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.625rem;
`;

const FlexMedSentrering = styled.div`
    display: flex;
    align-items: center;
`;

const TidslinjeNavigering: React.FC<IProps> = ({
    naviger,
    kanNavigereTilHøyre = true,
    kanNavigereTilVenstre = true,
    navigerTilVenstreTittel = 'Naviger til venstre i tidslinjen',
    navigerTilHøyreTittel = 'Naviger til høyre i tidslinjen',
    children,
}) => {
    return (
        <StyledTidslinjenavigering className={'tidslinje-header__navigering'}>
            <Button
                title={navigerTilVenstreTittel}
                variant="tertiary"
                size="small"
                disabled={!kanNavigereTilVenstre}
                onClick={() => naviger(NavigeringsRetning.VENSTRE)}
                icon={<ChevronLeftIcon title={navigerTilVenstreTittel} fontSize={'1.8rem'} />}
            />
            {children && <FlexMedSentrering>{children}</FlexMedSentrering>}
            <Button
                title={navigerTilHøyreTittel}
                variant="tertiary"
                size="small"
                disabled={!kanNavigereTilHøyre}
                onClick={() => naviger(NavigeringsRetning.HØYRE)}
                icon={<ChevronRightIcon title={navigerTilHøyreTittel} fontSize={'1.8rem'} />}
            />
        </StyledTidslinjenavigering>
    );
};

export default TidslinjeNavigering;
