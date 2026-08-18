import { endreVurderingsstrategiForValutakurser } from '@api/valutakurs';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling, VurderingsstrategiForValutakurser } from '@typer/behandling';

interface EndreVurderingsstrategiParameters {
    behandlingId: number;
    vurderingsstrategi: VurderingsstrategiForValutakurser;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, EndreVurderingsstrategiParameters>, 'mutationFn'>;

export function useEndreVurderingsstrategiForValutakurser(options?: Options) {
    return useMutation({
        mutationFn: ({ behandlingId, vurderingsstrategi }: EndreVurderingsstrategiParameters) =>
            endreVurderingsstrategiForValutakurser(behandlingId, vurderingsstrategi),
        ...options,
    });
}
