import React from 'react';

import classNames from 'classnames';

import { Undertekst } from 'nav-frontend-typografi';

import { useTidslinje } from '../../../context/TidslinjeContext';

const Vinduvelger: React.FunctionComponent = () => {
    const { tidslinjeVinduer, endreTidslinjeVindu, aktivtTidslinjeVindu } = useTidslinje();

    return (
        <div>
            {tidslinjeVinduer.map(vindu => {
                return (
                    <button
                        key={vindu.id}
                        aria-label={vindu.label}
                        className={classNames(
                            'tidslinje-header__vinduvelger',
                            `${
                                aktivtTidslinjeVindu.vindu.id === vindu.id
                                    ? 'tidslinje-header__vinduvelger--aktiv'
                                    : ''
                            }`
                        )}
                        onClick={() => endreTidslinjeVindu(vindu)}
                    >
                        <Undertekst>{vindu.label}</Undertekst>
                    </button>
                );
            })}
        </div>
    );
};

export default Vinduvelger;
