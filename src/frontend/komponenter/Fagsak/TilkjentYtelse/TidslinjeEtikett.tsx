import React, { useEffect } from 'react';
import '@navikt/helse-frontend-tidslinje/lib/main.css';

import { TidslinjeVindu, useTidslinje } from '../../../context/TidslinjeContext';
import classNames from 'classnames';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

interface IEtikettProp {
    etikett: Skalaetikett;
    style: { [key: string]: string };
}

const TidslinjeEtikett: React.FunctionComponent<IEtikettProp> = ({ etikett, style }) => {
    const { aktivEtikett, settAktivEtikett, aktivtTidslinjeVindu } = useTidslinje();

    const onEtikettClick = () => {
        settAktivEtikett(etikett);
    };

    useEffect(() => {
        if (
            etikett.dato.getFullYear() === new Date().getFullYear() &&
            etikett.dato.getMonth() === new Date().getMonth()
        ) {
            settAktivEtikett(etikett);
        }
    }, []);

    const isDisabled = aktivtTidslinjeVindu.vindu.id === TidslinjeVindu.TRE_ÅR;

    return (
        <button
            aria-label={etikett.label}
            disabled={isDisabled}
            style={style}
            className={classNames(
                'tidslinje__etikett',
                aktivEtikett && aktivEtikett.dato.toDateString() === etikett.dato.toDateString()
                    ? 'tidslinje__etikett--aktiv'
                    : '',
                isDisabled ? 'tidslinje__etikett--disabled' : ''
            )}
            onClick={onEtikettClick}
        >
            <span>{etikett.label}</span>
        </button>
    );
};

export default TidslinjeEtikett;
