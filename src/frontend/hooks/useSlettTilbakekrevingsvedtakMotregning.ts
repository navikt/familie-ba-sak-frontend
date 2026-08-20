import type { ApiFeil } from '@api/client/apiClient';
import { slettTilbakekrevingsvedtakMotregning } from '@api/slettTilbakekrevingsvedtakMotregning';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, ApiFeil, Parameters>, 'mutationFn'>;

export function useSlettTilbakekrevingsvedtakMotregning(options?: Options) {
    return useMutation<IBehandling, ApiFeil, Parameters>({
        mutationFn: ({ behandlingId }: Parameters): Promise<IBehandling> => {
            return slettTilbakekrevingsvedtakMotregning({ behandlingId });
        },
        ...options,
    });
}
