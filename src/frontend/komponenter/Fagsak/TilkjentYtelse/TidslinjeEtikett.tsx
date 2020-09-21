import React from 'react';
import '@navikt/helse-frontend-tidslinje/lib/main.css';

import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/components/types.internal';
import { TidslinjeSkala, useTidslinje } from '../../../context/TidslinjeContext';
import classNames from 'classnames';

interface IEtikettProp {
    etikett: Skalaetikett;
    style: { [key: string]: string };
}

const TidslinjeEtikett: React.FunctionComponent<IEtikettProp> = ({ etikett, style }) => {
    const { aktivEtikett, settAktivEtikett, tidslinjeInput } = useTidslinje();

    const onEtikettClick = () => {
        settAktivEtikett(etikett);
    };

    const isDisabled = tidslinjeInput.aktivSkala.id === TidslinjeSkala.TRE_ÅR;

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
                isDisabled ? 'tidslinje__etikett__label--disabled' : ''
            )}
            onClick={onEtikettClick}
        >
            <span>{etikett.label}</span>
        </button>
    );
};

export default TidslinjeEtikett;
