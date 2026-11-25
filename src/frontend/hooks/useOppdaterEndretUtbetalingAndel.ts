import type { ApiFeil } from '@api/client/apiClient';
import { oppdaterEndretUtbetalingAndel } from '@api/oppdaterEndretUtbetalingAndel';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import type { IRestEndretUtbetalingAndel } from '@typer/utbetalingAndel';

type Options = Omit<UseMutationOptions<IBehandling, ApiFeil, IRestEndretUtbetalingAndel>, 'mutationKey' | 'mutationFn'>;

export function useOppdaterEndretUtbetalingAndel(endretUtbetalingAndel: IRestEndretUtbetalingAndel, options?: Options) {
    const behandlingId = useBehandlingId();
    return useMutation<IBehandling, ApiFeil, IRestEndretUtbetalingAndel>({
        mutationKey: mutationKeys.oppdaterEndretUtbetalingAndel(endretUtbetalingAndel.id),
        mutationFn: (endretUtbetalingAndel: IRestEndretUtbetalingAndel) =>
            oppdaterEndretUtbetalingAndel(behandlingId, endretUtbetalingAndel),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        ...options,
    });
}
