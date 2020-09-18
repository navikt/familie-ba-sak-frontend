import React from 'react';
import '@navikt/helse-frontend-tidslinje/lib/main.css';

import { Skalaetikett } from '@navikt/helse-frontend-tidslinje/lib/components/types.internal';
import { useTidslinje } from '../../../context/TidslinjeContext';
import classNames from 'classnames';

interface IEtikettProp {
    etikett: Skalaetikett;
    style: { [key: string]: string };
}

const TidslinjeEtikett: React.FunctionComponent<IEtikettProp> = ({ etikett, style }) => {
    const { aktivEtikett, settAktivEtikett } = useTidslinje();

    const onEtikettClick = () => {
        settAktivEtikett(etikett);
    };

    return (
        <button style={style} className={'tidslinje__etikett'} onClick={onEtikettClick}>
            <span
                className={classNames(
                    'tidslinje__etikett__label',
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
