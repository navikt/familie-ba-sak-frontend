import { mutationKeys } from '@hooks/keys/mutationKeys';
import { useMutationState } from '@tanstack/react-query';

export function useOppdaterVedtaksperiodeMedBegrunnelserIsPending(vedtaksperiodeMedBegrunnelserId: number) {
    const states = useMutationState({
        filters: {
            mutationKey: mutationKeys.oppdaterVedtaksperiodeMedBegrunnelser(vedtaksperiodeMedBegrunnelserId),
        },
        select: mutation => mutation.state,
    });
    const currentState = states.at(-1);
    return currentState?.status === 'pending';
}
