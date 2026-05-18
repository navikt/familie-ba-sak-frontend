import { useMutationState } from '@tanstack/react-query';

import { OppdaterVedtaksperiodeMedFriteksterMutationKeyFactory } from './useOppdaterVedtaksperiodeMedFritekster';

export function useOppdaterVedtaksperiodeMedFriteksterMutationState(vedtaksperiodeMedBegrunnelserId: number) {
    return useMutationState({
        filters: {
            mutationKey: OppdaterVedtaksperiodeMedFriteksterMutationKeyFactory.vedtaksperiodeMedFritekster(
                vedtaksperiodeMedBegrunnelserId
            ),
        },
        select: mutation => mutation.state,
    }).at(-1);
}
