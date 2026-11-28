import { apiClient } from '@api/client/apiClient';
import type { ISamhandlerInfo } from '@typer/samhandler';

export async function hentSamhandler(orgnr: string): Promise<ISamhandlerInfo> {
    return apiClient.get<void, ISamhandlerInfo>({
        url: `/familie-ba-sak/api/samhandler/orgnr/${orgnr}`,
    });
}
