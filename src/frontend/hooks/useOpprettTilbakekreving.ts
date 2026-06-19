import { opprettTilbakekreving } from '@api/opprettTilbakekreving';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface OpprettTilbakekrevingParameters {
    fagsakId: number;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, OpprettTilbakekrevingParameters>, 'mutationFn'>;

export function useOpprettTilbakekreving(options?: Options) {
    return useMutation<IBehandling, Error, OpprettTilbakekrevingParameters>({
        mutationFn: ({ fagsakId }: OpprettTilbakekrevingParameters): Promise<IBehandling> =>
            opprettTilbakekreving(fagsakId),
        ...options,
    });
}
