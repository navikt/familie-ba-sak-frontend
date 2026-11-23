import { oppdaterEndretUtbetalingAndel } from '@api/oppdaterEndretUtbetalingAndel';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useHttp } from '@navikt/familie-http';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import type { IRestEndretUtbetalingAndel } from '@typer/utbetalingAndel';

type Options = Omit<
    UseMutationOptions<IBehandling, DefaultError, IRestEndretUtbetalingAndel>,
    'mutationKey' | 'mutationFn'
>;

export function useOppdaterEndretUtbetalingAndel(endretUtbetalingAndel: IRestEndretUtbetalingAndel, options?: Options) {
    const { request } = useHttp();
    const behandlingId = useBehandlingId();
    return useMutation({
        mutationKey: mutationKeys.oppdaterEndretUtbetalingAndel(endretUtbetalingAndel.id),
        mutationFn: (endretUtbetalingAndel: IRestEndretUtbetalingAndel) =>
            oppdaterEndretUtbetalingAndel(request, behandlingId, endretUtbetalingAndel),
        ...options,
    });
}
