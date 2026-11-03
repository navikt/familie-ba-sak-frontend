import { apiClient } from '@api/client/apiClient';
import { genererAInntektUrl } from '@api/genererAInntektUrl';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload = { ident: '12345678910' };

describe('genererAInntektUrl', () => {
    test('skal sende POST-forespørsel med ident og returnere generert URL', async () => {
        const url = 'https://a-inntekt.nav.no';
        vi.mocked(apiClient.post).mockResolvedValueOnce(url);

        const resultat = await genererAInntektUrl(payload);

        expect(apiClient.post).toHaveBeenCalledExactlyOnceWith({
            url: '/familie-ba-sak/api/a-inntekt/hent-url',
            data: payload,
        });
        expect(resultat).toBe(url);
    });

    test('skal kaste videre feilen dersom kallet feiler', async () => {
        const feil = new Error('Noe gikk galt');
        vi.mocked(apiClient.post).mockRejectedValueOnce(feil);

        await expect(genererAInntektUrl(payload)).rejects.toBe(feil);
    });
});
