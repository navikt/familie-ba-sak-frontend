import React, { useEffect } from 'react';

import classNames from 'classnames';

import type { Etikett } from '@navikt/familie-tidslinje';

import { TidslinjeVindu, useTidslinjeContext } from './TidslinjeContext';
import FamilieBaseKnapp from '../FamilieBaseKnapp';
import styles from './TidslinjeEtikett.module.css';

interface IEtikettProp {
    etikett: Etikett;
}

const TidslinjeEtikett: React.FunctionComponent<IEtikettProp> = ({ etikett }) => {
    const {
        aktivEtikett,
        settAktivEtikett,
        aktivtTidslinjeVindu,
        initiellAktivEtikettErSatt,
        setInitiellAktivEtikettErSatt,
    } = useTidslinjeContext();

    const onEtikettClick = () => {
        settAktivEtikett(etikett);
    };

    useEffect(() => {
        if (
            !initiellAktivEtikettErSatt &&
            etikett.date.getFullYear() === new Date().getFullYear() &&
            etikett.date.getMonth() === new Date().getMonth()
        ) {
            settAktivEtikett(etikett);
            setInitiellAktivEtikettErSatt(true);
        }
    }, [etikett]);

    return (
        <FamilieBaseKnapp
            aria-label={etikett.label}
            disabled={aktivtTidslinjeVindu.vindu.id === TidslinjeVindu.TRE_ÅR}
            className={classNames(styles.etikettKnapp, {
                [styles.valgt]: !!aktivEtikett && aktivEtikett.date.toDateString() === etikett.date.toDateString(),
            })}
            onClick={onEtikettClick}
        >
            <span>{etikett.label}</span>
        </FamilieBaseKnapp>
    );
};

export default TidslinjeEtikett;
