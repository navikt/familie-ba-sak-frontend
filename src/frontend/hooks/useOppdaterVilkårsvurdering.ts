import { oppdaterVilkårsvurdering } from '@api/oppdaterVilkårsvurdering';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

import { useHttp } from '@navikt/familie-http';

interface Parameters {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterVilkårsvurdering(options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId } = parameters;
            return oppdaterVilkårsvurdering(request, behandlingId);
        },
        ...options,
    });
}
