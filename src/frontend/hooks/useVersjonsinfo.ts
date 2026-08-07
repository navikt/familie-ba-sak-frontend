import { hentBackendVersjonsinfo, hentFrontendVersjonsinfo } from '@api/hentVersjonsinfo';
import { useQueries } from '@tanstack/react-query';
import { erPreprod } from '@utils/miljø';

export const VERSJONSINFO_QUERY_KEY_PREFIX = 'versjonsinfo';

export function useVersjonsinfo() {
    const skalHentes = erPreprod();

    return useQueries({
        queries: [
            {
                queryKey: [VERSJONSINFO_QUERY_KEY_PREFIX, 'frontend'],
                queryFn: hentFrontendVersjonsinfo,
                enabled: skalHentes,
                staleTime: Infinity,
                retry: false,
            },
            {
                queryKey: [VERSJONSINFO_QUERY_KEY_PREFIX, 'backend'],
                queryFn: hentBackendVersjonsinfo,
                enabled: skalHentes,
                staleTime: Infinity,
                retry: false,
            },
        ],
        combine: ([frontend, backend]) => ({
            laster: frontend.isPending || backend.isPending,
            frontendBranch: frontend.data?.branch,
            backendBranch: backend.data?.branch,
        }),
    });
}
