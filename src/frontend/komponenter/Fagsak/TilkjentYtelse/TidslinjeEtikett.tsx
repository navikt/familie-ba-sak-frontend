import React, { useEffect } from 'react';
import '@navikt/helse-frontend-tidslinje/lib/main.css';

import classNames from 'classnames';

import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

import { TidslinjeVindu, useTidslinje } from '../../../context/TidslinjeContext';

interface IEtikettProp {
    etikett: Skalaetikett;
}

const TidslinjeEtikett: React.FunctionComponent<IEtikettProp> = ({ etikett }) => {
    const {
        aktivEtikett,
        settAktivEtikett,
        aktivtTidslinjeVindu,
        initiellAktivEtikettErSatt,
        setInitiellAktivEtikettErSatt,
    } = useTidslinje();

    const onEtikettClick = () => {
        settAktivEtikett(etikett);
    };

    useEffect(() => {
        if (
            !initiellAktivEtikettErSatt &&
            etikett.dato.getFullYear() === new Date().getFullYear() &&
            etikett.dato.getMonth() === new Date().getMonth()
        ) {
            settAktivEtikett(etikett);
            setInitiellAktivEtikettErSatt(true);
        }
    }, [etikett]);

    const isDisabled = aktivtTidslinjeVindu.vindu.id === TidslinjeVindu.TRE_ÅR;

    return (
        <button
            aria-label={etikett.label}
            disabled={isDisabled}
            className={classNames(
                'tidslinje-container__etikett',
                aktivEtikett && aktivEtikett.dato.toDateString() === etikett.dato.toDateString()
                    ? 'tidslinje-container__etikett--aktiv'
                    : '',
                isDisabled ? 'tidslinje-container__etikett--disabled' : ''
            )}
            onClick={onEtikettClick}
        >
            <span>{etikett.label}</span>
        </button>
    );
};

export default TidslinjeEtikett;
