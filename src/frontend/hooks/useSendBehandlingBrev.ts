import { sendBehandlingBrev } from '@api/sendBehandlingBrev';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import type { IManueltBrevRequestPåBehandling } from '@typer/dokument';

type Options = Omit<
    UseMutationOptions<IBehandling, DefaultError, IManueltBrevRequestPåBehandling>,
    'mutationKey' | 'mutationFn'
>;

export const SendBehandlingBrevMutationKeyFactory = {
    sendBrev: (behandlingId: number) => ['sendBehandlingBrev', behandlingId],
};

export function useSendBehandlingBrev(behandlingId: number, options?: Options) {
    return useMutation({
        mutationKey: SendBehandlingBrevMutationKeyFactory.sendBrev(behandlingId),
        mutationFn: (payload: IManueltBrevRequestPåBehandling) => sendBehandlingBrev(behandlingId, payload),
        ...options,
    });
}
