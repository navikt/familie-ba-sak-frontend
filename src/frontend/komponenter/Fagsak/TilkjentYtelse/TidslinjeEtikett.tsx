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
            disabled={isDisabled}
            style={style}
            className={'tidslinje__etikett'}
            onClick={onEtikettClick}
        >
            <span
                className={classNames(
                    'tidslinje__etikett__label',
                    isDisabled ? 'tidslinje__etikett__label--disabled' : '',
                    aktivEtikett && aktivEtikett.dato.toDateString() === etikett.dato.toDateString()
                        ? 'tidslinje__etikett__label--aktiv'
                        : ''
                )}
            >
                {etikett.label}
            </span>
        </button>
    );
};

export default TidslinjeEtikett;
