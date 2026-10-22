import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { IRegistrerInstitusjon } from '@typer/institusjon';

interface PathParams {
    behandlingId: number;
}

export async function registrerInstitusjon(
    pathParams: PathParams,
    payload: IRegistrerInstitusjon | undefined
): Promise<IBehandling> {
    const { behandlingId } = pathParams;
    return apiClient.post<IRegistrerInstitusjon | undefined, IBehandling>({
        data: payload,
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/registrer-institusjon`,
    });
}
