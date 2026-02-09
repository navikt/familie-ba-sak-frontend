import { useMutationState } from '@tanstack/react-query';

import { OppdaterStandardbegrunnelserMutationKeyFactory } from './useOppdaterStandardbegrunnelser';

export function useOppdaterStandardbegrunnelserMutationState(vedtaksperiodeMedBegrunnelserId: number) {
    return useMutationState({
        filters: {
            mutationKey: OppdaterStandardbegrunnelserMutationKeyFactory.vedtaksperiodeMedBegrunnelser(
                vedtaksperiodeMedBegrunnelserId
            ),
        },
        select: mutation => mutation.state,
    }).at(-1);
}
