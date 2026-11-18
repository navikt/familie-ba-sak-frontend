import { mutationKeys } from '@hooks/keys/mutationKeys';
import { useMutationState } from '@tanstack/react-query';
import type { IRestEndretUtbetalingAndel } from '../typer/utbetalingAndel';

interface Props {
    endretUtbetalingAndel: IRestEndretUtbetalingAndel;
}

export function useOppdatererEndretUtbetalingAndelIsPending({ endretUtbetalingAndel }: Props) {
    const states = useMutationState({
        filters: {
            mutationKey: mutationKeys.oppdaterEndretUtbetalingAndel(endretUtbetalingAndel.id),
        },
    });
    const currentState = states[states.length - 1];
    return currentState && currentState.status === 'pending';
}
