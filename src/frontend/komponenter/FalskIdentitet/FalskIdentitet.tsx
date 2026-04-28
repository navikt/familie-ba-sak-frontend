import React from 'react';

import { BodyShort, Heading } from '@navikt/ds-react';

import styles from './FalskIdentitet.module.css';

interface Props {
    erHeading?: boolean;
}

export function FalskIdentitet({ erHeading }: Props) {
    if (erHeading) {
        return (
            <Heading level={'2'} size={'medium'} as={'span'}>
                <mark className={styles.falskIdentitet}>Falsk identitet</mark>
            </Heading>
        );
    }
    return (
        <BodyShort as={'span'} weight={'semibold'}>
            <mark className={styles.falskIdentitet}>Falsk identitet</mark>
        </BodyShort>
    );
}
