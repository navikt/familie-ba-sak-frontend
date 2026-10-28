import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export async function oppdaterRegisteropplysninger(behandlingId: number): Promise<IBehandling> {
    return apiClient.get<void, IBehandling>({
        url: `/familie-ba-sak/api/person/oppdater-registeropplysninger/${behandlingId}`,
    });
}
