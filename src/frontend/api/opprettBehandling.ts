import { apiClient } from '@api/client/apiClient';
import { type IBehandling, type NyBehandling } from '@typer/behandling';

export async function opprettBehandling(payload: NyBehandling) {
    return apiClient.post<NyBehandling, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/behandlinger`,
    });
}
