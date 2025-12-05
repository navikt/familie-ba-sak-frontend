import { useMutationState } from '@tanstack/react-query';

import { lagMutationKey } from '../../../../../../hooks/useSlettRefusjonEøs';

interface Props {
    refusjonEøsId: number;
}

export function useSlettRefusjonEøsIsPending({ refusjonEøsId }: Props) {
    const states = useMutationState({
        filters: { mutationKey: lagMutationKey(refusjonEøsId) },
    });
    const currentState = states[states.length - 1];
    return currentState && currentState.status === 'pending';
}
