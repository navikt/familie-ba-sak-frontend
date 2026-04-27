import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { oppdaterBehandlingsresultat } from '../api/oppdaterBehandlingsresultat';
import type { IBehandling } from '../typer/behandling';

interface Parameters {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterBehandlingsresultat(options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId } = parameters;
            return oppdaterBehandlingsresultat(request, behandlingId);
        },
        ...options,
    });
}
