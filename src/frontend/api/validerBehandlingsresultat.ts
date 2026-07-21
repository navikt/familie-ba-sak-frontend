import { apiClient } from '@api/client/apiClient';

export async function validerBehandlingsresultat(behandlingId: number): Promise<boolean> {
    return apiClient.get<void, boolean>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/behandlingsresultat/valider`,
    });
}
