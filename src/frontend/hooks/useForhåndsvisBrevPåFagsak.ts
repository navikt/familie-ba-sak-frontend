import { forhåndsvisBrevPåFagsak } from '@api/forhåndsvisBrevPåFagsak';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';
import { opprettPdfBlob } from '@utils/blob';

type Options = Omit<
    UseMutationOptions<string, DefaultError, IManueltBrevRequestPåFagsak>,
    'mutationKey' | 'mutationFn'
>;

export function useForhåndsvisBrevPåFagsak(fagsakId: number, options?: Options) {
    return useMutation({
        mutationKey: mutationKeys.forhåndsvisBrevPåFagsak(fagsakId),
        mutationFn: async (payload: IManueltBrevRequestPåFagsak) => {
            try {
                const base64 = await forhåndsvisBrevPåFagsak(fagsakId, payload);
                const blob = opprettPdfBlob(base64);
                return Promise.resolve(window.URL.createObjectURL(blob));
            } catch (e) {
                const error = e instanceof Error ? e : new Error('En ukjent feil oppstod.');
                return Promise.reject(error);
            }
        },
        ...options,
    });
}
