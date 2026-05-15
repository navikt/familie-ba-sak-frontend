import { useMutationState } from '@tanstack/react-query';

import { OppdaterVedtaksperiodeMedBegrunnelserMutationKeyFactory } from './useOppdaterVedtaksperiodeMedBegrunnelser';

export function useOppdaterVedtaksperiodeMedBegrunnelserIsPending(vedtaksperiodeMedBegrunnelserId: number) {
    const states = useMutationState({
        filters: {
            mutationKey: OppdaterVedtaksperiodeMedBegrunnelserMutationKeyFactory.vedtaksperiodeMedBegrunnelser(
                vedtaksperiodeMedBegrunnelserId
            ),
        },
        select: mutation => mutation.state,
    });
    const currentState = states.at(-1);
    return currentState?.status === 'pending';
}
