import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { IRestRegistrerSøknad } from '@typer/søknad';

export async function registrerSøknad(payload: IRestRegistrerSøknad, behandlingId: number): Promise<IBehandling> {
    return apiClient.post<IRestRegistrerSøknad, IBehandling>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/registrer-søknad`,
        data: payload,
    });
}
