import { fjernSmåbarnstillegg } from '@api/fjernSmåbarnstillegg';
import type { Småbarnstilleggkorrigering } from '@api/leggTilSmåbarnstillegg';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters extends Småbarnstilleggkorrigering {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useFjernSmåbarnstillegg(options?: Options) {
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, ...payload } = parameters;
            return fjernSmåbarnstillegg(payload, behandlingId);
        },
        ...options,
    });
}
