import { leggTilBarnPåBehandling, type LeggTilBarnPåBehandlingPayload } from '@api/leggTilBarnPåBehandling';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface LeggTilBarnPåBehandlingParameters extends LeggTilBarnPåBehandlingPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, LeggTilBarnPåBehandlingParameters>, 'mutationFn'>;

export function useLeggTilBarnPåBehandling(options?: Options) {
    return useMutation<IBehandling, Error, LeggTilBarnPåBehandlingParameters>({
        mutationFn: (parameters: LeggTilBarnPåBehandlingParameters) => {
            const { behandlingId, ...payload } = parameters;
            return leggTilBarnPåBehandling(payload, behandlingId);
        },
        ...options,
    });
}
