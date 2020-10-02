import React from 'react';
import '@navikt/helse-frontend-tidslinje/lib/main.css';
import FamilieChevron from '../../../ikoner/FamilieChevron';
import { Flatknapp } from 'nav-frontend-knapper';
import { NavigeringsRetning, useTidslinje } from '../../../context/TidslinjeContext';

const TidslinjeNavigering: React.FC = () => {
    const { naviger } = useTidslinje();

    return (
        <div className={'tidslinje-header__navigering'}>
            <Flatknapp
                title={'Naviger til venstre'}
                mini
                kompakt
                onClick={() => naviger(NavigeringsRetning.VENSTRE)}
            >
                <FamilieChevron title={'Naviger til venstre'} retning={'venstre'} />
                <span className="sr-only">Naviger til venstre i tidslinjen</span>
            </Flatknapp>
            <Flatknapp
                title={'Naviger til høyre'}
                mini
                kompakt
                onClick={() => naviger(NavigeringsRetning.HØYRE)}
            >
                <FamilieChevron title={'Naviger til høyre'} />
                <span className="sr-only">Naviger til høyre i tidslinjen</span>
            </Flatknapp>
        </div>
    );
};

export default TidslinjeNavigering;
