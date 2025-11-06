import * as React from 'react';

import { useFormContext } from 'react-hook-form';

import { TrashIcon } from '@navikt/aksel-icons';
import { Button, HStack } from '@navikt/ds-react';
import { byggDataRessurs } from '@navikt/familie-typer';

import {
    SlettEndretUtbetalingAndelMutationKeyFactory,
    useSlettEndretUtbetalingAndel,
} from '../../../../../../../hooks/useSlettEndretUtbetalingAndel';
import { useBehandlingContext } from '../../../../context/BehandlingContext';
import { useEndretUtbetalingAndelContext } from '../EndretUtbetalingAndelContext';
import type { EndretUtbetalingAndelFormValues } from '../useEndretUtbetalingAndelRHF';

interface SkjemaKnapperProps {
    lukkSkjema: () => void;
}

const SkjemaKnapper = ({ lukkSkjema }: SkjemaKnapperProps) => {
    const { settÅpenBehandling } = useBehandlingContext();
    const { endretUtbetalingAndel } = useEndretUtbetalingAndelContext();
    const { reset, setError } = useFormContext<EndretUtbetalingAndelFormValues>();

    const avbryt = () => {
        lukkSkjema();
        reset();
    };

    const { mutateAsync } = useSlettEndretUtbetalingAndel({
        mutationKey: SlettEndretUtbetalingAndelMutationKeyFactory.endretUtbetalingAndel(endretUtbetalingAndel),
    });

    const slettEndretUtbetalingAndel = () =>
        mutateAsync(endretUtbetalingAndel)
            .then(behandling => {
                lukkSkjema();
                settÅpenBehandling(byggDataRessurs(behandling));
            })
            .catch(error => {
                setError('root', {
                    message: error.message ?? 'Ukjent feil oppstod.',
                });
            });

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
