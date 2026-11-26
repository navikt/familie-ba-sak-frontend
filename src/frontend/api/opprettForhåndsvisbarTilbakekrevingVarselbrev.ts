import { apiClient } from '@api/client/apiClient';

export interface OpprettForhåndsvisTilbakekrevingVarselbrevRequest {
    fritekst: string;
}

export async function opprettForhåndsvisbarTilbakekrevingVarselbrev(
    behandlingId: number,
    payload: OpprettForhåndsvisTilbakekrevingVarselbrevRequest
): Promise<string> {
    return apiClient.post<OpprettForhåndsvisTilbakekrevingVarselbrevRequest, string>({
        url: `/familie-ba-sak/api/tilbakekreving/${behandlingId}/forhandsvis-varselbrev`,
        data: { fritekst: payload.fritekst },
    });
}
