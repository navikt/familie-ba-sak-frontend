import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { oppdaterEndretUtbetalingAndel } from '../api/oppdaterEndretUtbetalingAndel';
import { useBehandlingContext } from '../sider/Fagsak/Behandling/context/BehandlingContext';
import type { IBehandling } from '../typer/behandling';
import type { IRestEndretUtbetalingAndel } from '../typer/utbetalingAndel';

type Options = Omit<
    UseMutationOptions<IBehandling, DefaultError, IRestEndretUtbetalingAndel>,
    'mutationKey' | 'mutationFn'
>;

export const OppdaterEndretUtbetalingAndelMutationKeyFactory = {
    endretUtbetalingAndel: (endretUtbetalingAndel: IRestEndretUtbetalingAndel) => [
        'oppdaterEndretUtbetalingAndel',
        endretUtbetalingAndel.id,
    ],
};

export function useOppdaterEndretUtbetalingAndel(endretUtbetalingAndel: IRestEndretUtbetalingAndel, options?: Options) {
    const { request } = useHttp();
    const { behandling } = useBehandlingContext();
    return useMutation({
        mutationKey: OppdaterEndretUtbetalingAndelMutationKeyFactory.endretUtbetalingAndel(endretUtbetalingAndel),
        mutationFn: (endretUtbetalingAndel: IRestEndretUtbetalingAndel) =>
            oppdaterEndretUtbetalingAndel(request, behandling.behandlingId, endretUtbetalingAndel),
        ...options,
    });
}
