import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';

export interface OppdaterEndringstidspunktPayload {
    overstyrtEndringstidspunkt: string;
    behandlingId: number;
}

export async function oppdaterEndringstidspunkt(endringstidspunkt: string, behandlingId: number): Promise<IBehandling> {
    return apiClient.put<OppdaterEndringstidspunktPayload, IBehandling>({
        url: `/familie-ba-sak/api/vedtaksperioder/endringstidspunkt`,
        data: {
            overstyrtEndringstidspunkt: endringstidspunkt,
            behandlingId: behandlingId,
        },
    });
}
