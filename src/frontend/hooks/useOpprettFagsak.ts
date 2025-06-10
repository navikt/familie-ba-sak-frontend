import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { opprettFagsak, type OpprettFagsakPayload } from '../api/opprettFagsak';
import type { IMinimalFagsak } from '../typer/fagsak';

type Options = Omit<
    UseMutationOptions<IMinimalFagsak, DefaultError, OpprettFagsakPayload, unknown>,
    'mutationFn'
>;

export function useOpprettFagsak(options: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (fagsakData: OpprettFagsakPayload) => opprettFagsak(request, fagsakData),
        ...options,
    });
}
