import { apiClient } from '@api/client/apiClient';
import type { IBehandling, SettPåVentÅrsak } from '@typer/behandling';
import type { IsoDatoString } from '@utils/dato';

export interface SettPåVentPayload {
    frist: IsoDatoString;
    årsak: SettPåVentÅrsak;
}

export async function settPåVent(
    payload: SettPåVentPayload,
    behandlingId: number,
    erBehandlingAlleredePåVent: boolean
): Promise<IBehandling> {
    return apiClient.request<SettPåVentPayload, IBehandling>({
        method: erBehandlingAlleredePåVent ? 'PUT' : 'POST',
        url: `/familie-ba-sak/api/sett-på-vent/${behandlingId}`,
        data: payload,
    });
}
