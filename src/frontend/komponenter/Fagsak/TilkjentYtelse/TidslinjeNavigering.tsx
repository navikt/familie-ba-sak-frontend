import React from 'react';

import '@navikt/helse-frontend-tidslinje/lib/main.css';
import { Flatknapp } from 'nav-frontend-knapper';

import { NavigeringsRetning } from '../../../context/TidslinjeContext';
import FamilieChevron from '../../../ikoner/FamilieChevron';

interface IProps {
    naviger: (retning: NavigeringsRetning) => void;
    kanNavigereTilHøyre?: boolean;
    kanNavigereTilVenstre?: boolean;
}

const TidslinjeNavigering: React.FC<IProps> = ({
    naviger,
    kanNavigereTilHøyre = true,
    kanNavigereTilVenstre = true,
}) => {
    return (
        <div className={'tidslinje-header__navigering'}>
            <Flatknapp
                title={'Naviger til venstre'}
                mini
                kompakt
                disabled={!kanNavigereTilVenstre}
                onClick={() => naviger(NavigeringsRetning.VENSTRE)}
            >
                <FamilieChevron title={'Naviger til venstre'} retning={'venstre'} />
                <span className="sr-only">Naviger til venstre i tidslinjen</span>
            </Flatknapp>
            <Flatknapp
                title={'Naviger til høyre'}
                mini
                kompakt
                disabled={!kanNavigereTilHøyre}
                onClick={() => naviger(NavigeringsRetning.HØYRE)}
            >
                <FamilieChevron title={'Naviger til høyre'} />
                <span className="sr-only">Naviger til høyre i tidslinjen</span>
            </Flatknapp>
        </div>
    );
};

export default TidslinjeNavigering;
