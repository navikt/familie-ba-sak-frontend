import type { ApiFeil } from '@api/client/apiClient';
import { oppdaterTilbakekreving } from '@api/oppdaterTilbakekreving';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import type { ITilbakekreving } from '@typer/simulering';

interface Parameters {
    behandlingId: number;
    tilbakekreving: ITilbakekreving | undefined;
}

type Options = Omit<UseMutationOptions<IBehandling, ApiFeil, Parameters>, 'mutationFn'>;

export function useOppdaterTilbakekreving(options?: Options) {
    return useMutation<IBehandling, ApiFeil, Parameters>({
        mutationFn: ({ behandlingId, tilbakekreving }: Parameters): Promise<IBehandling> => {
            return oppdaterTilbakekreving({ behandlingId }, tilbakekreving);
        },
        ...options,
    });
}
