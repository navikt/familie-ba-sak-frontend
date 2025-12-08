import { useMutationState } from '@tanstack/react-query';

import { lagMutationKey } from '../../../../../../hooks/useSlettFeilutbetaltValuta';

interface Props {
    feilutbetaltValutaId: number;
}

export function useSlettFeilutbetaltValutaIsPending({ feilutbetaltValutaId }: Props) {
    const states = useMutationState({
        filters: { mutationKey: lagMutationKey(feilutbetaltValutaId) },
    });
    const currentState = states[states.length - 1];
    return currentState && currentState.status === 'pending';
}
