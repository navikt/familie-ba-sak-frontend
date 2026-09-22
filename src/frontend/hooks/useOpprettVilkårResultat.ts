import { opprettVilkårResultat } from '@api/opprettVilkårResultat';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import type { IRestNyttVilkår } from '@typer/vilkår';

interface Parameters extends IRestNyttVilkår {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOpprettVilkårResultat(options?: Options) {
    return useMutation({
        mutationFn: ({ behandlingId, ...payload }: Parameters) => opprettVilkårResultat(behandlingId, payload),
        ...options,
    });
}
