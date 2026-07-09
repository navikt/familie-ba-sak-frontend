import { slettEndretUtbetalingAndel } from '@api/slettEndretUtbetalingAndel';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import type { IRestEndretUtbetalingAndel } from '@typer/utbetalingAndel';

import { useHttp } from '@navikt/familie-http';

type Options = Omit<
    UseMutationOptions<IBehandling, DefaultError, IRestEndretUtbetalingAndel>,
    'mutationKey' | 'mutationFn'
>;

export const SlettEndretUtbetalingAndelMutationKeyFactory = {
    endretUtbetalingAndel: (endretUtbetalingAndel: IRestEndretUtbetalingAndel) => [
        'slettEndretUtbetalingAndel',
        endretUtbetalingAndel.id,
    ],
};

export function useSlettEndretUtbetalingAndel(endretUtbetalingAndel: IRestEndretUtbetalingAndel, options?: Options) {
    const { request } = useHttp();
    const behandlingId = useBehandlingId();
    return useMutation({
        mutationKey: SlettEndretUtbetalingAndelMutationKeyFactory.endretUtbetalingAndel(endretUtbetalingAndel),
        mutationFn: (endretUtbetalingAndel: IRestEndretUtbetalingAndel) =>
            slettEndretUtbetalingAndel(request, behandlingId, endretUtbetalingAndel),
        ...options,
    });
}
