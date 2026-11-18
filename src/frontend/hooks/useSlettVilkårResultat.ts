import { slettVilkårResultat } from '@api/slettVilkårResultat';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

export interface Parameters {
    behandlingId: number;
    vilkårResultatId: number;
    personIdent: string;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationKey' | 'mutationFn'>;

export function useSlettVilkårResultat(options?: Options) {
    return useMutation({
        mutationKey: mutationKeys.slettVilkårResultat(),
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, vilkårResultatId, personIdent } = parameters;
            const pathParams = { behandlingId, vilkårResultatId };
            const payload = { personIdent };
            return slettVilkårResultat(pathParams, payload);
        },
        ...options,
    });
}
