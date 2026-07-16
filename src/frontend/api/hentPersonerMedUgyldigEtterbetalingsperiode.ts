import { apiClient } from '@api/client/apiClient';

export async function hentPersonerMedUgyldigEtterbetalingsperiode(behandlingId: number): Promise<string[]> {
    return apiClient.get<void, string[]>({
        url: `/familie-ba-sak/api/behandlinger/${behandlingId}/personer-med-ugyldig-etterbetalingsperiode`,
    });
}
