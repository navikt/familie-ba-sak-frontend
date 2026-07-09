import { slettVilkårResultat } from '@api/slettVilkårResultat';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

export interface Parameters {
    behandlingId: number;
    vilkårResultatId: number;
    personIdent: string;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationKey' | 'mutationFn'>;

export const SlettVilkårResultatMutationKeyFactory = { slettVilkårResultat: () => ['slettVilkårResultat'] };

export function useSlettVilkårResultat(options?: Options) {
    return useMutation({
        mutationKey: SlettVilkårResultatMutationKeyFactory.slettVilkårResultat(),
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, vilkårResultatId, personIdent } = parameters;
            const pathParams = { behandlingId, vilkårResultatId };
            const payload = { personIdent };
            return slettVilkårResultat(pathParams, payload);
        },
        ...options,
    });
}
