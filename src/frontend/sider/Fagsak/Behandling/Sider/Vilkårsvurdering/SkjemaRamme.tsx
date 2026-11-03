import { VStack } from '@navikt/ds-react';
import type { PropsWithChildren } from 'react';

import styles from './SkjemaRamme.module.css';

export function SkjemaRamme({ children }: PropsWithChildren) {
    return (
        <VStack gap={'space-16'} className={styles.ramme}>
            {children}
        </VStack>
    );
}
