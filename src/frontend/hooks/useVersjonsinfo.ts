import { hentBackendVersjonsinfo, hentFrontendVersjonsinfo } from '@api/hentVersjonsinfo';
import { queryKeys } from '@hooks/keys/queryKeys';
import { useQueries } from '@tanstack/react-query';
import { erPreprod } from '@utils/miljø';

export function useVersjonsinfo() {
    const skalHentes = erPreprod();

    return useQueries({
        queries: [
            {
                queryKey: queryKeys.versjonsinfoFrontend(),
                queryFn: hentFrontendVersjonsinfo,
                enabled: skalHentes,
                staleTime: Infinity,
                retry: false,
            },
            {
                queryKey: queryKeys.versjonsinfoBackend(),
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
