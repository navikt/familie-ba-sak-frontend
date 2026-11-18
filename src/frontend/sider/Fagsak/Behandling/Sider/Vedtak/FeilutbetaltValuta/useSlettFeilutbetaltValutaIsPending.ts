import { mutationKeys } from '@hooks/keys/mutationKeys';
import { useMutationState } from '@tanstack/react-query';

interface Props {
    feilutbetaltValutaId: number;
}

export function useSlettFeilutbetaltValutaIsPending({ feilutbetaltValutaId }: Props) {
    const states = useMutationState({
        filters: { mutationKey: mutationKeys.slettFeilutbetaltValuta(feilutbetaltValutaId) },
    });
    const currentState = states[states.length - 1];
    return currentState && currentState.status === 'pending';
}
