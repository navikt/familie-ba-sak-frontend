import React from 'react';

import styled from 'styled-components';

import { Back, Next } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';

import { NavigeringsRetning } from '../../../context/TidslinjeContext';

interface IProps {
    naviger: (retning: NavigeringsRetning) => void;
    kanNavigereTilHøyre?: boolean;
    kanNavigereTilVenstre?: boolean;
    navigerTilVenstreTittel?: string;
    navigerTilHøyreTittel?: string;
    children?: React.ReactNode | React.ReactChild | React.ReactChildren;
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
                icon={<Back title={navigerTilVenstreTittel} />}
            />
            {children && <FlexMedSentrering>{children}</FlexMedSentrering>}
            <Button
                title={navigerTilHøyreTittel}
                variant="tertiary"
                size="small"
                disabled={!kanNavigereTilHøyre}
                onClick={() => naviger(NavigeringsRetning.HØYRE)}
                icon={<Next title={navigerTilHøyreTittel} />}
            />
        </StyledTidslinjenavigering>
    );
};

export default TidslinjeNavigering;
