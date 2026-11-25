import { mutationKeys } from '@hooks/keys/mutationKeys';
import { useHttp } from '@navikt/familie-http';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';

import {
    type OpprettForhåndsvisTilbakekrevingVarselbrevRequest,
    opprettForhåndsvisbarTilbakekrevingVarselbrev,
} from '../api/opprettForhåndsvisbarTilbakekrevingVarselbrev';
import { opprettPdfBlob } from '../utils/blob';

interface MutationParameters {
    behandlingId: number;
    payload: OpprettForhåndsvisTilbakekrevingVarselbrevRequest;
}

type Options = Omit<UseMutationOptions<Blob, DefaultError, MutationParameters>, 'mutationKey' | 'mutationFn'>;

export function useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf(options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationKey: mutationKeys.opprettForhåndsvisbarTilbakekrevingVarselbrevPdf(),
        mutationFn: async ({ behandlingId, payload }: MutationParameters) => {
            try {
                const bytes = await opprettForhåndsvisbarTilbakekrevingVarselbrev(request, behandlingId, payload);
                const blob = opprettPdfBlob(bytes);
                return Promise.resolve(blob);
            } catch (e) {
                const error = e instanceof Error ? e : Error('En ukjent feil oppstod.');
                return Promise.reject(error);
            }
        },
        ...options,
    });
}
