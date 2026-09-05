import { type SlettVilkårPayload, slettVilkår } from '@api/slettVilkår';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters extends SlettVilkårPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useSlettVilkår(options?: Options) {
    return useMutation({
        mutationFn: ({ behandlingId, ...payload }: Parameters) => slettVilkår(behandlingId, payload),
        ...options,
    });
}
