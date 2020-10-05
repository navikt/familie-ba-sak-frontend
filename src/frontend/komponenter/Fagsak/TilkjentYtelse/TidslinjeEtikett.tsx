import React, { useEffect } from 'react';
import '@navikt/helse-frontend-tidslinje/lib/main.css';

import { TidslinjeVindu, useTidslinje } from '../../../context/TidslinjeContext';
import classNames from 'classnames';
import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/src/components/types.internal';

interface IEtikettProp {
    etikett: Skalaetikett;
}

const TidslinjeEtikett: React.FunctionComponent<IEtikettProp> = ({ etikett }) => {
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

    let klikkbarBredde = 0;

    switch (aktivtTidslinjeVindu.vindu.id) {
        case TidslinjeVindu.HALVT_ÅR:
            klikkbarBredde = 100 / 6 - 1;
            break;
        case TidslinjeVindu.ETT_ÅR:
            klikkbarBredde = 100 / 12 - 1;
            break;
        default:
            break;
    }

    return (
        <button
            aria-label={etikett.label}
            disabled={isDisabled}
            key={etikett.label}
            style={{ width: `${klikkbarBredde}%` }}
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
