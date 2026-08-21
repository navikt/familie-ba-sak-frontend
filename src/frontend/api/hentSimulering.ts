import { apiClient } from '@api/client/apiClient';
import type { ISimuleringDTO } from '@typer/simulering';

export async function hentSimulering(behandlingId: number): Promise<ISimuleringDTO> {
    return apiClient.get<void, ISimuleringDTO>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/simulering`,
    });
}
