import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentForhåndsvisBehandlingBrev } from '../api/hentForhåndsvisBehandlingBrev';
import type { IManueltBrevRequestPåBehandling } from '../typer/dokument';
import { opprettPdfBlob } from '../utils/blob';

type Parameters = Omit<
    UseQueryOptions<Blob, DefaultError, IManueltBrevRequestPåBehandling>,
    'queryKey' | 'queryFn' | 'gcTime'
> & {
    behandlingId: number;
    payload: IManueltBrevRequestPåBehandling;
    onSuccess?: (blob: Blob) => void;
    onError?: (error: Error) => void;
};

export const HentForhåndsvisbarBehandlingBrevPdfQueryKeyFactory = {
    forhåndsvisbarBehandlingBrevPdf: (
        behandlingId: number,
        payload: IManueltBrevRequestPåBehandling
    ) => ['forhaandsvisbar_behandling_brev_pdf', behandlingId, payload],
};

export function useHentForhåndsvisbarBehandlingBrevPdf({
    behandlingId,
    payload,
    onSuccess,
    onError,
    ...rest
}: Parameters) {
    const { request } = useHttp();
    return useQuery({
        queryKey:
            HentForhåndsvisbarBehandlingBrevPdfQueryKeyFactory.forhåndsvisbarBehandlingBrevPdf(
                behandlingId,
                payload
            ),
        queryFn: async () => {
            try {
                const bytes = await hentForhåndsvisBehandlingBrev(request, behandlingId, payload);
                const blob = opprettPdfBlob(bytes);
                onSuccess?.(blob);
                return Promise.resolve(blob);
            } catch (e) {
                const error = e instanceof Error ? e : Error('En ukjent feil oppstod.');
                onError?.(error);
                return Promise.reject(error);
            }
        },
        gcTime: 0, // Vi vil alltid generere et nytt brev
        ...rest,
    });
}
