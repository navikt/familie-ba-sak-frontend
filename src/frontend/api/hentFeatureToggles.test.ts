import { apiClient } from '@api/client/apiClient';
import { FeatureToggle, type FeatureToggles } from '@typer/featureToggles';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { hentFeatureToggles } from './hentFeatureToggles';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { post: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentFeatureToggles', () => {
    test('henter feature toggles med alle togglenavnene', async () => {
        const featureToggles: FeatureToggles = { [FeatureToggle.skalObfuskereData]: true };
        vi.mocked(apiClient.post).mockResolvedValue(featureToggles);

        const result = await hentFeatureToggles();

        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/feature/er-toggler-enabled',
            data: Object.values(FeatureToggle),
        });
        expect(result).toEqual(featureToggles);
    });

    test('videresender feil fra apiClient', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentFeatureToggles()).rejects.toThrow('Noe gikk galt');
    });
});
