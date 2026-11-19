import { sendInformasjonsbrev } from '@api/sendInformasjonsbrev';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';

type Options = Omit<UseMutationOptions<void, DefaultError, IManueltBrevRequestPåFagsak>, 'mutationKey' | 'mutationFn'>;

export function useSendInformasjonsbrev(fagsakId: number, options?: Options) {
    return useMutation({
        mutationKey: mutationKeys.sendInformasjonsbrev(fagsakId),
        mutationFn: (payload: IManueltBrevRequestPåFagsak) => sendInformasjonsbrev(fagsakId, payload),
        ...options,
    });
}
