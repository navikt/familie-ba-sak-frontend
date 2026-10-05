import { hentFeatureToggles } from '@api/hentFeatureToggles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { FeatureToggle, type FeatureToggles } from '@typer/featureToggles';
import { logger } from '@utils/logger';
import type { PropsWithChildren } from 'react';
import { createElement } from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentFeatureToggles } from './useHentFeatureToggles';

vi.mock('@api/hentFeatureToggles');

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: { queries: { retry: 0 } },
    });
}

afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
});

describe('useHentFeatureToggles', () => {
    test('henter feature toggles', async () => {
        const featureToggles: FeatureToggles = { [FeatureToggle.skalObfuskereData]: true };
        vi.mocked(hentFeatureToggles).mockResolvedValue(featureToggles);
        const queryClient = makeQueryClient();

        const { result } = renderHook(() => useHentFeatureToggles(), {
            wrapper: ({ children }: PropsWithChildren) =>
                createElement(QueryClientProvider, { client: queryClient }, children),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentFeatureToggles).toHaveBeenCalledOnce();
        expect(result.current.data).toEqual(featureToggles);
    });

    test('slår av alle feature toggles når innhenting feiler', async () => {
        const feil = new Error('Noe gikk galt');
        vi.mocked(hentFeatureToggles).mockRejectedValue(feil);
        const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {});
        const queryClient = makeQueryClient();

        const { result } = renderHook(() => useHentFeatureToggles(), {
            wrapper: ({ children }: PropsWithChildren) =>
                createElement(QueryClientProvider, { client: queryClient }, children),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(
            Object.values(FeatureToggle).reduce<FeatureToggles>((toggles, toggle) => {
                toggles[toggle] = false;
                return toggles;
            }, {})
        );
        expect(warnSpy).toHaveBeenCalledWith(
            'Kunne ikke laste feature toggles, faller tilbake til alle av: Noe gikk galt',
            { name: 'Error', stack: feil.stack }
        );
    });

    test('respekterer query options', () => {
        const queryClient = makeQueryClient();
        const { result } = renderHook(() => useHentFeatureToggles({ enabled: false }), {
            wrapper: ({ children }: PropsWithChildren) =>
                createElement(QueryClientProvider, { client: queryClient }, children),
        });

        expect(result.current.fetchStatus).toBe('idle');
        expect(hentFeatureToggles).not.toHaveBeenCalled();
    });
});
