import { kopierVilkårFraSøkerTilBarna } from '@api/kopierVilkårFraSøkerTilBarna';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

import { useHttp } from '@navikt/familie-http';

interface Parameters {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useKopierVilkårFraSøkerTilBarna(options?: Options) {
    const { request } = useHttp();
    return useMutation<IBehandling, Error, Parameters>({
        mutationFn: (parameters: Parameters): Promise<IBehandling> => {
            const { behandlingId } = parameters;
            return kopierVilkårFraSøkerTilBarna(request, behandlingId);
        },
        ...options,
    });
}
