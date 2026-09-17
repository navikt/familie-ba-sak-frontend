import { sendManueltBrev } from '@api/sendManueltBrev';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import type { IManueltBrevRequestPåBehandling } from '@typer/dokument';

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, IManueltBrevRequestPåBehandling>, 'mutationFn'>;

export function useSendManueltBrev(behandlingId: number, options?: Options) {
    return useMutation({
        mutationFn: (payload: IManueltBrevRequestPåBehandling) => sendManueltBrev(behandlingId, payload),
        ...options,
    });
}
