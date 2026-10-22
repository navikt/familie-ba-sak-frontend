import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

interface PathParams {
    behandlingId: number;
}

export async function registrerInstitusjon(pathParams: PathParams): Promise<IBehandling> {
    const { behandlingId } = pathParams;
    return apiClient.post<void, IBehandling>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/registrer-institusjon`,
    });
}
