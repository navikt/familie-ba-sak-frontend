import * as React from 'react';

import { TrashIcon } from '@navikt/aksel-icons';
import { Button, HStack } from '@navikt/ds-react';

interface SkjemaKnapperProps {
    avbryt: () => void;
    slettEndretUtbetalingAndel: () => void;
}

const SkjemaKnapper = ({ avbryt, slettEndretUtbetalingAndel }: SkjemaKnapperProps) => {
    return (
        <HStack justify="space-between">
            <HStack gap="2">
                <Button size="small" variant="secondary" type="submit">
                    Bekreft
                </Button>
                <Button variant="tertiary" size="small" type="button" onClick={avbryt}>
                    Avbryt
                </Button>
            </HStack>
            <Button
                variant={'tertiary'}
                size={'small'}
                type="button"
                onClick={slettEndretUtbetalingAndel}
                icon={<TrashIcon />}
            >
                {'Fjern periode'}
            </Button>
        </HStack>
    );
};

export default SkjemaKnapper;
