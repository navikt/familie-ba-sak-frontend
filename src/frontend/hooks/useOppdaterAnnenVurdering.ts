import { oppdaterAnnenVurdering } from '@api/oppdaterAnnenVurdering';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import type { IRestAnnenVurdering } from '@typer/vilkår';

interface Parameters {
    behandlingId: number;
    annenVurdering: IRestAnnenVurdering;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterAnnenVurdering(options?: Options) {
    return useMutation({
        mutationFn: ({ behandlingId, annenVurdering }: Parameters) =>
            oppdaterAnnenVurdering({ behandlingId, annenVurderingId: annenVurdering.id }, annenVurdering),
        ...options,
    });
}
