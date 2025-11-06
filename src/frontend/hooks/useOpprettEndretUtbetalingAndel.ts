import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { opprettEndretUtbetalingAndel } from '../api/opprettEndretUtbetalingAndel';
import { useBehandlingContext } from '../sider/Fagsak/Behandling/context/BehandlingContext';
import type { IBehandling } from '../typer/behandling';

type Options = Omit<UseMutationOptions<IBehandling>, 'mutationKey' | 'mutationFn'>;

export const OpprettEndretUtbetalingAndelMutationKeyFactory = {
    behandling: (behandling: IBehandling) => ['opprettEndretUtbetalingAndel', behandling.behandlingId],
};

export function useOpprettEndretUtbetalingAndel(options?: Options) {
    const { request } = useHttp();
    const { behandling } = useBehandlingContext();
    return useMutation({
        mutationKey: OpprettEndretUtbetalingAndelMutationKeyFactory.behandling(behandling),
        mutationFn: () => opprettEndretUtbetalingAndel(request, behandling.behandlingId),
        ...options,
    });
}
