import { apiClient } from '@api/client/apiClient';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { hentGenererteBrevbegrunnelser } from './hentGenererteBrevbegrunnelser';

vi.mock('@api/client/apiClient', () => ({
    apiClient: { get: vi.fn() },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('hentGenererteBrevbegrunnelser', () => {
    test('skal hente genererte brevbegrunnelser', async () => {
        const begrunnelser = ['Begrunnelse 1', 'Begrunnelse 2'];
        vi.mocked(apiClient.get).mockResolvedValue(begrunnelser);

        const result = await hentGenererteBrevbegrunnelser(123);

        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/vedtaksperioder/brevbegrunnelser/123`,
        });
        expect(result).toEqual(begrunnelser);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentGenererteBrevbegrunnelser(123)).rejects.toThrow('Noe gikk galt');
    });
});
