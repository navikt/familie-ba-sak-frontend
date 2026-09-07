import { apiClient } from '@api/client/apiClient';
import type { IManueltBrevRequestPåBehandling } from '@typer/dokument';

interface PathParams {
    behandlingId: number;
}

export async function opprettManueltBrevPdf({ behandlingId }: PathParams, payload: IManueltBrevRequestPåBehandling) {
    return apiClient.post<IManueltBrevRequestPåBehandling, string>({
        data: payload,
        url: `/familie-ba-sak/api/dokument/forhaandsvis-brev/${behandlingId}`,
    });
}
