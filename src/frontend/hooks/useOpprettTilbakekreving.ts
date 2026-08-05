import { opprettTilbakekreving } from '@api/opprettTilbakekreving';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

interface OpprettTilbakekrevingParameters {
    fagsakId: number;
}

type Options = Omit<UseMutationOptions<string, DefaultError, OpprettTilbakekrevingParameters>, 'mutationFn'>;

export function useOpprettTilbakekreving(options?: Options) {
    return useMutation<string, Error, OpprettTilbakekrevingParameters>({
        mutationFn: ({ fagsakId }: OpprettTilbakekrevingParameters): Promise<string> => opprettTilbakekreving(fagsakId),
        ...options,
    });
}
