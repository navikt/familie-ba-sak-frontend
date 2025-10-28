import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { hentToggles } from '../api/hentToggles';
import { Toggle, type Toggles } from '../typer/toggles';

function skruAvAlleToggles(): Toggles {
    const toggles = Object.values(Toggle);
    return toggles.reduce((toggles: Toggles, toggle: Toggle) => {
        toggles[toggle] = false;
        return toggles;
    }, {});
}

export const HentTogglesQueryKeyFactory = {
    toggles: () => ['toggles'],
};

type Options = Omit<
    UseQueryOptions<Toggles, DefaultError, Toggles>,
    'queryKey' | 'queryFn' | 'gcTime' | 'staleTime'
> & {
    påvirkerSystemLaster?: boolean;
};

export function useHentToggles(options?: Options) {
    const { påvirkerSystemLaster = true, ...rest } = options ?? {};
    const { request } = useHttp();
    return useQuery({
        queryKey: HentTogglesQueryKeyFactory.toggles(),
        queryFn: async () => {
            try {
                return await hentToggles(request, påvirkerSystemLaster);
            } catch (e: unknown) {
                const errorMessage = e instanceof Error ? e.message : 'En feil oppstod under innlasting av toggles.';
                console.error(errorMessage, e);
                return skruAvAlleToggles();
            }
        },
        gcTime: 0,
        staleTime: 0,
        ...rest,
    });
}
