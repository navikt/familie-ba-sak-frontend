import { useQuery } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentAInntektUrl } from './hentAInntektUrl';

interface Options {
    søkerFødselsnummer: string;
    enabled?: boolean;
    onSuccess?: (url: string) => void;
    onError?: (error: Error) => void;
}

export function useHentAInntektUrl({
    søkerFødselsnummer,
    enabled = false,
    onSuccess,
    onError,
}: Options) {
    const { request } = useHttp();
    return useQuery({
        queryKey: ['aInntektUrl', søkerFødselsnummer],
        queryFn: async () => {
            try {
                const url = await hentAInntektUrl(request, søkerFødselsnummer);
                onSuccess?.(url);
                return Promise.resolve(url);
            } catch (e) {
                const error = e instanceof Error ? e : Error('En ukjent feil oppstod.');
                onError?.(error);
                return Promise.reject(error);
            }
        },
        enabled,
    });
}
