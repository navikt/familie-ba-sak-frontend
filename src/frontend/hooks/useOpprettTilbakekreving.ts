import { opprettTilbakekreving } from '@api/opprettTilbakekreving';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { FagsakId } from '@typer/fagsak';

interface OpprettTilbakekrevingParameters {
    fagsakId: FagsakId;
}

type Options = Omit<UseMutationOptions<string, DefaultError, OpprettTilbakekrevingParameters>, 'mutationFn'>;

export function useOpprettTilbakekreving(options?: Options) {
    return useMutation<string, Error, OpprettTilbakekrevingParameters>({
        mutationFn: ({ fagsakId }: OpprettTilbakekrevingParameters): Promise<string> => opprettTilbakekreving(fagsakId),
        ...options,
    });
}
