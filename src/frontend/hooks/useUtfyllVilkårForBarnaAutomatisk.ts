import { utfyllVilkårForBarnaAutomatisk } from '@api/utfyllVilkårForBarnaAutomatisk';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

import { useHttp } from '@navikt/familie-http';

interface Parameters {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useUtfyllVilkårForBarnaAutomatisk(options?: Options) {
    const { request } = useHttp();
    return useMutation<IBehandling, Error, Parameters>({
        mutationFn: (parameters: Parameters): Promise<IBehandling> => {
            const { behandlingId } = parameters;
            return utfyllVilkårForBarnaAutomatisk(request, behandlingId);
        },
        ...options,
    });
}
