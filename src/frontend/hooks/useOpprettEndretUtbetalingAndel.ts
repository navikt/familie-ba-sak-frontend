import type { ApiFeil } from '@api/client/apiClient';
import { opprettEndretUtbetalingAndel } from '@api/opprettEndretUtbetalingAndel';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

type Options = Omit<UseMutationOptions<IBehandling, ApiFeil>, 'mutationFn'>;

export function useOpprettEndretUtbetalingAndel(options?: Options) {
    const behandlingId = useBehandlingId();
    return useMutation<IBehandling, ApiFeil>({
        mutationFn: () => opprettEndretUtbetalingAndel(behandlingId),
        ...options,
    });
}
