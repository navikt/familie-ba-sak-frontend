import { oppdaterEndretUtbetalingAndel } from '@api/oppdaterEndretUtbetalingAndel';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import type { IRestEndretUtbetalingAndel } from '@typer/utbetalingAndel';

import { useHttp } from '@navikt/familie-http';

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
    const behandlingId = useBehandlingId();
    return useMutation({
        mutationKey: OppdaterEndretUtbetalingAndelMutationKeyFactory.endretUtbetalingAndel(endretUtbetalingAndel),
        mutationFn: (endretUtbetalingAndel: IRestEndretUtbetalingAndel) =>
            oppdaterEndretUtbetalingAndel(request, behandlingId, endretUtbetalingAndel),
        ...options,
    });
}
