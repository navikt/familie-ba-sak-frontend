import { apiClient } from '@api/client/apiClient';
import type { AlleBegrunnelser } from '@typer/vilkår';

export async function hentAlleBegrunnelser(): Promise<AlleBegrunnelser> {
    return apiClient.get<void, AlleBegrunnelser>({
        url: `/familie-ba-sak/api/vilkaarsvurdering/vilkaarsbegrunnelser`,
    });
}
