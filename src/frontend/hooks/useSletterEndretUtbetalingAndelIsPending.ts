import { useMutationState } from '@tanstack/react-query';
import type { IRestEndretUtbetalingAndel } from '../typer/utbetalingAndel';
import { SlettEndretUtbetalingAndelMutationKeyFactory } from './useSlettEndretUtbetalingAndel';

interface Props {
    endretUtbetalingAndel: IRestEndretUtbetalingAndel;
}

export function useSletterEndretUtbetalingAndelIsPending({ endretUtbetalingAndel }: Props) {
    const states = useMutationState({
        filters: {
            mutationKey: SlettEndretUtbetalingAndelMutationKeyFactory.endretUtbetalingAndel(endretUtbetalingAndel),
        },
    });
    const currentState = states[states.length - 1];
    return currentState && currentState.status === 'pending';
}
