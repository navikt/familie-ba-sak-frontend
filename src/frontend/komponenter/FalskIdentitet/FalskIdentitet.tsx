import React from 'react';

import { BodyShort, Heading } from '@navikt/ds-react';

import styles from './FalskIdentitet.module.css';
import { Skillelinje } from '../PersonInformasjon/PersonInformasjon';

interface IProps {
    harFalskIdentitet: boolean;
    erHeading?: boolean;
}

export function FalskIdentitet({ harFalskIdentitet, erHeading }: IProps) {
    if (!harFalskIdentitet) {
        return null;
    }
    if (erHeading) {
        return (
            <>
                <Heading level="2" size="medium" as="span">
                    <mark className={styles.falskIdentitet}>Falsk identitet</mark>
                </Heading>
                <Skillelinje erHeading />
            </>
        );
    }
    return (
        <>
            <BodyShort as={'span'} weight={'semibold'}>
                <mark className={styles.falskIdentitet}>Falsk identitet</mark>
            </BodyShort>
            <Skillelinje />
        </>
    );
}
