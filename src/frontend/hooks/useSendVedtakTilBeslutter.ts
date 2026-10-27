import { sendVedtakTilBeslutter } from '@api/sendVedtakTilBeslutter';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

interface Parameters {
    behandlingId: number;
    behandlendeEnhet: string;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useSendVedtakTilBeslutter(options?: Options) {
    return useMutation({
        mutationFn: (parameters: Parameters): Promise<IBehandling> => sendVedtakTilBeslutter(parameters),
        ...options,
    });
}
