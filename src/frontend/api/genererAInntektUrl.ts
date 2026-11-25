import { apiClient } from '@api/client/apiClient';

export interface Payload {
    ident: string;
}

export async function genererAInntektUrl(payload: Payload): Promise<string> {
    return apiClient.post<Payload, string>({
        url: '/familie-ba-sak/api/a-inntekt/hent-url',
        data: payload,
    });
}
