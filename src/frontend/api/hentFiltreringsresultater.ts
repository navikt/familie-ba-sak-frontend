import { apiClient } from '@api/client/apiClient';
import type { IFiltreringResultat } from '@typer/filtreringsregler';

export async function hentFiltreringsresultater(behandlingId: number): Promise<IFiltreringResultat[]> {
    return apiClient.get<void, IFiltreringResultat[]>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/filtreringsresultater`,
    });
}
