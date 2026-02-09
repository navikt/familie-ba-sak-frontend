import { useMutationState } from '@tanstack/react-query';

import { OppdaterVedtaksperioderMedFriteksterMutationKeyFactory } from './useOppdaterVedtaksperiodeMedFritekster';

export function useOppdaterVedtaksperioderMedFriteksterMutationState(vedtaksperiodeMedBegrunnelserId: number) {
    return useMutationState({
        filters: {
            mutationKey: OppdaterVedtaksperioderMedFriteksterMutationKeyFactory.vedtaksperiodeMedBegrunnelser(
                vedtaksperiodeMedBegrunnelserId
            ),
        },
        select: mutation => mutation.state,
    }).at(-1);
}
