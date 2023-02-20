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
    navigerTilHøyreTittel,
    children,
}) => {
    return (
        <StyledTidslinjenavigering className={'tidslinje-header__navigering'}>
            <Button
                title={'Naviger til venstre'}
                variant="tertiary"
                size="small"
                disabled={!kanNavigereTilVenstre}
                onClick={() => naviger(NavigeringsRetning.VENSTRE)}
            >
                <Back title={'Naviger til venstre'} />
                <span className="sr-only">
                    {navigerTilVenstreTittel
                        ? navigerTilVenstreTittel
                        : 'Naviger til venstre i tidslinjen'}
                </span>
            </Button>
            {children && <DivMedHøyremargin>{children}</DivMedHøyremargin>}
            <Button
                title={'Naviger til høyre'}
                variant="tertiary"
                size="small"
                disabled={!kanNavigereTilHøyre}
                onClick={() => naviger(NavigeringsRetning.HØYRE)}
            >
                <Next title={'Naviger til høyre'} />
                <span className="sr-only">
                    {navigerTilHøyreTittel
                        ? navigerTilHøyreTittel
                        : 'Naviger til høyre i tidslinjen'}
                </span>
            </Button>
        </StyledTidslinjenavigering>
    );
};

export default TidslinjeNavigering;
