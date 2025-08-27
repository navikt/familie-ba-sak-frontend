import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentForhåndsvisBehandlingBrev } from '../api/hentForhåndsvisBehandlingBrev';
import type { IManueltBrevRequestPåBehandling } from '../typer/dokument';

function base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

type Parameters = Omit<
    UseQueryOptions<Blob, DefaultError, IManueltBrevRequestPåBehandling>,
    'queryKey' | 'queryFn' | 'gcTime'
> & {
    behandlingId: number;
    payload: IManueltBrevRequestPåBehandling;
    onSuccess?: (blob: Blob) => void;
    onError?: (error: Error) => void;
};

export const HentBrevQueryKeyFactory = {
    forhåndsvisBrev: (behandlingId: number, payload: IManueltBrevRequestPåBehandling) => [
        'forhaandsvis_brev',
        behandlingId,
        payload,
    ],
};

export function useHentForhåndsvisBehandlingBrev(parameters: Parameters) {
    const { request } = useHttp();
    const { behandlingId, payload, onSuccess, onError, ...rest } = parameters;
    return useQuery({
        queryKey: HentBrevQueryKeyFactory.forhåndsvisBrev(behandlingId, payload),
        queryFn: async () => {
            try {
                const bytes = await hentForhåndsvisBehandlingBrev(request, behandlingId, payload);
                const blob = new Blob([base64ToArrayBuffer(bytes)], { type: 'application/pdf' });
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
