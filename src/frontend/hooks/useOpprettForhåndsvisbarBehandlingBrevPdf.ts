import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { opprettForhåndsvisBehandlingBrev } from '../api/opprettForhåndsvisBehandlingBrev';
import type { IManueltBrevRequestPåBehandling } from '../typer/dokument';
import { opprettPdfBlob } from '../utils/blob';

interface MutationParameters {
    behandlingId: number;
    payload: IManueltBrevRequestPåBehandling;
}

type Options = Omit<
    UseMutationOptions<Blob, DefaultError, MutationParameters>,
    'mutationKey' | 'mutationFn'
>;

export const mutationKey = ['opprett_forhaandsvisbar_behandling_brev_pdf'];

export function useOpprettForhåndsvisbarBehandlingBrevPdf(options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationKey,
        mutationFn: async ({ behandlingId, payload }: MutationParameters) => {
            try {
                const bytes = await opprettForhåndsvisBehandlingBrev(
                    request,
                    behandlingId,
                    payload
                );
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
