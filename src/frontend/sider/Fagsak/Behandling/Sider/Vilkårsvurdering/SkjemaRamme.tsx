import { useErNyttOppsett } from '@hooks/useKonsept';
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
    const erNyttOppsett = useErNyttOppsett();

    if (erNyttOppsett) {
        // Konsept 2 og 3: skjemaet ligger flatt i vilkårskortet, uten innrykk og farget kantlinje
        return (
            <VStack gap={'space-16'} className={styles.flat}>
                {children}
            </VStack>
        );
    }

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
