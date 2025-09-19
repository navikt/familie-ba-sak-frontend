import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import {
    opprettForhåndsvisbarTilbakekrevingVarselbrev,
    type OpprettForhåndsvisTilbakekrevingVarselbrevRequest,
} from '../api/opprettForhåndsvisbarTilbakekrevingVarselbrev';
import { opprettPdfBlob } from '../utils/blob';

interface MutationParameters {
    behandlingId: number;
    payload: OpprettForhåndsvisTilbakekrevingVarselbrevRequest;
}

type Options = Omit<UseMutationOptions<Blob, DefaultError, MutationParameters>, 'mutationKey' | 'mutationFn'>;

export const mutationKey = ['opprett_forhaandsvisbar_tilbakekreving_varsel_brev_pdf'];

export function useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf(options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationKey,
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
