import { leggTilBarnPåBehandling, type LeggTilBarnPåBehandlingPayload } from '@api/leggTilBarnPåBehandling';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

import { useHttp } from '@navikt/familie-http';

interface LeggTilBarnPåBehandlingParameters extends LeggTilBarnPåBehandlingPayload {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, LeggTilBarnPåBehandlingParameters>, 'mutationFn'>;

export const useLeggTilBarnPåBehandling = (options?: Options) => {
    const { request } = useHttp();

    return useMutation<IBehandling, Error, LeggTilBarnPåBehandlingParameters>({
        mutationFn: (parameters: LeggTilBarnPåBehandlingParameters): Promise<IBehandling> => {
            const { barnIdent, behandlingId } = parameters;
            return leggTilBarnPåBehandling(request, barnIdent, behandlingId);
        },
        ...options,
    });
};
