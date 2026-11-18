import { mutationKeys } from '@hooks/keys/mutationKeys';
import { useMutationState } from '@tanstack/react-query';

export function useOppdaterVedtaksperiodeMedFriteksterIsPending(vedtaksperiodeMedBegrunnelserId: number): boolean {
    const states = useMutationState({
        filters: {
            mutationKey: mutationKeys.oppdaterVedtaksperiodeMedFritekster(vedtaksperiodeMedBegrunnelserId),
        },
        select: mutation => mutation.state,
    });
    const currentState = states.at(-1);
    return currentState?.status === 'pending';
}
