import { hentFeatureToggles } from '@api/hentFeatureToggles';
import { MetaKey } from '@hooks/meta/metaKey';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { FeatureToggle, type FeatureToggles } from '@typer/featureToggles';
import { logger, tilLoggFeil } from '@utils/logger';

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
>;

export function useHentFeatureToggles(options?: Options) {
    return useQuery({
        queryKey: HentFeatureTogglesQueryKeyFactory.toggles(),
        queryFn: async () => {
            try {
                return await hentFeatureToggles();
            } catch (e: unknown) {
                const errorMessage = e instanceof Error ? e.message : 'En feil oppstod under innlasting av toggles.';
                logger.warn(
                    `Kunne ikke laste feature toggles, faller tilbake til alle av: ${errorMessage}`,
                    tilLoggFeil(e)
                );
                return skruAvAlleToggles();
            }
        },
        gcTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        ...options,
    });
}
