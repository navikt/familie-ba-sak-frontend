import { apiClient } from '@api/client/apiClient';

import { FeatureToggle, type FeatureToggles } from '@typer/featureToggles';

export async function hentFeatureToggles(): Promise<FeatureToggles> {
    return apiClient.post<string[], FeatureToggles>({
        url: '/familie-ba-sak/api/feature/er-toggler-enabled',
        data: Object.values(FeatureToggle),
    });
}
