import { leggTilSmåbarnstillegg, type Småbarnstilleggkorrigering } from '@api/leggTilSmåbarnstillegg';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters extends Småbarnstilleggkorrigering {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useLeggTilSmåbarnstillegg(options?: Options) {
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, ...payload } = parameters;
            return leggTilSmåbarnstillegg(payload, behandlingId);
        },
        ...options,
    });
}
