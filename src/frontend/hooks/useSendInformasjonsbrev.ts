import { sendInformasjonsbrev } from '@api/sendInformasjonsbrev';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';

type Options = Omit<UseMutationOptions<void, DefaultError, IManueltBrevRequestPåFagsak>, 'mutationKey' | 'mutationFn'>;

export const SendInformasjonsbrevMutationKeyFactory = {
    sendInformasjonsbrev: (fagsakId: number) => ['sendInformasjonsbrev', fagsakId],
};

export function useSendInformasjonsbrev(fagsakId: number, options?: Options) {
    return useMutation({
        mutationKey: SendInformasjonsbrevMutationKeyFactory.sendInformasjonsbrev(fagsakId),
        mutationFn: (payload: IManueltBrevRequestPåFagsak) => sendInformasjonsbrev(fagsakId, payload),
        ...options,
    });
}
