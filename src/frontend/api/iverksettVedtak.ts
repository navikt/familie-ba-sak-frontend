import { apiClient } from '@api/client/apiClient';
import type { IBehandling } from '@typer/behandling';
import type { TotrinnskontrollBeslutning } from '@typer/totrinnskontroll';

interface PathParams {
    behandlingId: number;
}

interface Payload {
    beslutning: TotrinnskontrollBeslutning;
    begrunnelse: string;
    kontrollerteSider: string[];
}

export function iverksettVedtak(pathParams: PathParams, payload: Payload) {
    const { behandlingId } = pathParams;
    return apiClient.post<Payload, IBehandling>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/iverksett-vedtak`,
        data: payload,
    });
}
