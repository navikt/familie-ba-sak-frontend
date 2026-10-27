import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

interface Parameters {
    behandlingId: number;
    behandlendeEnhet: string;
}

export async function sendVedtakTilBeslutter(parameters: Parameters): Promise<IBehandling> {
    const { behandlingId, behandlendeEnhet } = parameters;
    return apiClient.post<void, IBehandling>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/send-til-beslutter?behandlendeEnhet=${behandlendeEnhet}`,
    });
}
