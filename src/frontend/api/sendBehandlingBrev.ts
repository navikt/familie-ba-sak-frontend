import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { IManueltBrevRequestPåBehandling } from '@typer/dokument';

export async function sendBehandlingBrev(
    behandlingId: number,
    payload: IManueltBrevRequestPåBehandling
): Promise<IBehandling> {
    return apiClient.post<IManueltBrevRequestPåBehandling, IBehandling>({
        url: `/familie-ba-sak/api/dokument/send-brev/${behandlingId}`,
        data: payload,
    });
}
