import { apiClient } from '@api/client/apiClient';

export interface Versjonsinfo {
    branch: string;
    versjon: string;
}

export async function hentBackendVersjonsinfo() {
    return apiClient.get<void, Versjonsinfo>({
        url: '/familie-ba-sak/api/preprod/versjonsinfo',
    });
}

export async function hentFrontendVersjonsinfo() {
    return apiClient.get<void, Versjonsinfo>({ url: '/version' });
}
