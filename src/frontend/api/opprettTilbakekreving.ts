import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export async function opprettTilbakekreving(fagsakId: number) {
    return apiClient.get<void, IBehandling>({
        url: `/familie-ba-sak/api/fagsaker/${fagsakId}/opprett-tilbakekreving`,
    });
}
