import { apiClient } from '@api/client/apiClient';

export async function fyllUtVilkårsvurderingITestmiljø(behandlingId: number) {
    return apiClient.put<undefined, string>({
        url: `/familie-ba-sak/api/preprod/${behandlingId}/fyll-ut-vilkarsvurdering`,
    });
}
