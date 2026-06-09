import { forhåndsvisBrevPåFagsak } from '@api/forhåndsvisBrevPåFagsak';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IManueltBrevRequestPåFagsak } from '@typer/dokument';
import { opprettPdfBlob } from '@utils/blob';

import { useHttp } from '@navikt/familie-http';

type Options = Omit<
    UseMutationOptions<string, DefaultError, IManueltBrevRequestPåFagsak>,
    'mutationKey' | 'mutationFn'
>;

export const ForhåndsvisBrevPåFagsakMutationKeyFactory = {
    forhåndsvisBrev: (fagsakId: number) => ['forhåndsvisBrevPåFagsak', fagsakId],
};

export function useForhåndsvisBrevPåFagsak(fagsakId: number, options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationKey: ForhåndsvisBrevPåFagsakMutationKeyFactory.forhåndsvisBrev(fagsakId),
        mutationFn: async (payload: IManueltBrevRequestPåFagsak) => {
            try {
                const base64 = await forhåndsvisBrevPåFagsak(request, fagsakId, payload);
                const blob = opprettPdfBlob(base64);
                return Promise.resolve(window.URL.createObjectURL(blob));
            } catch (e) {
                const error = e instanceof Error ? e : Error('En ukjent feil oppstod.');
                return Promise.reject(error);
            }
        },
        ...options,
    });
}
