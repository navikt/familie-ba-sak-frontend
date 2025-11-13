import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { slettEndretUtbetalingAndel } from '../api/slettEndretUtbetalingAndel';
import { useBehandlingContext } from '../sider/Fagsak/Behandling/context/BehandlingContext';
import type { IBehandling } from '../typer/behandling';
import type { IRestEndretUtbetalingAndel } from '../typer/utbetalingAndel';

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, IRestEndretUtbetalingAndel>, 'mutationFn'>;

export const SlettEndretUtbetalingAndelMutationKeyFactory = {
    endretUtbetalingAndel: (endretUtbetalingAndel: IRestEndretUtbetalingAndel) => [
        'slettEndretUtbetalingAndel',
        endretUtbetalingAndel.id,
    ],
};

export function useSlettEndretUtbetalingAndel(options?: Options) {
    const { request } = useHttp();
    const { behandling } = useBehandlingContext();
    return useMutation({
        mutationFn: (endretUtbetalingAndel: IRestEndretUtbetalingAndel) =>
            slettEndretUtbetalingAndel(request, behandling.behandlingId, endretUtbetalingAndel),
        ...options,
    });
}
