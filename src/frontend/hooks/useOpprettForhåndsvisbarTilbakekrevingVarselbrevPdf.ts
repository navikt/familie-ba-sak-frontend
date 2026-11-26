import {
    type OpprettForhåndsvisTilbakekrevingVarselbrevRequest,
    opprettForhåndsvisbarTilbakekrevingVarselbrev,
} from '@api/opprettForhåndsvisbarTilbakekrevingVarselbrev';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { opprettPdfBlob } from '@utils/blob';

interface MutationParameters {
    behandlingId: number;
    payload: OpprettForhåndsvisTilbakekrevingVarselbrevRequest;
}

type Options = Omit<UseMutationOptions<Blob, DefaultError, MutationParameters>, 'mutationKey' | 'mutationFn'>;

export function useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf(options?: Options) {
    return useMutation({
        mutationKey: mutationKeys.opprettForhåndsvisbarTilbakekrevingVarselbrevPdf(),
        mutationFn: async ({ behandlingId, payload }: MutationParameters) => {
            const bytes = await opprettForhåndsvisbarTilbakekrevingVarselbrev(behandlingId, payload);
            return opprettPdfBlob(bytes);
        },
        ...options,
    });
}
