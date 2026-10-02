import { apiClient } from '@api/client/apiClient';

import type { IsoDatoString } from '@utils/dato';

export async function hentEndringstidspunkt(behandlingId: number): Promise<IsoDatoString> {
    return apiClient.get<void, IsoDatoString>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/endringstidspunkt`,
    });
}
