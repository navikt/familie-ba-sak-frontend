import { useMutationState } from '@tanstack/react-query';

import { OppdaterEndretUtbetalingAndelMutationKeyFactory } from './useOppdaterEndretUtbetalingAndel';
import type { IRestEndretUtbetalingAndel } from '../typer/utbetalingAndel';

interface Props {
    endretUtbetalingAndel: IRestEndretUtbetalingAndel;
}

export function useOppdatererEndretUtbetalingAndelIsPending({ endretUtbetalingAndel }: Props) {
    const states = useMutationState({
        filters: {
            mutationKey: OppdaterEndretUtbetalingAndelMutationKeyFactory.endretUtbetalingAndel(endretUtbetalingAndel),
        },
    });
    const currentState = states[states.length - 1];
    return currentState && currentState.status === 'pending';
}
