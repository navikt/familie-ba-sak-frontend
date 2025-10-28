import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentFeatureToggles } from '../api/hentFeatureToggles';
import { FeatureToggle, type FeatureToggles } from '../typer/featureToggles';

function skruAvAlleToggles(): FeatureToggles {
    const toggles = Object.values(FeatureToggle);
    return toggles.reduce((toggles: FeatureToggles, toggle: FeatureToggle) => {
        toggles[toggle] = false;
        return toggles;
    }, {});
}

export const HentFeatureTogglesQueryKeyFactory = {
    toggles: () => ['toggles'],
};

type Options = Omit<
    UseQueryOptions<FeatureToggles, DefaultError, FeatureToggles>,
    'queryKey' | 'queryFn' | 'gcTime' | 'staleTime'
> & {
    påvirkerSystemLaster?: boolean;
};

export function useHentFeatureToggles(options?: Options) {
    const { påvirkerSystemLaster = true, ...rest } = options ?? {};
    const { request } = useHttp();
    return useQuery({
        queryKey: HentFeatureTogglesQueryKeyFactory.toggles(),
        queryFn: async () => {
            try {
                return await hentFeatureToggles(request, påvirkerSystemLaster);
            } catch (e: unknown) {
                const errorMessage = e instanceof Error ? e.message : 'En feil oppstod under innlasting av toggles.';
                console.error(errorMessage, e);
                return skruAvAlleToggles();
            }
        },
        gcTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        ...rest,
    });
}
