import { taBehandlingAvVent } from '@api/taBehandlingAvVent';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, number>, 'mutationFn'>;

export function useTaBehandlingAvVent(options?: Options) {
    return useMutation({
        mutationFn: (behandlingId: number) => taBehandlingAvVent(behandlingId),
        ...options,
    });
}
