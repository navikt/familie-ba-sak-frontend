import { type LåsOppFagsakPayload, låsOppFagsak } from '@api/låsOppFagsak';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { FagsakId, IMinimalFagsak } from '@typer/fagsak';

interface Parameters extends LåsOppFagsakPayload {
    fagsakId: FagsakId;
}

type Options = Omit<UseMutationOptions<IMinimalFagsak, DefaultError, Parameters>, 'mutationFn'>;

export function useLåsOppFagsak(options?: Options) {
    return useMutation({
        mutationFn: ({ fagsakId, begrunnelse }: Parameters) => låsOppFagsak(fagsakId, { begrunnelse }),
        ...options,
    });
}
