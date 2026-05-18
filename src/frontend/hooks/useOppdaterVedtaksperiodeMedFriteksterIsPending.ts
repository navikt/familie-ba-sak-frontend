import { useMutationState } from '@tanstack/react-query';

import { OppdaterVedtaksperiodeMedFriteksterMutationKeyFactory } from './useOppdaterVedtaksperiodeMedFritekster';

export function useOppdaterVedtaksperiodeMedFriteksterIsPending(vedtaksperiodeMedBegrunnelserId: number): boolean {
    const states = useMutationState({
        filters: {
            mutationKey: OppdaterVedtaksperiodeMedFriteksterMutationKeyFactory.vedtaksperiodeMedFritekster(
                vedtaksperiodeMedBegrunnelserId
            ),
        },
        select: mutation => mutation.state,
    });
    const currentState = states.at(-1);
    return currentState?.status === 'pending';
}
