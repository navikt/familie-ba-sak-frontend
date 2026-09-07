import { oppdaterVilkårResultat } from '@api/oppdaterVilkårResultat';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import type { IRestPersonResultat } from '@typer/vilkår';

interface Parameters {
    behandlingId: number;
    vilkårResultatId: number;
    personResultat: IRestPersonResultat;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterVilkårResultat(options?: Options) {
    return useMutation({
        mutationFn: ({ behandlingId, vilkårResultatId, personResultat }: Parameters) =>
            oppdaterVilkårResultat({ behandlingId, vilkårResultatId }, personResultat),
        ...options,
    });
}
