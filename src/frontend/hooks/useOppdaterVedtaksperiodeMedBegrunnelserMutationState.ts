import { useMutationState } from '@tanstack/react-query';

import { OppdaterVedtaksperiodeMedBegrunnelserMutationKeyFactory } from './useOppdaterVedtaksperiodeMedBegrunnelser';

export function useOppdaterVedtaksperiodeMedBegrunnelserMutationState(vedtaksperiodeMedBegrunnelserId: number) {
    return useMutationState({
        filters: {
            mutationKey: OppdaterVedtaksperiodeMedBegrunnelserMutationKeyFactory.vedtaksperiodeMedBegrunnelser(
                vedtaksperiodeMedBegrunnelserId
            ),
        },
        select: mutation => mutation.state,
    }).at(-1);
}
