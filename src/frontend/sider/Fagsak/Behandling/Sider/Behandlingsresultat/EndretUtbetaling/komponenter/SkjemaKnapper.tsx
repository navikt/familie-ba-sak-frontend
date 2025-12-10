import * as React from 'react';

import { useMutationState } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import { TrashIcon } from '@navikt/aksel-icons';
import { Button, HStack } from '@navikt/ds-react';
import { byggDataRessurs } from '@navikt/familie-typer';

import { OppdaterEndretUtbetalingAndelMutationKeyFactory } from '../../../../../../../hooks/useOppdaterEndretUtbetalingAndel';
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

    const { mutateAsync, isPending: sletterEndretUtbetalingAndel } = useSlettEndretUtbetalingAndel({
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

    const oppdatererEndretUtbetalingAndel =
        useMutationState({
            filters: {
                mutationKey:
                    OppdaterEndretUtbetalingAndelMutationKeyFactory.endretUtbetalingAndel(endretUtbetalingAndel),
                status: 'pending',
            },
        }).length > 0;

    const skalDisableKnapper = oppdatererEndretUtbetalingAndel || sletterEndretUtbetalingAndel;

    return (
        <HStack justify="space-between">
            <HStack gap="2">
                <Button
                    size="small"
                    variant="secondary"
                    type="submit"
                    loading={oppdatererEndretUtbetalingAndel}
                    disabled={skalDisableKnapper}
                >
                    Bekreft
                </Button>
                <Button variant="tertiary" size="small" type="button" onClick={avbryt} disabled={skalDisableKnapper}>
                    Avbryt
                </Button>
            </HStack>
            <Button
                variant={'tertiary'}
                size={'small'}
                type="button"
                onClick={slettEndretUtbetalingAndel}
                icon={<TrashIcon />}
                loading={sletterEndretUtbetalingAndel}
                disabled={skalDisableKnapper}
            >
                Fjern periode
            </Button>
        </HStack>
    );
};

export default SkjemaKnapper;
