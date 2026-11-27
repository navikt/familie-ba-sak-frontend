import { type OpprettFagsakPayload, opprettFagsak } from '@api/opprettFagsak';
import { MetaKey } from '@hooks/meta/metaKey';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IMinimalFagsak } from '@typer/fagsak';

type Options = Omit<UseMutationOptions<IMinimalFagsak, DefaultError, OpprettFagsakPayload>, 'mutationFn'>;

export function useOpprettFagsak(options?: Options) {
    return useMutation({
        mutationFn: (payload: OpprettFagsakPayload) => opprettFagsak(payload),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        ...options,
    });
}
