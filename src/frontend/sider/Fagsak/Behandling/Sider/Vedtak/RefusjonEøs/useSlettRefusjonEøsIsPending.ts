import { mutationKeys } from '@hooks/keys/mutationKeys';
import { useMutationState } from '@tanstack/react-query';

interface Props {
    refusjonEøsId: number;
}

export function useSlettRefusjonEøsIsPending({ refusjonEøsId }: Props) {
    const states = useMutationState({
        filters: { mutationKey: mutationKeys.slettRefusjonEøs(refusjonEøsId) },
    });
    const currentState = states[states.length - 1];
    return currentState && currentState.status === 'pending';
}
