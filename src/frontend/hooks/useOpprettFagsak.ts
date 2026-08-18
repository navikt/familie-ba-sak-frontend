import { useHttp } from '@navikt/familie-http';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { type OpprettFagsakPayload, opprettFagsak } from '../api/opprettFagsak';
import type { IMinimalFagsak } from '../typer/fagsak';

type Options = Omit<UseMutationOptions<IMinimalFagsak, DefaultError, OpprettFagsakPayload>, 'mutationFn'>;

export function useOpprettFagsak(options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (fagsakData: OpprettFagsakPayload) => opprettFagsak(request, fagsakData),
        ...options,
    });
}
