import { VStack } from '@navikt/ds-react';
import { Resultat } from '@typer/vilkår';
import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

import styles from './SkjemaRamme.module.css';

interface Props extends PropsWithChildren {
    lesevisning: boolean;
    resultat: Resultat;
}

export function SkjemaRamme({ lesevisning, resultat, children }: Props) {
    return (
        <VStack
            gap={'space-16'}
            className={classNames(styles.ramme, {
                [styles.lesevisning]: lesevisning,
                [styles.ikkeVurdert]: !lesevisning && resultat === Resultat.IKKE_VURDERT,
            })}
        >
            {children}
        </VStack>
    );
}
