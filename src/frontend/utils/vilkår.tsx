import { FlagCrossIcon, StarsEuIcon } from '@navikt/aksel-icons';

import { Regelverk } from '@typer/vilkår';
import type { ReactNode } from 'react';

import styles from './vilkår.module.css';

export const alleRegelverk: Record<Regelverk, { tekst: string; symbol: ReactNode }> = {
    [Regelverk.NASJONALE_REGLER]: {
        tekst: 'Nasjonale regler',
        symbol: <FlagCrossIcon className={styles.icon} />,
    },
    [Regelverk.EØS_FORORDNINGEN]: {
        tekst: 'EØS-forordningen',
        symbol: <StarsEuIcon className={styles.icon} />,
    },
};
