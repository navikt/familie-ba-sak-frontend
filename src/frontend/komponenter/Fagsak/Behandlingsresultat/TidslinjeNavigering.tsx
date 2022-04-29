import React from 'react';

import styled from 'styled-components';

import { Flatknapp } from 'nav-frontend-knapper';

import { NavigeringsRetning } from '../../../context/TidslinjeContext';
import FamilieChevron from '../../../ikoner/FamilieChevron';

interface IProps {
    naviger: (retning: NavigeringsRetning) => void;
    kanNavigereTilHøyre?: boolean;
    kanNavigereTilVenstre?: boolean;
    navigerTilVenstreTittel?: string;
    navigerTilHyøyreTittel?: string;
    children?: React.ReactNode | React.ReactChild | React.ReactChildren;
}

const StyledTidslinjenavigering = styled.div`
    display: flex;
    flex-direction: row;

    & > button {
        &:first-child {
            margin-right: 0.625rem;
        }
    }
`;

const DivMedHøyremargin = styled.div`
    margin-right: 0.625rem;
    display: flex;
    align-items: center;
`;

const TidslinjeNavigering: React.FC<IProps> = ({
    naviger,
    kanNavigereTilHøyre = true,
    kanNavigereTilVenstre = true,
    navigerTilVenstreTittel,
    navigerTilHyøyreTittel,
    children,
}) => {
    return (
        <StyledTidslinjenavigering className={'tidslinje-header__navigering'}>
            <Flatknapp
                title={'Naviger til venstre'}
                mini
                kompakt
                disabled={!kanNavigereTilVenstre}
                onClick={() => naviger(NavigeringsRetning.VENSTRE)}
            >
                <FamilieChevron title={'Naviger til venstre'} retning={'venstre'} />
                <span className="sr-only">
                    {navigerTilVenstreTittel
                        ? navigerTilVenstreTittel
                        : 'Naviger til venstre i tidslinjen'}
                </span>
            </Flatknapp>
            {children && <DivMedHøyremargin>{children}</DivMedHøyremargin>}
            <Flatknapp
                title={'Naviger til høyre'}
                mini
                kompakt
                disabled={!kanNavigereTilHøyre}
                onClick={() => naviger(NavigeringsRetning.HØYRE)}
            >
                <FamilieChevron title={'Naviger til høyre'} />
                <span className="sr-only">
                    {navigerTilHyøyreTittel
                        ? navigerTilHyøyreTittel
                        : 'Naviger til høyre i tidslinjen'}
                </span>
            </Flatknapp>
        </StyledTidslinjenavigering>
    );
};

export default TidslinjeNavigering;
