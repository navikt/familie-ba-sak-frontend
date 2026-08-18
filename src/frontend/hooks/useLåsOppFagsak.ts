import { useHttp } from '@navikt/familie-http';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { type LåsOppFagsakPayload, låsOppFagsak } from '../api/låsOppFagsak';
import type { IMinimalFagsak } from '../typer/fagsak';

interface Parameters extends LåsOppFagsakPayload {
    fagsakId: number;
}

type Options = Omit<UseMutationOptions<IMinimalFagsak, DefaultError, Parameters>, 'mutationFn'>;

export function useLåsOppFagsak(options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { fagsakId, begrunnelse } = parameters;
            return låsOppFagsak(request, fagsakId, { begrunnelse });
        },
        ...options,
    });
}
