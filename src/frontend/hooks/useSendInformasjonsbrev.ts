import { sendInformasjonsbrev } from '@api/sendInformasjonsbrev';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';

import { useHttp } from '@navikt/familie-http';

type Options = Omit<UseMutationOptions<void, DefaultError, IManueltBrevRequestPåFagsak>, 'mutationKey' | 'mutationFn'>;

export const SendInformasjonsbrevMutationKeyFactory = {
    sendInformasjonsbrev: (fagsakId: number) => ['sendInformasjonsbrev', fagsakId],
};

export function useSendInformasjonsbrev(fagsakId: number, options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationKey: SendInformasjonsbrevMutationKeyFactory.sendInformasjonsbrev(fagsakId),
        mutationFn: (payload: IManueltBrevRequestPåFagsak) => sendInformasjonsbrev(request, fagsakId, payload),
        ...options,
    });
}
