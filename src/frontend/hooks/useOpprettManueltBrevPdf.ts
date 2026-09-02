import { opprettManueltBrevPdf } from '@api/opprettManueltBrevPdf';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IManueltBrevRequestPåBehandling } from '@typer/dokument';
import { opprettPdfBlob } from '@utils/blob';

interface MutationParameters {
    behandlingId: number;
    payload: IManueltBrevRequestPåBehandling;
}

type Options = Omit<UseMutationOptions<string, DefaultError, MutationParameters>, 'mutationFn'>;

export function useOpprettManueltBrevPdf(options?: Options) {
    return useMutation({
        mutationFn: async ({ behandlingId, payload }: MutationParameters) => {
            const bytes = await opprettManueltBrevPdf({ behandlingId }, payload);
            const blob = opprettPdfBlob(bytes);
            return window.URL.createObjectURL(blob);
        },
        ...options,
    });
}
