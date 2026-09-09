import { apiClient } from '@api/client/apiClient';
import type { IFødselshendelsefiltreringResultat } from '@typer/fødselshendelser';

export async function hentFiltreringsresultater(behandlingId: number): Promise<IFødselshendelsefiltreringResultat[]> {
    return apiClient.get<void, IFødselshendelsefiltreringResultat[]>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/filtreringsresultater`,
    });
}
